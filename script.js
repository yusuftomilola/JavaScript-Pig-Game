"use strict";

// selecting elements
const scoreZeroElement = document.querySelector("#score--0");
const scoreOneElement = document.querySelector("#score--1");
const diceElement = document.querySelector(".dice");

const newGameBtnElement = document.querySelector(".btn--new");
const rollDiceBtnElement = document.querySelector(".btn--roll");
const holdBtnElement = document.querySelector(".btn--hold");

let currentScoreZero = document.querySelector("#current--0");
let currentScoreOne = document.querySelector("#current--1");
let playerZero = document.querySelector(".player--0");
let playerOne = document.querySelector(".player--1");

// reuseable functions
function switchToNextPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  playerZero.classList.toggle("player--active");
  playerOne.classList.toggle("player--active");
}

let currentScore, activePlayer, scores, playing;

const init = () => {
  // starting conditions
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  currentScoreZero.textContent = 0;
  currentScoreOne.textContent = 0;
  scoreZeroElement.textContent = 0;
  scoreOneElement.textContent = 0;

  diceElement.classList.add("hidden");

  playerZero.classList.remove("player--winner");
  playerOne.classList.remove("player--winner");

  playerZero.classList.add("player--active");
  playerOne.classList.remove("player--active");
};

init();

// rolling dice functionality
rollDiceBtnElement.addEventListener("click", () => {
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display dice
    diceElement.classList.remove("hidden");
    diceElement.src = `dice-${dice}.png`;

    // 3. check for rolled 1
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchToNextPlayer();
    }
  }
});

holdBtnElement.addEventListener("click", () => {
  if (playing) {
    // 1. Add the current score to active player's score
    scores[activePlayer] += currentScore;

    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // finish the game
      playing = false;
      diceElement.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // switch to the next player
      switchToNextPlayer();
    }
  }
});

newGameBtnElement.addEventListener("click", () => {
  init();
});
