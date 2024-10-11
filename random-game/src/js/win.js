import { countScore } from './score.js';

const winScore = 1984;
const modalWin = document.querySelector('.modal-win');
// const currentScore = countScore();
export function win(currentScore) {
  if (currentScore === winScore) {
    // alert('win');
    modalWin.showModal();
  }
}
