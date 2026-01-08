let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

const resultField = document.querySelector(".js-result");
const scoreField = document.querySelector(".js-score");

showScore();

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
  scoreField.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Tie: ${score.ties}`;
}

const resetBtn = document.querySelector("#reset-btn");
resetBtn.addEventListener("click", function () {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.setItem("score", JSON.stringify(score));

  showScore();
});
