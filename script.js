const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const x_class = "x";
const circle_class = "circle";
let circleTurn;
const restartBtn = document.getElementById("restartBtn");
const winning_combination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const winningmsgtextelement = document.querySelector(
  "[data-wining-message-text]"
);
const winningMsgElement = document.getElementById("winningMessage");
startGame();

restartBtn.addEventListener('click', startGame);


function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(x_class);
    cell.classList.remove(circle_class)
    cell.removeEventListener('click', handleClick);
    console.log("Click");
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMsgElement.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? circle_class : x_class;
  placemark(cell, currentClass);

  if (checkwin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function placemark(cell, currentClass) {
  cell.classList.add(currentClass);
}
function swapTurns() {
  circleTurn = !circleTurn;
}
function setBoardHoverClass() {
  board.classList.remove(x_class);
  board.classList.remove(circle_class);

  if (circleTurn) {
    board.classList.add(circle_class);
  } else {
    board.classList.add(x_class);
  }
}

function checkwin(currentClass) {
  return winning_combination.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function endGame(draw) {
  if (draw) {
    winningmsgtextelement.innerText = "Draw !";
  } else {
    winningmsgtextelement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMsgElement.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(x_class) || cell.classList.contains(circle_class)
    );
  });
}
