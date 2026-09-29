const throwables = ["rock", "paper", "scissors"];

function getComputerChoice() {
  const choice = Math.floor(Math.random() * 3);
  return throwables[choice];
}

function getHumanChoice() {
  let choice = null;
  while (!throwables.includes(choice)) {
    choice = window.prompt("Rock/Paper/Scissors: ")?.toLowerCase();
  }
  return choice;
}

function playRound(humanChoice, computerChoice, scores) {
  console.log(`You: ${humanChoice}\nComputer: ${computerChoice}\n`);
  if (humanChoice === "rock" && computerChoice === "rock") {
    console.log("Draw!");
  } else if (humanChoice === "rock" && computerChoice === "paper") {
    console.log("You Lose! Paper beats Rock.\n");
    scores.computer++;
  } else if (humanChoice === "rock" && computerChoice === "scissors") {
    console.log("You Win! Rock beats Scissors");
    scores.human++;
  } else if (humanChoice === "paper" && computerChoice === "rock") {
    console.log("You Win! Paper beats Rock.");
    scores.human++;
  } else if (humanChoice === "paper" && computerChoice === "paper") {
    console.log("Draw!");
  } else if (humanChoice === "paper" && computerChoice === "scissors") {
    console.log("You Lose! Scissors beats Paper.");
    scores.computer++;
  } else if (humanChoice === "scissors" && computerChoice === "rock") {
    console.log("You Lose! Rock beats Scissors.");
    scores.computer++;
  } else if (humanChoice === "scissors" && computerChoice === "paper") {
    console.log("You Win! Scissors beats Paper.");
    scores.human++;
  } else {
    console.log("Draw!");
  }
}

function playGame() {
  const scores = { human: 0, computer: 0 };
  for (let i = 0; i < 5; i++) {
    playRound(getHumanChoice(), getComputerChoice(), scores);
  }
  console.log(
    `-- Final Scores --\nYou: ${scores.human}\nComputer: ${scores.computer}`,
  );
}
playGame();
