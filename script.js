const timeDisplay = document.getElementById("time-left");
const studyBtn = document.getElementById("study-btn");
const breakBtn = document.getElementById("break-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const studyCount = document.getElementById("study-count");
const breakCount = document.getElementById("break-count");

let timerInterval = null;
let timeRemaining = 25 * 60;
let currentMode = "paused"; 
let isPaused = false;

function pad(value) {
  return String(value).padStart(2, '0');
}

function updateTimerDisplay(minutes, seconds) {
  timeDisplay.textContent = `${pad(minutes)}:${pad(seconds)}`;
}

function setMode(mode) {
  document.body.classList.remove("study-mode", "break-mode", "paused-mode");
  if (mode === "study") {
    document.body.classList.add("study-mode");
  } else if (mode === "break") {
    document.body.classList.add("break-mode");
  } else {
    document.body.classList.add("paused-mode");
  }
  currentMode = mode;
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (!isPaused) {
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = timeRemaining % 60;
      updateTimerDisplay(minutes, seconds);
      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
      } else {
        timeRemaining--;
      }
    }
  }, 1000);
}

function startStudySession() {
  clearInterval(timerInterval);
  timeRemaining = 25 * 60;
  studyCount.textContent = parseInt(studyCount.textContent, 10) + 1;
  setMode("study");
  updateTimerDisplay(25, 0);
  isPaused = false;
  startTimer();
}

function startBreakSession() {
  clearInterval(timerInterval);
  timeRemaining = 5 * 60;
  breakCount.textContent = parseInt(breakCount.textContent, 10) + 1;
  setMode("break");
  updateTimerDisplay(5, 0);
  isPaused = false;
  startTimer();
}

function pauseTimer() {
  isPaused = !isPaused;
  setMode(isPaused ? "paused" : currentMode);
}

function resetTimer() {
  clearInterval(timerInterval);
  timeRemaining = 25 * 60;
  updateTimerDisplay(25, 0);
  setMode("paused");
  isPaused = false;
}

studyBtn.addEventListener("click", startStudySession);
breakBtn.addEventListener("click", startBreakSession);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateTimerDisplay(25, 0);
setMode("paused");
