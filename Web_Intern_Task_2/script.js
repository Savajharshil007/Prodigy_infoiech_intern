let hours = 0, minutes = 0, seconds = 0, milliseconds = 0;
let timer;
let running = false;
let lapCount = 0;

const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");
const lapBtn = document.getElementById("lap-btn");
const laps = document.getElementById("laps");

function updateDisplay() {
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
    document.getElementById("milliseconds").innerText = String(milliseconds).padStart(2, '0');
}
 
function startTimer() {
    if (!running) {
        running = true;
        timer = setInterval(() => {
            milliseconds++;
            if (milliseconds === 100) {
                milliseconds = 0;
                seconds++;
            }
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
            updateDisplay();
        }, 10);

        startBtn.disabled = true;
        stopBtn.disabled = false;
        lapBtn.disabled = false;
    }
}

function stopTimer() {
    running = false;
    clearInterval(timer);
    startBtn.disabled = false;
    stopBtn.disabled = true;
    lapBtn.disabled = true;
}

function resetTimer() {
    running = false;
    clearInterval(timer);
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    lapCount = 0;
    updateDisplay();
    startBtn.disabled = false;
    stopBtn.disabled = true;
    lapBtn.disabled = true;
    laps.innerHTML = ""; // Clear the lap list
}

function recordLap() {
    lapCount++;
    const lapTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
    const lapElement = document.createElement("li");
    lapElement.innerText = `Lap ${lapCount}: ${lapTime}`;
    laps.appendChild(lapElement);
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);
