const btnImg = document.querySelector('.button-sound__img');
let soundPlay = false;

export function toggleAudio(audio) {
  if (audio.paused) {
    soundPlay = true;
    audio.play();
    btnImg.setAttribute('src', 'src/img/svg/sound.svg');
    audio.volume = 0.5;
  } else {
    soundPlay = false;
    audio.pause();
    btnImg.setAttribute('src', 'src/img/svg/mute.svg');
  }
}

export function audioGame(audio) {
  if (soundPlay) {
    audio.setAttribute('src', 'src/audio/brick.mp3');
    audio.play();
    audio.volume = 0.2;
    // audio.pause();
  } else {
    audio.pause();
  }
}

export function audioLose(audio) {
  if (soundPlay) {
    audio.setAttribute('src', 'src/audio/lose.mp3');
    audio.volume = 0.1;
    audio.play();
  } else {
    audio.pause();
  }
}

export function audioWin(audio) {
  if (soundPlay) {
    audio.setAttribute('src', 'src/audio/win.mp3');
    audio.volume = 0.1;
    audio.play();
  } else {
    audio.pause();
  }
}
