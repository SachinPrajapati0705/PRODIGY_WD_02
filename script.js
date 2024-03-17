let timer;
let startTime;
let elapsedTime = 0;
let running = false;
let clockInterval;
let clockOffset = 0;

const display = document.querySelector('.display');
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const resetBtn = document.querySelector('.reset');
const lapBtn = document.querySelector('.lap');
const lapsList = document.querySelector('.laps');
const progressCircle = document.getElementById('progress');
const secondHand = document.getElementById('secondHand');
const minuteHand = document.getElementById('minuteHand');
const hourHand = document.getElementById('hourHand');

function formatTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateTime() {
    const currentTime = Math.floor((Date.now() - startTime) / 1000) + elapsedTime;
    display.textContent = formatTime(currentTime);
    updateClockHands(currentTime);
}

function updateClockHands(currentTime) {
    const second = currentTime % 60;
    const minute = Math.floor(currentTime / 60) % 60;
    const hour = Math.floor(currentTime / 3600) % 12;

    const secondAngle = second * 6; // 360 degrees / 60 seconds
    const minuteAngle = (minute + second / 60) * 6; // 360 degrees / 60 minutes
    const hourAngle = (hour + minute / 60) * 30; // 360 degrees / 12 hours

    secondHand.setAttribute('transform', `rotate(${secondAngle} 50 50)`);
    minuteHand.setAttribute('transform', `rotate(${minuteAngle} 50 50)`);
    hourHand.setAttribute('transform', `rotate(${hourAngle} 50 50)`);
}

function startTimer() {
    if (!running) {
        running = true;
        startTime = Date.now() - elapsedTime * 1000;
        timer = setInterval(updateTime, 1000);
        clockInterval = setInterval(updateClock, 1000);
        resetBtn.disabled = true; // Disable reset button when stopwatch starts running
    }
}

function pauseTimer() {
    if (running) {
        running = false;
        clearInterval(timer);
        clearInterval(clockInterval);
        elapsedTime += Math.floor((Date.now() - startTime) / 1000);
        resetBtn.disabled = false; // Enable reset button when stopwatch is paused
    }
}

function resetTimer() {
    if (!running) {
        clearInterval(timer);
        clearInterval(clockInterval);
        elapsedTime = 0;
        display.textContent = '00:00:00';
        lapsList.innerHTML = '';
        updateClockHands(0);
    }
}

function lapTime() {
    if (running) {
        const lapTime = formatTime(Math.floor((Date.now() - startTime) / 1000) + elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapItem.classList.add('lapTime');
        lapsList.appendChild(lapItem);
    }
}


startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTime);