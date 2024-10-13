import { pause } from './gameControl.js';
import { updateTotalScore } from './totalScore.js';

const winScore = 1984;
const modalWin = document.querySelector('.modal-win');
export function win(currentScore) {
  if (currentScore === winScore) {
    updateTotalScore();
    modalWin.showModal();
    pause();
  }
}
