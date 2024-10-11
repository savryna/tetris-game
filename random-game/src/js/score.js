import { GAME_SETTINGS } from './gameSettingStart.js';

let linesFilled = GAME_SETTINGS.lines;
let score = 0;
// const fullLineSet = checkFullLine();
let isCrossCheck = true;
let isNormalGame = false;
let isInfinityGame = false;

export function countScore(set) {
  const amountLine = set.size;
  let lineWeight = 0;
  if (isCrossCheck) {
    lineWeight = 496;
    // lineWeight = 1984;
  }
  if (isNormalGame) {
    lineWeight = 64;
  }
  if (isInfinityGame) {
    lineWeight = 1;
  }
  if (amountLine) {
    console.log(lineWeight);
    for (let i = 0; i < amountLine; i++) {
      linesFilled += 1;
      score = linesFilled * lineWeight;
    }
  }
  console.log(score);
  return score;
}
