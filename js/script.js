"use strict";

//Selecting elements
const players = [
  document.querySelector(".player--0"),
  document.querySelector(".player--1"),
];

const totalScores = [
  document.getElementById("score--0"),
  document.getElementById("score--1"),
];

const currentScores = [
  document.getElementById("current--0"),
  document.getElementById("current--1"),
];

const dice = document.querySelector(".dice");

const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnResetGame = document.querySelector(".btn--new");

// Game state variables
let currentScore, currentDice, activePlayer, playersScores;

// Utility functions
const displayDice = () => dice.classList.remove("hidden");
const hideDice = () => dice.classList.add("hidden");

function resetCurrentScore() {
  currentScore = 0;
  currentScores[activePlayer].textContent = currentScore;
}

function switchPlayer() {
  resetCurrentScore();

  activePlayer = activePlayer === 0 ? 1 : 0;

  players.forEach((player) => player.classList.toggle("player--active"));
}

function updateCurrentScore() {
  if (currentDice === 1) {
    switchPlayer();
    return;
  }

  currentScore += currentDice;
  currentScores[activePlayer].textContent = currentScore;
}

function generateRandomDiceRoll() {
  currentDice = Math.trunc(Math.random() * 6) + 1;
  dice.src = `./images/dice-${currentDice}.png`;
}

function disableGameControls() {
  btnRoll.disabled = true;
  btnHold.disabled = true;
  hideDice();
}

function enableGameControls() {
  btnRoll.disabled = false;
  btnHold.disabled = false;
}

function hold() {
  playersScores[activePlayer] += currentScore;

  totalScores[activePlayer].textContent = playersScores[activePlayer];

  if (playersScores[activePlayer] >= 100) {
    players[activePlayer].classList.remove("player--active");
    players[activePlayer].classList.add("player--winner");
    disableGameControls();
  } else {
    switchPlayer();
  }
}

function rollDice() {
  generateRandomDiceRoll();
  displayDice();
  updateCurrentScore();
}

function resetGame() {
  playersScores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  currentDice = 0;

  currentScores.forEach((score) => (score.textContent = 0));
  totalScores.forEach((score) => (score.textContent = 0));

  players.forEach((player, index) => {
    player.classList.remove("player--winner");

    if (index === 0) {
      player.classList.add("player--active");
    } else {
      player.classList.remove("player--active");
    }
  });

  hideDice();
  enableGameControls();
}

//Event listeners
btnRoll.addEventListener("click", rollDice);
btnHold.addEventListener("click", hold);
btnResetGame.addEventListener("click", resetGame);
window.addEventListener("load", resetGame);
