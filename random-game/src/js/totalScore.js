import { score } from './score';
import { sortArray } from './help';

const totalScore = [];

function addNewScore() {
  totalScore.push(score);
  // console.log(totalScore);
}

function cutTotalScore() {
  addNewScore();
  sortArray(totalScore);
  const topTen = new Set(totalScore.slice(0, 10));
  console.log(topTen);
  return topTen;
}

export function updateTotalScore() {
  cutTotalScore();
}
