const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector("vid-container video");
  //Sounds
  const sounds = document.querySelectorAll(".sound-picker button");
  //time display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");
  //get length of outline
  const outlineLength = outline.getTotalLength();
  console.log(outlineLength); //1359.759765625
  //duration
  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //pick diffrent sounds
  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });

  //play sounds
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  //select sound
  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });

  //create function for start stop
  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "svg/play.svg";
    }
  };
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapses = fakeDuration - currentTime;
    let seconds = Math.floor(elapses % 60);
    let minutes = Math.floor(elapses / 60);

    //aniumate circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    //animate text
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play, (src = "svg/play.svg");
      video.pause;
    }
  };
};

app();
