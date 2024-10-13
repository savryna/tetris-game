import { GAME_SETTINGS } from './gameSettingStart.js';

const playfield = GAME_SETTINGS.playfield;

export function checkFullPlayfield() {
  let counter = 0;
  for (let y = 15; y > 0; y--) {
    console.log(typeof playfield[y]);
    // if (playfield[y].filter((elem) => elem).length) {
    //   counter += 1;
    // }
  }
  // console.log(counter);
  if (counter === 15) {
    return true;
  }
}
