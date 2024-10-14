import { pause } from './gameControl.js';
import { addNewScore } from './totalScore.js';
import { createTotalList } from './totalScore.js';

const winScore = 1984;
const modalWin = document.querySelector('.modal-win');
export function win(currentScore) {
  if (currentScore === winScore) {
    addNewScore();
    createTotalList();
    // updateTotalScore();
    // setLocalStorage();
    modalWin.showModal();
    // setLocalStorage();
    pause();
  }
}
