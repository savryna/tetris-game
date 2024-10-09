import { GAME_SETTINGS } from './gameSettingStart';

const playfield = GAME_SETTINGS.playfield;

const lineForDelete = new Set();
const notEmptyLine = new Set();
export function checkFullLine() {
  for (let y = 0; y < playfield.length; y++) {
    const line = playfield[y];
    for (let x = 0; x < playfield[0].length; x++) {
      if (!playfield[y][x]) continue;
      line[x] = playfield[y][x];
      const lineLength = line.filter((elem) => elem).length;
      if (lineLength === playfield[0].length) {
        console.log(`line${y}:full`);
        lineForDelete.add(y);
      }
      if (lineLength > 0 && lineLength < playfield[0].length) {
        console.log(`line${y}:not empty`);
        notEmptyLine.add(y);
      }
    }
  }
  console.log(lineForDelete);
  console.log(notEmptyLine);
}

export function updatePlayefield() {
  Array.from(lineForDelete).map((y) => {
    playfield[y].fill(0);
  });
  console.log(`one step:`, playfield);
  if (lineForDelete.size) {
    // Array.from(notEmptyLine).map((y) => {
    //   return playfield[y - 1].fill((_, idx) => playfield[y][idx]);
    // });
    console.log('second step', playfield);
  }
}
