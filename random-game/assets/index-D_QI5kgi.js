(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const GAME_SETTINGS = {
  //
  //
  //    |||     ||||||             |||    ||||||
  //    |||     ||  ||    \\ //    |||    ||___
  //    |||     ||  ||     \\\     |||        ||
  //    |||     ||||||    // \\    |||    ||||||
  //
  //     ||||||||||||
  //    ||          ||
  //    ||   X   X  ||
  //    ||          ||
  //    ||   ____   ||
  //    ||          ||
  //     ||||||||||||
  //
  rows: 15,
  columns: 10,
  score: 0,
  lines: 0,
  playfield: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
};
const TETROMINO_TYPES = ["o", "i", "s", "z", "l", "j", "t"];
const TETROMINO_MATRIX = {
  o: [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
  ],
  i: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  s: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]
  ],
  z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
  ],
  j: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  l: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0]
  ],
  t: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
  ]
};
function getRandomElem(array) {
  const idx = Math.floor(Math.random() * array.length);
  return array[idx];
}
function transposeMatrix(matrix) {
  const row = matrix.length;
  const column = matrix[0].length;
  let resultMatrix = Array(row).fill().map(() => Array(column));
  for (let y = 0; y < row; y++) {
    for (let x = 0; x < column; x++) {
      resultMatrix[y][x] = matrix[x][y];
    }
  }
  return resultMatrix;
}
function reverseMatrix(matrix) {
  return matrix.map((elem) => elem.reverse());
}
function sortArray(array) {
  array.sort((a, b) => b - a);
}
const gameWrapper = document.querySelector(".main-game");
const playfield$4 = GAME_SETTINGS.playfield;
function createMesh() {
  Array.from({ length: playfield$4.length * 10 }, () => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    gameWrapper.append(cell);
  });
}
function createTetromino() {
  let tetrominoType = getRandomElem(TETROMINO_TYPES);
  let matrixBox = TETROMINO_MATRIX[tetrominoType];
  let matrixSize = matrixBox.length;
  let columnStart = GAME_SETTINGS.columns / 2 - Math.floor(matrixBox.length / 2);
  let rowStart = -1;
  let tetromino2 = {
    tetrominoType,
    matrixBox,
    matrixSize,
    columnStart,
    rowStart
  };
  return tetromino2;
}
createMesh();
const mesh$1 = document.querySelectorAll(".cell");
const tetromino = createTetromino();
function showPlayField() {
  mesh$1.forEach((cell) => cell.removeAttribute("class"));
  drawPlayfield();
  showTetromino();
}
function drawPlayfield() {
  for (let y = 0; y < GAME_SETTINGS.rows; y++) {
    for (let x = 0; x < GAME_SETTINGS.columns; x++) {
      if (!playfield$4[y][x]) continue;
      addStyle();
    }
  }
}
function addStyle(typeTetromino) {
  const wordIdx = ["zero", "one", "two", "three"];
  createTypeIdxArr("o").forEach((idxFromMesh, idx, arr) => {
    const columnIdx = idx % 4;
    mesh$1[idxFromMesh].classList.add(`o-${wordIdx[columnIdx]}`);
  });
  createTypeIdxArr("i").forEach((idxFromMesh, idx, arr) => {
    const columnIdx = idx % 4;
    mesh$1[idxFromMesh].classList.add(`i-${wordIdx[columnIdx]}`);
  });
  createTypeIdxArr("s").forEach((idxFromMesh, idx, arr) => {
    const columnIdx = idx % 4;
    mesh$1[idxFromMesh].classList.add(`s-${wordIdx[columnIdx]}`);
  });
  createTypeIdxArr("z").forEach((idxFromMesh, idx, arr) => {
    const columnIdx = idx % 4;
    mesh$1[idxFromMesh].classList.add(`z-${wordIdx[columnIdx]}`);
  });
  createTypeIdxArr("t").forEach((idxFromMesh, idx, arr) => {
    const columnIdx = idx % 4;
    mesh$1[idxFromMesh].classList.add(`t-${wordIdx[columnIdx]}`);
  });
  createTypeIdxArr("j").forEach((idxFromMesh, idx, arr) => {
    const columnIdx = idx % 4;
    mesh$1[idxFromMesh].classList.add(`j-${wordIdx[columnIdx]}`);
  });
  createTypeIdxArr("l").forEach((idxFromMesh, idx, arr) => {
    const columnIdx = idx % 4;
    mesh$1[idxFromMesh].classList.add(`l-${wordIdx[columnIdx]}`);
  });
}
function createTypeIdxArr(key) {
  const arr = [];
  for (let y = 0; y < playfield$4.length; y++) {
    for (let x = 0; x < playfield$4[0].length; x++) {
      if (!playfield$4[y][x]) continue;
      if (playfield$4[y][x] === key) {
        arr.push(convertPositionToIndex(y, x));
      }
    }
  }
  return arr;
}
function showTetromino() {
  const { tetrominoType, matrixSize, matrixBox, rowStart, columnStart } = tetromino;
  const allCell = [];
  for (let y = 0; y < matrixSize; y++) {
    for (let x = 0; x < matrixSize; x++) {
      if (!matrixBox[y][x]) continue;
      if (rowStart + y < 0) continue;
      const cellIndex = convertPositionToIndex(rowStart + y, columnStart + x);
      mesh$1[cellIndex].classList.add(tetrominoType);
      allCell.push(mesh$1[cellIndex]);
      addStyleFromIdx(allCell, tetrominoType);
    }
  }
}
function convertPositionToIndex(row, column) {
  return row * GAME_SETTINGS.columns + column;
}
function addStyleFromIdx(array, style) {
  const wordIdx = ["zero", "one", "two", "three"];
  array.forEach((elem, idx) => elem.classList.add(`${style}-${wordIdx[idx]}`));
}
function clearTetromino() {
  const startTetromino = structuredClone(createTetromino());
  const { rowStart, columnStart, tetrominoType, matrixBox, matrixSize } = startTetromino;
  tetromino.rowStart = rowStart;
  tetromino.columnStart = columnStart;
  tetromino.tetrominoType = tetrominoType;
  tetromino.matrixBox = matrixBox;
  tetromino.matrixSize = matrixSize;
}
const playfield$3 = GAME_SETTINGS.playfield;
function checkFullLine() {
  const lineForDelete = /* @__PURE__ */ new Set();
  for (let y = 0; y < playfield$3.length; y++) {
    const line = playfield$3[y];
    for (let x = 0; x < playfield$3[0].length; x++) {
      if (!playfield$3[y][x]) continue;
      line[x] = playfield$3[y][x];
      const lineLength = line.filter((elem) => elem).length;
      if (lineLength === playfield$3[0].length) {
        lineForDelete.add(y);
      }
    }
  }
  return lineForDelete;
}
function updatePlayefield() {
  const lineForDelete = checkFullLine();
  removeFullLine(lineForDelete);
}
function removeFullLine(set) {
  set.forEach((fullLine) => updateIdxLine(fullLine));
}
function updateIdxLine(fullLine) {
  for (let row = fullLine; row > 0; row--) {
    playfield$3[row] = playfield$3[row - 1];
  }
  playfield$3[0] = new Array(GAME_SETTINGS.columns).fill(0);
}
let linesFilled = GAME_SETTINGS.lines;
let score = 0;
let isCrossCheck = true;
let isNormalGame = false;
let isInfinityGame = false;
function countScore(set) {
  const amountLine = set.size;
  let lineWeight = 0;
  if (isCrossCheck) {
    lineWeight = 496;
  }
  if (isNormalGame) {
    lineWeight = 64;
  }
  if (isInfinityGame) {
    lineWeight = 1;
  }
  if (amountLine) {
    for (let i = 0; i < amountLine; i++) {
      linesFilled += 1;
      score = linesFilled * lineWeight;
    }
  }
  return score;
}
const scoreHtmlElem$1 = document.querySelector(".score>span");
function resetScore() {
  score = 0;
  GAME_SETTINGS.lines = 0;
  linesFilled = 0;
  scoreHtmlElem$1.innerHTML = score;
}
function checkFlags() {
  if (isCrossCheck) {
    isNormalGame = false;
    isInfinityGame = false;
  } else {
    isNormalGame = true;
  }
  if (isNormalGame) {
    isInfinityGame = false;
    isCrossCheck = false;
  }
  if (isInfinityGame) {
    isNormalGame = false;
    isCrossCheck = false;
  }
}
const crossCheckInput$1 = document.querySelector(".cross-check-input");
function chooseCroccCheck() {
  if (crossCheckInput$1.hasAttribute("checked")) {
    crossCheckInput$1.removeAttribute("checked");
    isCrossCheck = false;
    checkFlags();
  } else {
    crossCheckInput$1.setAttribute("checked", "checked");
    isCrossCheck = true;
    checkFlags();
  }
  console.log(isCrossCheck, isNormalGame, isInfinityGame);
}
const playfield$2 = GAME_SETTINGS.playfield;
let isPlaying = false;
let timer = null;
function play() {
  isPlaying = true;
  showPlayField();
  timer = setInterval(() => {
    moveTetrominoDown();
    showPlayField();
  }, 1e3);
}
function pause() {
  isPlaying = false;
  clearInterval(timer);
  timer = null;
  showPlayField();
}
function blockKeyboard(event2) {
  event2.preventDefault();
}
function cleanPlayfield() {
  for (let y = 0; y < GAME_SETTINGS.rows; y++) {
    playfield$2[y] = new Array(GAME_SETTINGS.columns).fill(0);
  }
}
const keyLocalStrg = "assavr-tetris";
let totalScore = JSON.parse(localStorage.getItem(keyLocalStrg)) ?? [];
function addNewScore() {
  totalScore.push(score);
  sortArray(totalScore);
  console.log(totalScore);
  totalScore = Array.from(new Set(totalScore.slice(0, 10)));
  localStorage.setItem(keyLocalStrg, JSON.stringify(totalScore));
  console.log(totalScore);
}
const totalScoreList = Array.from(document.querySelectorAll(".total-item"));
function createTotalList() {
  for (let i = 0; i < totalScoreList.length; i++) {
    const columnIdx = i % 10;
    totalScoreList[i].innerHTML = totalScore[columnIdx] ?? "Empty";
  }
}
const btnImg = document.querySelector(".button-sound__img");
let soundPlay = false;
function toggleAudio(audio2) {
  if (audio2.paused) {
    soundPlay = true;
    audio2.play();
    btnImg.setAttribute("src", "svg/sound.svg");
    audio2.volume = 1;
  } else {
    soundPlay = false;
    audio2.pause();
    btnImg.setAttribute("src", "src/img/svg/mute.svg");
  }
}
function audioGame(audio2) {
  if (soundPlay) {
    audio2.play();
    audio2.volume = 0.3;
  } else {
    audio2.pause();
  }
}
function audioLose(audio2) {
  if (soundPlay) {
    audio2.setAttribute("src", "audio/lose.mp3");
    audio2.volume = 1;
    audio2.play();
  } else {
    audio2.pause();
  }
}
function audioWin(audio2) {
  if (soundPlay) {
    audio2.setAttribute("src", "audio/win.mp3");
    audio2.volume = 1;
    audio2.play();
  } else {
    audio2.pause();
  }
}
const audioWinElem = document.querySelector(".game-sound");
const winScore = 1984;
const modalWin = document.querySelector(".modal-win");
function win(currentScore) {
  if (currentScore >= winScore) {
    audioWin(audioWinElem);
    addNewScore();
    createTotalList();
    toggleAnimationModal(modalWin);
    pause();
  }
}
const playfield$1 = GAME_SETTINGS.playfield;
function checkFullPlayfield() {
  let counter = 0;
  for (let y = 0; y < GAME_SETTINGS.rows; y++) {
    const isNotEmpty = playfield$1[y].findIndex((elem) => elem !== 0);
    if (isNotEmpty > -1) {
      counter += 1;
    }
  }
  return counter;
}
const modalLose = document.querySelector(".modal-lose");
const loseScore = document.querySelector(".lose-score");
const linesForLose = 15;
const audioLoseElem = document.querySelector(".game-sound");
function lose(notEmptyLine) {
  if (notEmptyLine >= linesForLose - 1) {
    audioLose(audioLoseElem);
    loseScore.innerHTML = `Score: ${score}`;
    toggleAnimationModal(modalLose);
    addNewScore();
    createTotalList();
    pause();
  }
}
const playfield = GAME_SETTINGS.playfield;
let isRotating = false;
let isLock = false;
function moveTetrominoDown() {
  tetromino.rowStart += 1;
  if (isBorder()) {
    tetromino.rowStart -= 1;
    isRotating = true;
    lockTetromino();
  }
}
function moveTetrominoRight() {
  tetromino.columnStart += 1;
  if (isBorder()) {
    tetromino.columnStart -= 1;
  }
}
function moveTetrominoLeft() {
  tetromino.columnStart -= 1;
  if (isBorder()) {
    tetromino.columnStart += 1;
  }
}
function isBorder() {
  const { columnStart, rowStart, matrixSize, matrixBox } = tetromino;
  for (let y = 0; y < matrixSize; y++) {
    for (let x = 0; x < matrixSize; x++) {
      if (!matrixBox[y][x]) {
        continue;
      }
      if (playfield[y][columnStart + x] === void 0 || playfield[rowStart + y] === void 0 || playfield[rowStart + y][columnStart + x]) {
        return true;
      }
    }
  }
}
function rotateTetromino() {
  if (isRotating) return;
  isRotating = true;
  const rotateMatrix = reverseMatrix(transposeMatrix(tetromino.matrixBox));
  tetromino.matrixBox = rotateMatrix;
  if (tetromino.rowStart + tetromino.matrixSize >= GAME_SETTINGS.rows - 1) {
    event.preventDefault();
    isRotating = true;
    return false;
  }
  for (let y = 0; y < tetromino.matrixSize; y++) {
    for (let x = 0; x < tetromino.matrixSize; x++) {
      if (!tetromino.matrixBox[y][x]) {
        continue;
      }
      kickWall(y, x);
    }
  }
  setTimeout(() => {
    isRotating = false;
  }, 100);
}
function kickWall(row, column) {
  if (tetromino.columnStart <= 0) {
    tetromino.columnStart = 0;
  }
  if (tetromino.columnStart + column >= 9) {
    tetromino.columnStart = 9 - column;
  }
}
const scoreHtmlElem = document.querySelector(".score>span");
const audioBrick = document.querySelector(".game-sound");
function lockTetromino() {
  const { columnStart, rowStart, matrixSize, matrixBox, tetrominoType } = tetromino;
  for (let y = 0; y < matrixSize; y++) {
    for (let x = 0; x < matrixSize; x++) {
      if (!matrixBox[y][x]) continue;
      playfield[rowStart + y][columnStart + x] = tetrominoType;
    }
  }
  isRotating = false;
  isLock = true;
  scoreHtmlElem.innerHTML = countScore(checkFullLine());
  audioBrick.setAttribute("src", "audio/brick.mp3");
  audioGame(audioBrick);
  returnTop();
  updatePlayefield();
  lose(checkFullPlayfield());
  win(countScore(checkFullLine()));
}
const nextTetrominoQeue = [createNextTetromino(), createNextTetromino()];
function returnTop() {
  structuredClone(createTetromino());
  if (isLock) {
    const nextTImg = nextTetrominoQeue[1];
    const nextT = nextTetrominoQeue.shift();
    const {
      rowStart: nextRowStart,
      columnStart: nextColumnStart,
      tetrominoType: nextTetrominoType,
      matrixBox: nextMatrixBox,
      matrixSize: nextMatrixSize
    } = nextT;
    setNextImg(nextTImg.tetrominoType);
    nextTetrominoQeue.push(createNextTetromino());
    tetromino.rowStart = nextRowStart;
    tetromino.columnStart = nextColumnStart;
    tetromino.tetrominoType = nextTetrominoType;
    tetromino.matrixBox = nextMatrixBox;
    tetromino.matrixSize = nextMatrixSize;
    isLock = false;
  }
}
function createNextTetromino() {
  const nextTetromino = structuredClone(createTetromino());
  return nextTetromino;
}
const nextTetrominoImg = document.querySelector(".next__img");
function setNextImg(type) {
  nextTetrominoImg.removeAttribute("class");
  nextTetrominoImg.classList.add("next__img", `${type}-img`);
}
setNextImg(nextTetrominoQeue[0].tetrominoType);
createTotalList();
const startModal = document.querySelector(".modal-start");
const playBtn = document.querySelectorAll(".play");
const pauseModal = document.querySelector(".modal-pause");
const winModal = document.querySelector(".modal-win");
const loseModal = document.querySelector(".modal-lose");
const totalScorePause = document.querySelector(".total-score-pause");
const totalScoreOther = document.querySelector(".total-score-other");
const allModals = [
  startModal,
  pauseModal,
  winModal,
  loseModal,
  totalScoreOther,
  totalScorePause
];
startModal.showModal();
document.addEventListener("keydown", (event2) => {
  if (!isPlaying) {
    blockKeyboard(event2);
  } else {
    if (event2.key === "ArrowDown") moveTetrominoDown();
    if (event2.key === "ArrowRight") moveTetrominoRight();
    if (event2.key === "ArrowLeft") moveTetrominoLeft();
    if (event2.key === "ArrowUp") {
      rotateTetromino();
    }
    showPlayField();
  }
  if (event2.code === "Space") {
    if (!isPlaying) {
      play();
      toggleAnimationModal(pauseModal);
    } else {
      pause();
      toggleAnimationModal(pauseModal);
    }
  }
});
playBtn[0].addEventListener("click", () => {
  closeModal(allModals);
  document.removeEventListener("keydown", blockKeyboard);
  startOver();
});
playBtn[1].addEventListener("click", () => {
  closeModal(allModals);
  play();
});
playBtn[2].addEventListener("click", () => {
  closeModal(allModals);
  document.removeEventListener("keydown", blockKeyboard);
  startOver();
});
const startOverBtn = document.querySelectorAll(".start-over");
const playAgainBtn = document.querySelector(".play-again");
const restartGame = [playAgainBtn, ...startOverBtn];
const mesh = document.querySelectorAll(".cell");
restartGame.forEach(
  (btn) => btn.addEventListener("click", () => {
    startOver();
  })
);
function startOver() {
  GAME_SETTINGS.lines = 0;
  clearTetromino();
  showPlayField();
  cleanPlayfield();
  resetScore();
  closeModal(allModals);
  mesh.forEach((cell) => cell.removeAttribute("class"));
  play();
}
const totalScoreBtns = [...document.querySelectorAll("button.total-score")];
const totalScoreBtnOther = [
  totalScoreBtns[0],
  totalScoreBtns[2],
  totalScoreBtns[3]
];
const totalScoreBtnPause = totalScoreBtns[1];
totalScoreBtnOther.forEach(
  (btn) => btn.addEventListener("click", () => {
    closeModal(allModals);
    toggleAnimationModal(totalScoreOther);
  })
);
totalScoreBtnPause.addEventListener("click", () => {
  closeModal(allModals);
  toggleAnimationModal(totalScorePause);
});
const mainMenuBtn = document.querySelectorAll(".main-menu");
mainMenuBtn.forEach(
  (btn) => btn.addEventListener("click", () => {
    closeModal(allModals);
    toggleAnimationModal(startModal);
  })
);
function closeModal(modals) {
  modals.forEach((modal) => {
    if (modal.hasAttribute("open")) {
      toggleAnimationModal(modal);
    }
  });
}
const audio = document.querySelector(".audio-bg");
const btnAudio = document.querySelector(".button-sound");
btnAudio.addEventListener("click", () => toggleAudio(audio));
const crossCheckInput = document.querySelector(".cross-check-input");
crossCheckInput.addEventListener("click", () => chooseCroccCheck());
function toggleAnimationModal(modalWindow) {
  if (!modalWindow.hasAttribute("open")) {
    modalWindow.animate(
      { transform: ["translateY(-500px)", "translateY(0px)"] },
      200
    );
    modalWindow.showModal();
  } else {
    const animation = modalWindow.animate(
      { transform: ["translateY(0)", "translateY(-999px)"] },
      200
    );
    animation.onfinish = (event2) => {
      modalWindow.close();
    };
  }
}
