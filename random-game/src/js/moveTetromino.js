import { tetromino, showPlayField } from './gameWindow.js';
import { GAME_SETTINGS } from './gameSettingStart.js';
import { transposeMatrix, reverseMatrix } from './help.js';

const playfield = GAME_SETTINGS.initPlayField();
let isRotating = false;

export function moveTetrominoDown() {
  tetromino.rowStart += 1;
  if (isBorder()) {
    tetromino.rowStart -= 1;
  }
}

export function moveTetrominoRight() {
  tetromino.columnStart += 1;
  if (isBorder()) {
    tetromino.columnStart -= 1;
  }
  console.log(tetromino.columnStart);
}

export function moveTetrominoLeft() {
  tetromino.columnStart -= 1;
  if (isBorder()) {
    tetromino.columnStart += 1;
  }
  console.log(tetromino.columnStart);
}

function isBorder() {
  const { columnStart, rowStart, matrixSize, matrixBox } = tetromino;
  for (let y = 0; y < matrixSize; y++) {
    for (let x = 0; x < matrixSize; x++) {
      if (!matrixBox[y][x]) {
        continue;
      }
      if (
        playfield[y][columnStart + x] === undefined ||
        playfield[rowStart + y] === undefined
      ) {
        return true;
      }
    }
  }
}

export function rotateTetromino() {
  if (isRotating) return;
  isRotating = true;
  const rotateMatrix = reverseMatrix(transposeMatrix(tetromino.matrixBox));
  tetromino.matrixBox = rotateMatrix;

  for (let y = 0; y < tetromino.matrixSize; y++) {
    for (let x = 0; x < tetromino.matrixSize; x++) {
      if (!tetromino.matrixBox[y][x]) {
        continue;
      }
      kickWall(y, x);
    }
  }
  setTimeout(() => {
    isRotating = false;
  }, 100);
}

function kickWall(row, column) {
  if (tetromino.columnStart <= 0) {
    tetromino.columnStart = 0;
  }
  if (tetromino.columnStart + column >= 9) {
    tetromino.columnStart = 9 - column;
  }
}
