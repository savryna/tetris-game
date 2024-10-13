import { GAME_SETTINGS } from './gameSettingStart.js';

const playfield = GAME_SETTINGS.playfield;

export function checkFullLine() {
  const lineForDelete = new Set();
  for (let y = 0; y < playfield.length; y++) {
    const line = playfield[y];
    for (let x = 0; x < playfield[0].length; x++) {
      if (!playfield[y][x]) continue;
      line[x] = playfield[y][x];
      const lineLength = line.filter((elem) => elem).length;
      if (lineLength === playfield[0].length) {
        lineForDelete.add(y);
      }
    }
  }
  return lineForDelete;
}

export function updatePlayefield() {
  const lineForDelete = checkFullLine();
  removeFullLine(lineForDelete);
}

function removeFullLine(set) {
  set.forEach((fullLine) => updateIdxLine(fullLine));
}

function updateIdxLine(fullLine) {
  for (let row = fullLine; row > 0; row--) {
    playfield[row] = playfield[row - 1];
  }
  playfield[0] = new Array(GAME_SETTINGS.columns).fill(0);
}
