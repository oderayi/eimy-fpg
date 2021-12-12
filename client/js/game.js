// Backend root URI
const API_ROOT = 'http://localhost:3000';

/**
 * Initialize matrix: Setup an x by y matrix.
 *
 * @param x {number} - Width of the board
 * @param y {number} - Height of the board
 * @returns {Array} - x by y matrix filled with 0's
 */
const initializeBoard = (x, y) => {
  return Array(x)
    .fill()
    .map(() => Array(y).fill(0));
};

/**
 * Update the board's visual state.
 *
 * @param Array[Array] - x by y matrix
 * @returns void
 */
const refreshBoard = (boardState) => {
  const boardDOM = document.getElementById('board');
  const counterDOM = document.getElementById('counter');
  boardDOM.innerHTML = '';
  counterDOM.innerText = 0;

  for (const [i, x] of boardState.board.entries()) {
    for (const [j, y] of x.entries()) {
      boardDOM.appendChild(Cell({ x: i, y: j, value: y }, cellClicked));
    }
  }

  counterDOM.innerText = boardState.largestRectangle.length;
};

/**
 * Return cell component.
 *
 * @param { x: number, y: number, value: number } - Cell state
 * @returns HTMLElement
 */
const Cell = (state, clickHandler) => {
  const cell = document.createElement('div');
  cell.classList = `cell state_${state.value}`;
  cell.id = `cell_${state.x}_${state.y}`;
  cell.addEventListener('click', () => clickHandler(state));
  return cell;
};

/**
 * Apply new state to board.
 *
 * @param board - Matrix
 * @param state - Array of objects consisting { x: number, y: number, value: number }
 *
 */
const applyState = async (boardState, newState) => {
  const newBoard = [...boardState.board];

  // Apply new state (in-memory)
  for (let state of newState) {
    newBoard[state.x][state.y] = state.value;
  }

  // Clear existing highlights (in-memory)
  for (const [i, x] of newBoard.entries()) {
    for (const [j, value] of x.entries()) {
      if (value == 2) newBoard[i][j] = 1;
    }
  }

  // Highlight red-spots on the new board (in-memory)
  const largestRec = await largestRectangle(newBoard);

  for (let point of largestRec) {
    newBoard[point.x][point.y] = 2;
  }

  return { board: newBoard, largestRectangle: largestRec };
};

/**
 * Handler for cell-click event.
 *
 * @param { x: number, y: number, value: number } - Cell state
 * @return void
 */
const cellClicked = async (state) => {
  const newValue = state.value == 0 ? 1 : 0;
  const boardState = await applyState({ board }, [
    { ...state, value: newValue },
  ]);
  refreshBoard(boardState);
};

/**
 * Send request to backend for largest rectangle calculation.
 *
 * @param {Array} board
 * @returns {Array<Cell>}
 */
const largestRectangle = async (board) => {
  try {
    const response = await fetch(API_ROOT + '/largest-rectangle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(board),
    });
    const largest = response.json();
    return largest;
  } catch (error) {
    console.log(error.message);
  }
};

// Initialize board
const boardWidth = 15;
const boardHeight = 15;

let board = initializeBoard(boardWidth, boardHeight);

// Modify board state (given example)
const newBoardState = [
  { x: 2, y: 3, value: 1 },
  { x: 2, y: 4, value: 1 },
  { x: 2, y: 5, value: 1 },
  { x: 3, y: 3, value: 1 },
  { x: 3, y: 4, value: 1 },
  { x: 3, y: 5, value: 1 },
  { x: 4, y: 11, value: 1 },
  { x: 4, y: 12, value: 1 },
  { x: 4, y: 13, value: 1 },
  { x: 4, y: 14, value: 1 },
  { x: 5, y: 11, value: 1 },
  { x: 5, y: 12, value: 1 },
  { x: 5, y: 13, value: 1 },
  { x: 5, y: 14, value: 1 },
  { x: 5, y: 4, value: 1 },
  { x: 5, y: 5, value: 1 },
  { x: 5, y: 6, value: 1 },
  { x: 5, y: 7, value: 1 },
  { x: 5, y: 8, value: 1 },
  { x: 6, y: 4, value: 1 },
  { x: 6, y: 5, value: 1 },
  { x: 6, y: 6, value: 1 },
  { x: 6, y: 7, value: 1 },
  { x: 6, y: 8, value: 1 },
  { x: 7, y: 4, value: 1 },
  { x: 7, y: 5, value: 1 },
  { x: 7, y: 6, value: 1 },
  { x: 7, y: 7, value: 1 },
  { x: 7, y: 8, value: 1 },
  { x: 7, y: 9, value: 1 },
  { x: 8, y: 4, value: 1 },
  { x: 8, y: 5, value: 1 },
  { x: 8, y: 6, value: 1 },
  { x: 8, y: 7, value: 1 },
  { x: 8, y: 8, value: 1 },
  { x: 8, y: 9, value: 1 },
  { x: 9, y: 7, value: 1 },
  { x: 10, y: 12, value: 1 },
  { x: 11, y: 12, value: 1 },
  { x: 12, y: 3, value: 1 },
];

applyState({ board }, newBoardState).then((boardState) =>
  refreshBoard(boardState),
);
