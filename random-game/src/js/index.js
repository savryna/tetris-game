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
import { checkFullPlayfield } from './lose.js';
import { play, pause, isPlaying } from './gameControl.js';
// import { checkFullLine, updatePlayefield } from './line.js';

setNextImg(nextTetrominoQeue[0].tetrominoType);
// console.log(nextTetrominoQeue);

// showPlayField();

// const playAgain = document.querySelector('.play-again');
// playAgain.addEventListener('click', () => showPlayField());
// const modalWin = document.querySelector('.modal-win');
// modalWin.showModal();

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown') moveTetrominoDown();
  if (event.key === 'ArrowRight') moveTetrominoRight();
  if (event.key === 'ArrowLeft') moveTetrominoLeft();
  if (event.key === 'ArrowUp') {
    rotateTetromino();
  }
  if (event.key === 'z') checkFullPlayfield();
  if (event.code === 'Space') {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  }

  showPlayField();
});
