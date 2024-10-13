import { showPlayField } from './gameWindow.js';
import { moveTetrominoDown } from './moveTetromino.js';
import { GAME_SETTINGS } from './gameSettingStart.js';

const playfield = GAME_SETTINGS.playfield;
export let isPlaying = false;
let timer = null;

export function play() {
  isPlaying = true;
  showPlayField();
  timer = setInterval(() => {
    moveTetrominoDown();
    showPlayField();
  }, 1000);
}

export function pause() {
  isPlaying = false;
  clearInterval(timer);
  timer = null;
  showPlayField();
}

export function blockKeyboard(event) {
  event.preventDefault();
}

export function cleanPlayfield() {
  for (let y = 0; y < GAME_SETTINGS.rows; y++) {
    playfield[y] = new Array(GAME_SETTINGS.columns).fill(0);
  }
}
