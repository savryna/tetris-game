import { showPlayField } from './gameWindow.js';
import { moveTetrominoDown } from './moveTetromino.js';

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
