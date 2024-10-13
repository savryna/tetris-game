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
import { play, pause, isPlaying, blockKeyboard } from './gameControl.js';

setNextImg(nextTetrominoQeue[0].tetrominoType);

const startModal = document.querySelector('.modal-start');
const playBtn = document.querySelector('.play');

startModal.showModal();

document.addEventListener('keydown', (event) => {
  if (startModal.hasAttribute('open')) {
    blockKeyboard(event);
  } else {
    if (event.key === 'ArrowDown') moveTetrominoDown();
    if (event.key === 'ArrowRight') moveTetrominoRight();
    if (event.key === 'ArrowLeft') moveTetrominoLeft();
    if (event.key === 'ArrowUp') {
      rotateTetromino();
    }

    if (event.code === 'Space') {
      if (!isPlaying) {
        play();
      } else {
        pause();
      }
    }

    showPlayField();
  }
});

playBtn.addEventListener('click', () => {
  startModal.close();
  play();
  document.removeEventListener('keydown', blockKeyboard);
});
