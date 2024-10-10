import { TETROMINO_MATRIX, TETROMINO_TYPES } from './gameSettingStart.js';
import { tetromino, createTetromino } from './gameWindow.js';
import { GAME_SETTINGS } from './gameSettingStart.js';
import { transposeMatrix, reverseMatrix, getRandomElem } from './help.js';
import { updatePlayefield } from './line.js';
const playfield = GAME_SETTINGS.playfield;
// let activeTetromino = tetromino;
// const startTetromino = structuredClone(createTetromino());

let isRotating = false;
let isLock = false;

export function moveTetrominoDown() {
  tetromino.rowStart += 1;
  if (isBorder()) {
    tetromino.rowStart -= 1;
    isRotating = true;
    lockTetromino();
  }
  returnTop();
}

export function moveTetrominoRight() {
  tetromino.columnStart += 1;
  if (isBorder()) {
    tetromino.columnStart -= 1;
  }
  // if (isLock) {
  //   tetromino.rowStart = startTetromino.rowStart;
  //   isLock = false;
  // }
  returnTop();
  // console.log('start', startTetromino);
  // console.log('tetromino', tetromino);
  // console.log(tetromino.columnStart);
}

export function moveTetrominoLeft() {
  tetromino.columnStart -= 1;
  if (isBorder()) {
    tetromino.columnStart += 1;
  }
  returnTop();
  // if (isLock) {
  //   tetromino.rowStart = startTetromino.rowStart;
  //   isLock = false;
  // }
  // console.log(tetromino.columnStart);
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
        playfield[rowStart + y] === undefined ||
        playfield[rowStart + y][columnStart + x]
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

export function lockTetromino() {
  const { columnStart, rowStart, matrixSize, matrixBox, tetrominoType } =
    tetromino;
  for (let y = 0; y < matrixSize; y++) {
    for (let x = 0; x < matrixSize; x++) {
      if (!matrixBox[y][x]) continue;
      playfield[rowStart + y][columnStart + x] = tetrominoType;
    }
  }
  isRotating = false;
  isLock = true;
  return playfield;
}

function returnTop() {
  const startTetromino = structuredClone(createTetromino());
  const { rowStart: row, columnStart: column } = startTetromino;
  if (isLock) {
    tetromino.rowStart = row;
    tetromino.columnStart = column;
    tetromino.tetrominoType = getRandomElem(TETROMINO_TYPES);
    tetromino.matrixBox = TETROMINO_MATRIX[tetromino.tetrominoType];
    tetromino.matrixSize = tetromino.matrixBox.length;
    isLock = false;
  }
  updatePlayefield();
}
