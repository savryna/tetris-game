import { tetromino } from './gameWindow.js';
import { GAME_SETTINGS } from './gameSettingStart.js';

const playfield = GAME_SETTINGS.initPlayField();

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
        playfield[rowStart + y] === undefined
      ) {
        return true;
      }
    }
  }
}
