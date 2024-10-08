import { TETROMINO_MATRIX, TETROMINO_TYPES } from './gameSettingStart.js';
import { getRandomElem } from './help.js';
import { GAME_SETTINGS } from './gameSettingStart.js';
import { lockTetromino } from './moveTetromino.js';

const gameWrapper = document.querySelector('.main-game');
const playfield = GAME_SETTINGS.playfield;

function createMesh() {
  // const playfield = GAME_SETTINGS.initPlayField();
  // const playfield = GAME_SETTINGS.playfield;
  Array.from({ length: playfield.length * 10 }, () => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    gameWrapper.append(cell);
  });
}

export function createTetromino() {
  let tetrominoType = getRandomElem(TETROMINO_TYPES);
  let matrixBox = TETROMINO_MATRIX[tetrominoType];
  let matrixSize = matrixBox.length;
  let columnStart =
    GAME_SETTINGS.columns / 2 - Math.floor(matrixBox.length / 2);
  let rowStart = -1;
  // let rowStart = 0;
  let tetromino = {
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
export const tetromino = createTetromino();

export function showPlayField() {
  // console.log(tetromino.matrixBox);
  // const arrForImg = tetromino.matrixBox;
  const { tetrominoType } = tetromino;
  mesh.forEach((cell) => {
    const classToRemove = [...cell.classList].find((cls) =>
      cls.startsWith(tetrominoType),
    );
    cell.classList.remove(classToRemove);
  });
  drawPlayfield();
  showTetromino();
}

export function drawPlayfield() {
  const { tetrominoType } = tetromino;
  // console.log(tetromino.matrixBox);
  // console.log(
  //   convertPositionToIndex(tetromino.rowStart, tetromino.columnStart),
  // );
  //allCell = Array(
  //   playfield.map((arr) => arr.filter((elem) => elem)).flat(Infinity).length,
  // );
  const allCell = [];
  // );
  for (let y = 0; y < GAME_SETTINGS.rows; y++) {
    for (let x = 0; x < GAME_SETTINGS.columns; x++) {
      if (!playfield[y][x]) continue;
      // console.log(x);
      const cellIndex = convertPositionToIndex(y, x);
      mesh[cellIndex].classList.add(tetrominoType);
      // console.log(cellIndex);

      //
      //  \\   //
      //   \\ //
      //    \\/      НЕ РАБОТАЕТ
      //   //\\
      //  //  \\

      // allCell.push(mesh[cellIndex]);
      // addStyleFromIdx(allCell, tetrominoType);
    }
  }
  // console.log(tetromino.rowStart);
  // tetromino.rowStart = 0;
}

function showTetromino() {
  const { tetrominoType, matrixSize, matrixBox, rowStart, columnStart } =
    tetromino;
  const allCell = [];
  // const arrForImg = [];
  for (let y = 0; y < matrixSize; y++) {
    for (let x = 0; x < matrixSize; x++) {
      if (!matrixBox[y][x]) continue;
      if (rowStart + y < 0) continue;
      const cellIndex = convertPositionToIndex(rowStart + y, columnStart + x);
      // mesh[cellIndex].classList.add(tetrominoType);

      // const testCellIndex = convertPositionToIndex(
      //   tetromino.rowStart + y,
      //   tetromino.columnStart + x,
      // );

      // console.log(Array.from(mesh[cellIndex]).length);
      // addStyleFromIdx(Array.from(mesh[cellIndex]), tetrominoType);
      // arrForImg.push(mesh[testCellIndex]);
      // addStyleFromIdx(arrForImg, tetrominoType);
      //
      //  \\   //
      //   \\ //
      //    \\/      НЕ РАБОТАЕТ
      //   //\\
      //  //  \\

      allCell.push(mesh[cellIndex]);
      addStyleFromIdx(allCell, tetrominoType);
    }
  }
}

function convertPositionToIndex(row, column) {
  return row * GAME_SETTINGS.columns + column;
}

// 0,  1,  2,  3   length = 4
// 4,  5,  6,  7   length = 8    convertIdx = [idx - (length - 4) ]
// 8,  9, 10, 11   length = 12

//
//  \\   //
//   \\ //
//    \\/      НЕ РАБОТАЕТ
//   //\\
//  //  \\
function addStyleFromIdx(array, style) {
  const wordIdx = ['zero', 'one', 'two', 'three'];
  array.forEach((elem, idx) => elem.classList.add(`${style}-${wordIdx[idx]}`));
}
