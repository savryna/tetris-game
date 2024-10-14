import { score } from './score';
import { sortArray } from './help';

const keyLocalStrg = 'assavr-tetris';
let totalScore = JSON.parse(localStorage.getItem(keyLocalStrg)) ?? [];

export function addNewScore() {
  totalScore.push(score);
  sortArray(totalScore);
  console.log(totalScore);
  totalScore = Array.from(new Set(totalScore.slice(0, 10)));
  localStorage.setItem(keyLocalStrg, JSON.stringify(totalScore));
  console.log(totalScore);
}

// export function updateTotalScore() {
//   const arrayTotalScore = Array.from(cutTotalScore());
//   localStorage.setItem(keyLocalStrg, JSON.stringify(arrayTotalScore));
//   cutTotalScore();
// }

// export function setLocalStorage() {
//   const returnData = JSON.parse(localStorage.getItem(keyLocalStrg));
//   return returnData;
// }

const totalScoreList = Array.from(document.querySelectorAll('.total-item'));

export function createTotalList() {
  for (let i = 0; i < totalScoreList.length; i++) {
    const columnIdx = i % 10;
    totalScoreList[i].innerHTML = totalScore[columnIdx] ?? 'Empty';
  }
}
