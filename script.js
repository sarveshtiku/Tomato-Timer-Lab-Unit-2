// Grabbing DOM elements
const timeDisplay = document.getElementById("time-left");
const studyBtn = document.getElementById("study-btn");
const breakBtn = document.getElementById("break-btn");
const studyCount = document.getElementById("study-count");
const breakCount = document.getElementById("break-count");

let timerInterval = null; // Stores the interval ID

// Pads single digits with a leading zero
function pad(value) {
  return String(value).padStart(2, '0'); // helper function that makes the time look right liek its going tob be 12:04 rather than 12:4
}

// Updates the visible timer display
function updateTimerDisplay(minutes, seconds) {
  timeDisplay.textContent = `${pad(minutes)}:${pad(seconds)}`; // takes current minutes and secodsn and updates it in the time left span, also uses pad so 2 digit toime exists
}

// Starts a countdown from given duration (in seconds)
// running this every 1000 milliseconds

function startTimer(duration) {
  clearInterval(timerInterval); // Clear any existing timer

  let timeRemaining = duration;

  timerInterval = setInterval(() => {
    const minutes = Math.floor(timeRemaining / 60); // using floor fucntion so that rounds properly!
    const seconds = timeRemaining % 60; // cuz we need the exact value here 
    updateTimerDisplay(minutes, seconds); // updates time every second

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
    } else {
      timeRemaining--; // decreases the time per second as well
    }
  }, 1000);
}

// Handles starting a study session
function startStudySession() {
  let currentCount = parseInt(studyCount.textContent, 10);
  studyCount.textContent = currentCount + 1;
  startTimer(25 * 60); // 25 minutes in seconds
}

// Handles starting a break session
function startBreakSession() {
  let currentCount = parseInt(breakCount.textContent, 10);
  breakCount.textContent = currentCount + 1;
  startTimer(5 * 60); // 5 minutes in seconds
}

// Attach event listeners
studyBtn.addEventListener('click', startStudySession);
breakBtn.addEventListener('click', startBreakSession);

// Initial display
updateTimerDisplay(25, 0);
