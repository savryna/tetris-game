import { GAME_SETTINGS } from './gameSettingStart.js';
import {
  showPlayField,
  tetromino,
  createTetromino,
  clearTetromino,
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
import {
  play,
  pause,
  isPlaying,
  blockKeyboard,
  cleanPlayfield,
} from './gameControl.js';
import { resetScore, chooseCroccCheck } from './score.js';
import { createTotalList } from './totalScore.js';
import { toggleAudio } from './audio.js';

setNextImg(nextTetrominoQeue[0].tetrominoType);
createTotalList();

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

// startModal.showModal();

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

    showPlayField();
  }
  if (event.code === 'Space') {
    if (!isPlaying) {
      play();
      // pauseModal.close();
      toggleAnimationModal(pauseModal);
    } else {
      pause();
      toggleAnimationModal(pauseModal);
      // pauseModal.animate(
      //   { transform: ['translateY(-500px)', 'translateY(0px)'] },
      //   200,
      // );
      // pauseModal.showModal();
    }
  }
});

playBtn[0].addEventListener('click', () => {
  closeModal(allModals);
  document.removeEventListener('keydown', blockKeyboard);
  startOver();
});

playBtn[1].addEventListener('click', () => {
  closeModal(allModals);
  play();
});

playBtn[2].addEventListener('click', () => {
  closeModal(allModals);
  document.removeEventListener('keydown', blockKeyboard);
  startOver();
});

const startOverBtn = document.querySelectorAll('.start-over');
const playAgainBtn = document.querySelector('.play-again');
const restartGame = [playAgainBtn, ...startOverBtn];
const mesh = document.querySelectorAll('.cell');

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
    toggleAnimationModal(totalScoreOther);
    // totalScoreOther.showModal();
  }),
);

totalScoreBtnPause.addEventListener('click', () => {
  closeModal(allModals);
  toggleAnimationModal(totalScorePause);
  // totalScorePause.showModal();
});

const mainMenuBtn = document.querySelectorAll('.main-menu');

mainMenuBtn.forEach((btn) =>
  btn.addEventListener('click', () => {
    closeModal(allModals);
    toggleAnimationModal(startModal);
    // startModal.showModal();
  }),
);

function closeModal(modals) {
  modals.forEach((modal) => {
    if (modal.hasAttribute('open')) {
      toggleAnimationModal(modal);
    }
  });
}

const audio = document.querySelector('.audio-bg');
const btnAudio = document.querySelector('.button-sound');

btnAudio.addEventListener('click', () => toggleAudio(audio));

const crossCheckInput = document.querySelector('.cross-check-input');
crossCheckInput.addEventListener('click', () => chooseCroccCheck());

function toggleAnimationModal(modalWindow) {
  if (!modalWindow.hasAttribute('open')) {
    modalWindow.animate(
      { transform: ['translateY(-500px)', 'translateY(0px)'] },
      200,
    );

    modalWindow.showModal();
  } else {
    const animation = modalWindow.animate(
      { transform: ['translateY(0)', 'translateY(-999px)'] },
      200,
    );
    animation.onfinish = (event) => {
      modalWindow.close();
    };
  }
}
