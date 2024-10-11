import { GAME_SETTINGS } from './gameSettingStart.js';
import {
  showPlayField,
  // moveTetrominoDown,
  // moveTetrominoLeft,
  // moveTetrominoRight,
} from './gameWindow.js';
import {
  moveTetrominoDown,
  moveTetrominoLeft,
  moveTetrominoRight,
  rotateTetromino,
  nextTetrominoQeue,
  setNextImg,
} from './moveTetromino.js';

// import { checkFullLine, updatePlayefield } from './line.js';

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown') moveTetrominoDown();
  if (event.key === 'ArrowRight') moveTetrominoRight();
  if (event.key === 'ArrowLeft') moveTetrominoLeft();
  if (event.key === 'ArrowUp') {
    rotateTetromino();
  }
  if (event.code === 'KeyZ') {
    checkFullLine();
    updatePlayefield();
  }
  showPlayField();
});

setNextImg(nextTetrominoQeue[0].tetrominoType);
// console.log(nextTetrominoQeue);
showPlayField();

const modalWin = document.querySelector('.modal-win');
modalWin.showModal();
