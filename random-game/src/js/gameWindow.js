import { TETROMINO_MATRIX, TETROMINO_TYPES } from './gameSettingStart.js';
import { getRandomElem } from './help.js';
import { GAME_SETTINGS } from './gameSettingStart.js';
import { lockTetromino } from './moveTetromino.js';

const gameWrapper = document.querySelector('.main-game');
const playfield = GAME_SETTINGS.playfield;

function createMesh() {
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
  const { tetrominoType } = tetromino;
  // mesh.forEach((cell) => {
  //   const classToRemove = [...cell.classList].find((cls) =>
  //     cls.startsWith(tetrominoType),
  //   );
  //   cell.classList.remove(classToRemove);
  // });
  mesh.forEach((cell) => cell.removeAttribute('class'));
  drawPlayfield();
  showTetromino();
}

export function drawPlayfield() {
  const { tetrominoType } = tetromino;
  const allCell = [];
  for (let y = 0; y < GAME_SETTINGS.rows; y++) {
    for (let x = 0; x < GAME_SETTINGS.columns; x++) {
      if (!playfield[y][x]) continue;
      const cellIndex = convertPositionToIndex(y, x);
      addStyle(y, x, cellIndex);
      // mesh[cellIndex].classList.add(tetrominoType);
      // console.log(mesh[cellIndex]);
      //
      //  \\   //
      //   \\ //
      //    \\/      НЕ РАБОТАЕТ
      //   //\\
      //  //  \\
      // console.log(tetrominoType);
      // addStyle(tetrominoType);
      // createTypeIdxArr('o');
      // console.log(cellIndex);
      // allCell.push(mesh[cellIndex]);
      // addStyleFromIdx(allCell, tetrominoType);
    }
  }
  // console.log(playfield);
}

// mesh[idxNum].classList.add(`l-${wordIdx[(idx % 4) + 1]}`);

function addStyle(typeTetromino) {
  // const typeName = playfield[row][column];
  const wordIdx = ['zero', 'one', 'two', 'three'];
  const o = createTypeIdxArr('o').forEach(
    (idxFromMesh, idx, arr) => {
      const columnIdx = idx % 4;
      mesh[idxFromMesh].classList.add(`o-${wordIdx[columnIdx]}`);
    },
    // mesh[idxNum].classList.add(
    //   `o-${wordIdx[Math.abs(idx - (arr.length - 4))]}`,
    // ),
  );
  const i = createTypeIdxArr('i').forEach(
    (idxFromMesh, idx, arr) => {
      const columnIdx = idx % 4;
      mesh[idxFromMesh].classList.add(`i-${wordIdx[columnIdx]}`);
    },
    // mesh[idxNum].classList.add(
    //   `i-${wordIdx[Math.abs(idx - (arr.length - 4))]}`,
    // ),
  );
  const s = createTypeIdxArr('s').forEach(
    (idxFromMesh, idx, arr) => {
      const columnIdx = idx % 4;
      mesh[idxFromMesh].classList.add(`s-${wordIdx[columnIdx]}`);
    },
    // mesh[idxNum].classList.add(
    //   `s-${wordIdx[Math.abs(idx - (arr.length - 4))]}`,
    // ),
  );
  const z = createTypeIdxArr('z').forEach(
    (idxFromMesh, idx, arr) => {
      const columnIdx = idx % 4;
      mesh[idxFromMesh].classList.add(`z-${wordIdx[columnIdx]}`);
    },
    //   {
    //   // console.log(Math.abs(idx - (arr.length - 4)));
    //   mesh[idxNum].classList.add(
    //     `z-${wordIdx[Math.abs(idx - (arr.length - 4))]}`,
    //   );
    // }
  );
  const t = createTypeIdxArr('t').forEach(
    (idxFromMesh, idx, arr) => {
      const columnIdx = idx % 4;
      mesh[idxFromMesh].classList.add(`t-${wordIdx[columnIdx]}`);
    },
    //   {
    //   // console.log(idx - (arr.length - 4));
    //   mesh[idxNum].classList.add(
    //     `t-${wordIdx[Math.abs(idx - (arr.length - 4))]}`,
    //   );
    // }
  );
  const j = createTypeIdxArr('j').forEach(
    (idxFromMesh, idx, arr) => {
      const columnIdx = idx % 4;
      mesh[idxFromMesh].classList.add(`j-${wordIdx[columnIdx]}`);
    },

    //   {
    //   // console.log(idx - (arr.length - 4));
    //   mesh[idxNum].classList.add(
    //     `j-${wordIdx[Math.abs(idx - (arr.length - 4))]}`,
    //   );
    // }
  );
  const l = createTypeIdxArr('l').forEach(
    (idxFromMesh, idx, arr) => {
      const columnIdx = idx % 4;
      mesh[idxFromMesh].classList.add(`l-${wordIdx[columnIdx]}`);
    },

    //   {
    //   // console.log(idx - (arr.length - 4));
    //   mesh[idxNum].classList.add(
    //     `l-${wordIdx[Math.abs(idx - (arr.length - 4))]}`,
    //   );
    // }
  );
  // console.log(tetrominoTypeIdx[typeTetromino]);

  // mesh[idx].classList.add('hi');
}

// на утро: здесь я хочу для каждого key заменить его на соответствующий индекс из mesh
function createTypeIdxArr(key) {
  const arr = [];
  let res = [];
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[0].length; x++) {
      if (!playfield[y][x]) continue;
      if (playfield[y][x] === key) {
        arr.push(convertPositionToIndex(y, x));
      }
    }
  }
  return arr;
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

      //
      //  \\   //
      //   \\ //
      //    \\/      НЕ РАБОТАЕТ(плохо работает)
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
//    \\/      НЕ РАБОТАЕТ(плохо работает)
//   //\\
//  //  \\
function addStyleFromIdx(array, style) {
  const wordIdx = ['zero', 'one', 'two', 'three'];
  array.forEach((elem, idx) => elem.classList.add(`${style}-${wordIdx[idx]}`));
}

export function clearTetromino() {
  const startTetromino = structuredClone(createTetromino());
  const { rowStart, columnStart, tetrominoType, matrixBox, matrixSize } =
    startTetromino;
  console.log(tetromino);
  tetromino.rowStart = rowStart;
  tetromino.columnStart = columnStart;
  tetromino.tetrominoType = tetrominoType;
  tetromino.matrixBox = matrixBox;
  tetromino.matrixSize = matrixSize;
}
