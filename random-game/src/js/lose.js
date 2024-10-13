import { GAME_SETTINGS } from './gameSettingStart.js';
import { pause } from './gameControl.js';
import { score } from './score.js';

const playfield = GAME_SETTINGS.playfield;

export function checkFullPlayfield() {
  let counter = 0;
  for (let y = 0; y < GAME_SETTINGS.rows; y++) {
    const isNotEmpty = playfield[y].findIndex((elem) => elem !== 0);
    if (isNotEmpty > -1) {
      counter += 1;
    }
  }
  console.log(counter);
  return counter;
}

const modalLose = document.querySelector('.modal-lose');
const loseScore = document.querySelector('.lose-score');
const linesForLose = 15;
export function lose(notEmptyLine) {
  if (notEmptyLine >= linesForLose - 1) {
    loseScore.innerHTML = `Score: ${score}`;
    modalLose.showModal();
    pause();
  }
}
