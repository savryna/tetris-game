import { TETROMINO_MATRIX, TETROMINO_TYPES } from './gameSettingStart.js';
import { tetromino, createTetromino } from './gameWindow.js';
import { GAME_SETTINGS } from './gameSettingStart.js';
import { transposeMatrix, reverseMatrix, getRandomElem } from './help.js';
import { updatePlayefield, checkFullLine } from './line.js';
import { countScore } from './score.js';
import { win } from './win.js';
import { checkFullPlayfield, lose } from './lose.js';
import { addNewScore } from './totalScore.js';

const playfield = GAME_SETTINGS.playfield;

let isRotating = false;
let isLock = false;

export function moveTetrominoDown() {
  tetromino.rowStart += 1;
  if (isBorder()) {
    tetromino.rowStart -= 1;
    isRotating = true;
    lockTetromino();
  }
}

export function moveTetrominoRight() {
  tetromino.columnStart += 1;
  if (isBorder()) {
    tetromino.columnStart -= 1;
  }
}

export function moveTetrominoLeft() {
  tetromino.columnStart -= 1;
  if (isBorder()) {
    tetromino.columnStart += 1;
  }
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
  if (tetromino.rowStart + tetromino.matrixSize >= GAME_SETTINGS.rows - 1) {
    event.preventDefault();
    isRotating = true;
    return false;
  }
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

const scoreHtmlElem = document.querySelector('.score>span');

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
  scoreHtmlElem.innerHTML = countScore(checkFullLine());
  returnTop();
  updatePlayefield();
  lose(checkFullPlayfield());
  setTimeout(() => win(countScore(checkFullLine())), 700);
}

export const nextTetrominoQeue = [createNextTetromino(), createNextTetromino()];

export function returnTop() {
  const startTetromino = structuredClone(createTetromino());
  const { rowStart: row, columnStart: column } = startTetromino;
  if (isLock) {
    const nextTImg = nextTetrominoQeue[1];
    const nextT = nextTetrominoQeue.shift();
    const {
      rowStart: nextRowStart,
      columnStart: nextColumnStart,
      tetrominoType: nextTetrominoType,
      matrixBox: nextMatrixBox,
      matrixSize: nextMatrixSize,
    } = nextT;
    setNextImg(nextTImg.tetrominoType);

    nextTetrominoQeue.push(createNextTetromino());
    tetromino.rowStart = nextRowStart;
    tetromino.columnStart = nextColumnStart;
    tetromino.tetrominoType = nextTetrominoType;
    tetromino.matrixBox = nextMatrixBox;
    tetromino.matrixSize = nextMatrixSize;
    isLock = false;
  }
}

function createNextTetromino() {
  const nextTetromino = structuredClone(createTetromino());
  return nextTetromino;
}

const nextTetrominoImg = document.querySelector('.next__img');

export function setNextImg(type) {
  nextTetrominoImg.removeAttribute('class');
  nextTetrominoImg.classList.add('next__img', `${type}-img`);
}
