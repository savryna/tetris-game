import { GAME_SETTINGS } from './gameSettingStart.js';
import {
  showPlayField,
  tetromino,
  createTetromino,
  clearTetromino,
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
  returnTop,
} from './moveTetromino.js';
import { checkFullPlayfield } from './lose.js';
import {
  play,
  pause,
  isPlaying,
  blockKeyboard,
  cleanPlayfield,
} from './gameControl.js';
import { resetScore } from './score.js';

setNextImg(nextTetrominoQeue[0].tetrominoType);

const startModal = document.querySelector('.modal-start');
const playBtn = document.querySelectorAll('.play');
const pauseModal = document.querySelector('.modal-pause');
const winModal = document.querySelector('.modal-win');
const loseModal = document.querySelector('.modal-lose');
const totalScorePause = document.querySelector('.total-score-pause');
const totalScoreOther = document.querySelector('.total-score-other');

const allModals = [
  startModal,
  pauseModal,
  winModal,
  loseModal,
  totalScoreOther,
  totalScorePause,
];
startModal.showModal();

document.addEventListener('keydown', (event) => {
  if (!isPlaying) {
    blockKeyboard(event);
  } else {
    if (event.key === 'ArrowDown') moveTetrominoDown();
    if (event.key === 'ArrowRight') moveTetrominoRight();
    if (event.key === 'ArrowLeft') moveTetrominoLeft();
    if (event.key === 'ArrowUp') {
      rotateTetromino();
    }

    console.log(isPlaying);
    showPlayField();
  }

  if (event.code === 'Space') {
    if (!isPlaying) {
      play();
      pauseModal.close();
    } else {
      pause();
      pauseModal.showModal();
    }
  }
});

playBtn.forEach((btn) =>
  btn.addEventListener('click', () => {
    closeModal(allModals);
    play();
    document.removeEventListener('keydown', blockKeyboard);
    startOver();
  }),
);

const startOverBtn = document.querySelectorAll('.start-over');
const playAgainBtn = document.querySelector('.play-again');
const restartGame = [playAgainBtn, ...startOverBtn];
const mesh = document.querySelectorAll('.cell');

// П Е Р Е Д Е Л А Т Ь

restartGame.forEach((btn) =>
  btn.addEventListener('click', () => {
    startOver();
  }),
);

function startOver() {
  GAME_SETTINGS.lines = 0;

  clearTetromino();
  showPlayField();
  cleanPlayfield();
  resetScore();
  closeModal(allModals);
  // pauseModal.close();
  // winModal.close();
  // loseModal.close();
  mesh.forEach((cell) => cell.removeAttribute('class'));
  play();
}

const totalScoreBtns = [...document.querySelectorAll('button.total-score')];

const totalScoreBtnOther = [
  totalScoreBtns[0],
  totalScoreBtns[2],
  totalScoreBtns[3],
];

const totalScoreBtnPause = totalScoreBtns[1];

totalScoreBtnOther.forEach((btn) =>
  btn.addEventListener('click', () => {
    closeModal(allModals);
    totalScoreOther.showModal();
  }),
);

totalScoreBtnPause.addEventListener('click', () => {
  closeModal(allModals);
  totalScorePause.showModal();
});

const mainMenuBtn = document.querySelectorAll('.main-menu');

mainMenuBtn.forEach((btn) =>
  btn.addEventListener('click', () => {
    closeModal(allModals);
    startModal.showModal();
  }),
);

function closeModal(modals) {
  modals.forEach((modal) => {
    console.log(modal);
    if (modal.hasAttribute('open')) {
      modal.close();
    }
  });
}
