import { GAME_SETTINGS } from './gameSettingStart.js';
import {
  showPlayField,
  // moveTetrominoDown,
  // moveTetrominoLeft,
  // moveTetrominoRight,
} from './gameWindow.js';
import {
  moveTetrominoDown,
  moveTetrominoLeft,
  moveTetrominoRight,
} from './moveTetromino.js';

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown') moveTetrominoDown();
  if (event.key === 'ArrowRight') moveTetrominoRight();
  if (event.key === 'ArrowLeft') moveTetrominoLeft();
  showPlayField();
});

showPlayField();
