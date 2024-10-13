import { score } from './score';
import { sortArray } from './help';

const totalScore = [];

function addNewScore() {
  totalScore.push(score);
}

function cutTotalScore() {
  addNewScore();
  sortArray(totalScore);
  return new Set(totalScore.slice(0, 10));
}

const keyLocalStrg = 'assavr-tetris';
export function updateTotalScore() {
  const arrayTotalScore = Array.from(cutTotalScore());
  localStorage.setItem(keyLocalStrg, JSON.stringify(arrayTotalScore));
  cutTotalScore();
}

export function setLocalStorage() {
  const returnData = JSON.parse(localStorage.getItem(keyLocalStrg));
  return returnData;
}

const totalScoreList = Array.from(document.querySelectorAll('.total-item'));

export function createTotalList() {
  const arrScore = setLocalStorage();
  for (let i = 0; i < totalScoreList.length; i++) {
    const columnIdx = i % 10;
    totalScoreList[i].innerHTML = arrScore[columnIdx] ?? ' ';
  }
}
