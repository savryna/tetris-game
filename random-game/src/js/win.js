import { countScore } from './score.js';
import { pause } from './gameControl.js';
import { updateTotalScore } from './totalScore.js';

const winScore = 1984;
const modalWin = document.querySelector('.modal-win');
// const currentScore = countScore();
export function win(currentScore) {
  if (currentScore === winScore) {
    // alert('win');
    updateTotalScore();
    modalWin.showModal();
    pause();
  }
}
