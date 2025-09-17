const timerDisplay = document.querySelector('.timerDisplay');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 0;

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  return `${hh.toString().padStart(2, '0')} : ${mm.toString().padStart(2, '0')} : ${ss.toString().padStart(2, '0')}`;
}

function print(txt) {
  timerDisplay.textContent = txt;
}

function start() {
  if (isRunning) return;
  isRunning = true;
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
  }, 1000);
}

function stop() {
  if (!isRunning) return;
  isRunning = false;
  clearInterval(timerInterval);
}

function reset() {
  isRunning = false;
  clearInterval(timerInterval);
  elapsedTime = 0;
  lapCount = 0;
  lapsList.innerHTML = "";
  print("00 : 00 : 00");
}
function recordLap() {
  if (!isRunning) return;
  lapCount++;
  const li = document.createElement("li");
  li.textContent = `Lap ${lapCount}: ${timeToString(elapsedTime)}`;
  lapsList.prepend(li); 
}

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
