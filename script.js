const gameCells = document.querySelectorAll(".cell");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const restart = document.querySelector(".restart");
const alertBox = document.querySelector(".alertBox");

// making veriables
let currentPlayer = "x";
let nextPlayer = "o";
let playerTurn = currentPlayer;

player1.textContent = `Player 1: ${currentPlayer}`;
player2.textContent = `Player 2: ${nextPlayer}`;

// Function to start Game
const startGame = () => {
  gameCells.forEach((cell) => {
    cell.addEventListener("click", handelClisk);
  });
};

const handelClisk = (e) => {
  if (e.target.textContent === "") {
    e.target.textContent = playerTurn;
    if (checkwin()) {
      //   console.log(`${playerTurn} is Winner`);
      showAlert(`${playerTurn} is Winner`);
      disableCells();
    } else if (checkTie()) {
      //   console.log("It is Tie Match");
      showAlert(`It is Tie Match`);
      disableCells();
    } else {
      changePlayerTurn();
      showAlert(`Turn for Player: ${playerTurn} `);
    }
  }
};

// Function to Change Players Turn
const changePlayerTurn = () => {
  //   if (playerTurn === currentPlayer) {
  //     playerTurn = nextPlayer;
  //   } else playerTurn = currentPlayer;
  playerTurn = playerTurn === currentPlayer ? nextPlayer : currentPlayer;
};

// Function to Check Win
const checkwin = () => {
  const winningContions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [2, 5, 8],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningContions.length; i++) {
    const [pos1, pos2, pos3] = winningContions[i];
    if (
      gameCells[pos1].textContent !== "" &&
      gameCells[pos1].textContent === gameCells[pos2].textContent &&
      gameCells[pos2].textContent === gameCells[pos3].textContent
    ) {
      return true;
    }

    // console.log("${pos1} ${pos2} ${pos3}");
  }
  return false;
};

// Function to check Tie
const checkTie = () => {
  let emptyCellsCount = 0;
  gameCells.forEach((cell) => {
    if (cell.textContent === "") {
      emptyCellsCount++;
    }
  });
  return emptyCellsCount === 0 && !checkwin();
};

// Function to Disable Game-Board
const disableCells = () => {
  gameCells.forEach((cell) => {
    cell.removeEventListener("click", handelClisk);
    cell.classList.add("disable");
  });
};

// Function to Restart Game
const restartGame = () => {
  gameCells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("disable");
  });
  startGame();
};

// Function to show Alert
const showAlert = (msg) => {
  alertBox.style.display = "block";
  alertBox.textContent = msg;
  setTimeout(() => {
    alertBox.style.display = "none";
  }, 3000);
};
// Event for Restart Button
restart.addEventListener("click", restartGame);
startGame();
