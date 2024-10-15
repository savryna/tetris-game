import { pause } from './gameControl.js';
import { addNewScore } from './totalScore.js';
import { createTotalList } from './totalScore.js';
import { audioWin } from './audio.js';

const audioWinElem = document.querySelector('.game-sound');
const winScore = 1984;
const modalWin = document.querySelector('.modal-win');
export function win(currentScore) {
  if (currentScore >= winScore) {
    audioWin(audioWinElem);
    addNewScore();
    createTotalList();
    // updateTotalScore();
    // setLocalStorage();
    modalWin.showModal();
    // setLocalStorage();
    pause();
  }
}
