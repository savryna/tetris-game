import { TETROMINO_MATRIX, TETROMINO_TYPES } from './gameSettingStart.js';
import { getRandomElem } from './help.js';
import { GAME_SETTINGS } from './gameSettingStart.js';

const gameWrapper = document.querySelector('.main-game');

function createMesh() {
  const playfield = GAME_SETTINGS.initPlayField();
  Array.from({ length: playfield.length * 10 }, () => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    gameWrapper.append(cell);
  });
}

function createTetromino() {
  const tetrominoType = getRandomElem(TETROMINO_TYPES);
  const matrixBox = TETROMINO_MATRIX[tetrominoType];
  const matrixSize = matrixBox.length;
  const columnStart =
    GAME_SETTINGS.columns / 2 - Math.floor(matrixBox.length / 2);
  // const rowStart = -2;
  const rowStart = 0;
  const tetromino = {
    tetrominoType,
    matrixBox,
    matrixSize,
    columnStart,
    rowStart,
  };
  return tetromino;
}

createMesh();
const mesh = document.querySelectorAll('.cell');
const tetromino = createTetromino();

export function showPlayField() {
  const { tetrominoType } = tetromino;
  mesh.forEach((cell) => cell.classList.remove(tetrominoType));
  showTetromino();
}

function showTetromino() {
  const { tetrominoType, matrixSize, matrixBox, rowStart, columnStart } =
    tetromino;
  const allCell = [];
  for (let y = 0; y < matrixSize; y++) {
    for (let x = 0; x < matrixSize; x++) {
      if (!matrixBox[y][x]) continue;
      if (rowStart + y < 0) continue;
      const cellIndex = convertPositionToIndex(rowStart + y, columnStart + x);
      mesh[cellIndex].classList.add(tetrominoType);
      allCell.push(mesh[cellIndex]);
      // console.log(cellIndex);
    }
  }
  const zeroCell = allCell[0];
  zeroCell.classList.add(`${tetrominoType}-zero`);
  const oneCell = allCell[1];
  oneCell.classList.add(`${tetrominoType}-one`);
  const twoCell = allCell[2];
  twoCell.classList.add(`${tetrominoType}-two`);
  const threeCell = allCell[3];
  threeCell.classList.add(`${tetrominoType}-three`);
}

function convertPositionToIndex(row, column) {
  return row * GAME_SETTINGS.columns + column;
}
