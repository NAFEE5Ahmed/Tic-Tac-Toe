// gameBoard module
const gameBoard = (() => {
  let board = Array(9).fill("");
  const getBoard = () => board;

  const makeMove = (index, player) => {
    if (board[index] === "") {
      board[index] = player;
      return true;
    }
    return false;
  };

  const resetBoard = () => {
    board = Array(9).fill("");
  };

  return { getBoard, makeMove, resetBoard };
})();

// factory function for creating player objects
const Player = (name, marker) => {
  // Public methods
  const getName = () => name;
  const getMarker = () => marker;

  return { getName, getMarker };
};

// game module

const game = (() => {
  let currentPlayer;
  let isGameOver = false;

  const checkWin = () => {
    const board = gameBoard.getBoard();

    const winningConditions = [
      [0, 1, 2, 5, 5, 0],
      [3, 4, 5, 5, 15, 0],
      [6, 7, 8, 5, 25, 0],
      [0, 3, 6, -5, 15, 90],
      [1, 4, 7, 5, 15, 90],
      [2, 5, 8, 15, 15, 90],
      [0, 4, 8, 5, 15, 45],
      [2, 4, 6, 5, 15, 135],
    ];

    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      // const [l1, l2, l3] = lines;
      if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  };

  const checkDraw = () => {
    const board = gameBoard.getBoard();
    return board.every((cell) => cell !== "");
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const displayMessage = (message) => {
    const info = document.querySelector(".info");
    info.textContent = message;
  };

  const handleCellClick = (index) => {
    if (isGameOver) {
      return;
    }
    const moveMade = gameBoard.makeMove(index, currentPlayer.getMarker());
    if (moveMade) {
      render();
      if (checkWin()) {
        displayMessage(
          `Congratulations!  ${currentPlayer.getName()} is the WINNER`
        );
        isGameOver = true;
      } else if (checkDraw()) {
        displayMessage(`It is draw`);
      } else {
        switchPlayer();
        displayMessage(`Turn for ${currentPlayer.getMarker()}`);
      }
    }
  };

  const bindHandleCellClick = () => {
    const cells = document.querySelectorAll(".box");
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => handleCellClick(index));
    });
  };

  const render = () => {
    const board = gameBoard.getBoard();
    const cells = document.querySelectorAll(".box");
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
    });
  };
  const resetGame = () => {
    gameBoard.resetBoard();
    currentPlayer = player1;
    isGameOver = false;
    displayMessage(`Turn for ${currentPlayer.getMarker()}`);
    render();
  };

  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");
  currentPlayer = player1;

  const init = () => {
    bindHandleCellClick();
    resetGame();
    const resetBtn = document.querySelector("#reset");
    resetBtn.addEventListener("click", resetGame);
  };

  return { init };
})();

game.init();