// 1 -> State & Constants / App data first / Data

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

let isAutoPlaying = false;
let intervalId;

// 2 -> DOM references / all selectors together / DOM

const resultField = document.querySelector(".js-result");
const scoreField = document.querySelector(".js-score");

const resetBtn = document.querySelector("#reset-btn");
const autoPlayBtn = document.querySelector("#auto-play-btn");

const moves = ["rock", "paper", "scissors"];

// 3 -> Initialization (startup calls) / runs once on load / Init

showScore();

// 4 -> Functions (logic) / core logic / Logic

function playGame(playerMove) {
  let computerMove = pickComputerMove();
  let result = compareMove(playerMove, computerMove);

  if (result === "You win.") {
    score.wins++;
  } else if (result === "You lose.") {
    score.losses++;
  } else if (result === "Tie.") {
    score.ties++;
  }
  localStorage.setItem("score", JSON.stringify(score));

  showResult(result, playerMove, computerMove);
  showScore();
}

function pickComputerMove() {
  let randomNumber = Math.random();
  let computerMove;

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}

function compareMove(playerMove, computerMove) {
  let result;
  if (playerMove === computerMove) {
    result = "Tie.";
  } else if (
    (playerMove === "rock" && computerMove === "scissors") ||
    (playerMove === "paper" && computerMove === "rock") ||
    (playerMove === "scissors" && computerMove === "paper")
  ) {
    result = "You win.";
  } else {
    result = "You lose.";
  }
  return result;
}

function showResult(result, playerMove, computerMove) {
  resultField.innerHTML = `<span class="result">${result}</span><br><br>
        You <img class="move-icon" src="./assets/${playerMove}-emoji.png"> <img class="move-icon" src="./assets/${computerMove}-emoji.png"> Computer`;
}

function showScore() {
  scoreField.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.setItem("score", JSON.stringify(score));

  showScore();
}

function autoPlay() {
  if (!isAutoPlaying) {
    autoPlayBtn.innerText = "Stop Play";
    intervalId = setInterval(() => {
      let playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    autoPlayBtn.innerText = "Auto Play";
    isAutoPlaying = false;
  }
}

// 5 -> Event listeners (bindings) / at the bottom / Events

moves.forEach((move) => {
  document.querySelector(`.js-${move}-btn`).addEventListener("click", () => {
    playGame(move);
  });
});

resetBtn.addEventListener("click", resetScore);

autoPlayBtn.addEventListener("click", autoPlay);

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  } else if (event.key === "a" && event.altKey) {
    autoPlay();
  } else if (event.key === "R") {
    resetScore();
  }
});
