export function getRandomElem(array) {
  const idx = Math.floor(Math.random() * array.length);
  return array[idx];
}

export function transposeMatrix(matrix) {
  const row = matrix.length;
  const column = matrix[0].length;
  let resultMatrix = Array(row)
    .fill()
    .map(() => Array(column));
  for (let y = 0; y < row; y++) {
    for (let x = 0; x < column; x++) {
      resultMatrix[y][x] = matrix[x][y];
    }
  }
  return resultMatrix;
}

export function reverseMatrix(matrix) {
  return matrix.map((elem) => elem.reverse());
}

export function sortArray(array) {
  array.sort((a, b) => b - a);
}
