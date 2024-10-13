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
    startModal.close();
    totalScoreOther.close();
    play();
    document.removeEventListener('keydown', blockKeyboard);
  }),
);

const startOverBtn = document.querySelectorAll('.start-over');
const playAgainBtn = document.querySelector('.play-again');
const restartGame = [playAgainBtn, ...startOverBtn];
const mesh = document.querySelectorAll('.cell');

// П Е Р Е Д Е Л А Т Ь

restartGame.forEach((btn) =>
  btn.addEventListener('click', () => {
    // const startTetromino = structuredClone(createTetromino());
    // const { rowStart, columnStart, tetrominoType, matrixBox, matrixSize } =
    //   startTetromino;
    // console.log(tetromino);
    // tetromino.rowStart = rowStart;
    // tetromino.columnStart = columnStart;
    // tetromino.tetrominoType = tetrominoType;
    // tetromino.matrixBox = matrixBox;
    // tetromino.matrixSize = matrixSize;
    startOver();
  }),
);

function startOver() {
  GAME_SETTINGS.lines = 0;

  clearTetromino();
  showPlayField();
  cleanPlayfield();
  resetScore();
  pauseModal.close();
  winModal.close();
  loseModal.close();
  mesh.forEach((cell) => cell.removeAttribute('class'));
  play();
}

const totalScoreBtns = [...document.querySelectorAll('button.total-score')];

const totalScoreBtnMainMenu = totalScoreBtns[0];
console.log(totalScoreBtns);
totalScoreBtnMainMenu.addEventListener('click', () => {
  console.log('hi');
  totalScoreOther.showModal();
  startModal.close();
});
