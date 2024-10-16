const btnImg = document.querySelector('.button-sound__img');
let soundPlay = false;

export function toggleAudio(audio) {
  if (audio.paused) {
    soundPlay = true;
    audio.play();
    btnImg.setAttribute('src', 'svg/sound.svg');
    audio.volume = 1;
  } else {
    soundPlay = false;
    audio.pause();
    btnImg.setAttribute('src', 'src/img/svg/mute.svg');
  }
}

export function audioGame(audio) {
  if (soundPlay) {
    audio.play();
    audio.volume = 0.3;
    // audio.pause();
  } else {
    audio.pause();
  }
}

export function audioLose(audio) {
  if (soundPlay) {
    audio.setAttribute('src', 'audio/lose.mp3');
    audio.volume = 1;
    audio.play();
  } else {
    audio.pause();
  }
}

export function audioWin(audio) {
  if (soundPlay) {
    audio.setAttribute('src', 'audio/win.mp3');
    audio.volume = 1;
    audio.play();
  } else {
    audio.pause();
  }
}
