import { countScore } from './score.js';

const winScore = 1984;
// const currentScore = countScore();
export function win(currentScore) {
  if (currentScore === winScore) {
    alert('win');
  }
}
