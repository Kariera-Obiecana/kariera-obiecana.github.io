// Tylko na stronie 'timer.html'

const timerContainer = document.querySelector('.timer-container');
const timerText = document.querySelector('.timer');



// --------------- //
// RESIZE + MOVING //

let isResizing = false;
let isDragging = false;
let initialX;
let initialY;
let initialWidth;
let initialHeight;

timerText.addEventListener('mousedown', e => {
    if (e.button === 2) { // prawy przycisk myszy
        isResizing = true;
        initialWidth = parseFloat(getComputedStyle(timerText).width);
        initialHeight = parseFloat(getComputedStyle(timerText).height);
        initialX = e.clientX;
        initialY = e.clientY;

        return false;
    }
});

timerContainer.addEventListener('mousedown', e => {
    if (e.button == 0) {
        isDragging = true;
        initialX = e.clientX - timerContainer.getBoundingClientRect().left;
        initialY = e.clientY - timerContainer.getBoundingClientRect().top;
    }
});

document.addEventListener('mousemove', (event) => {
    if (isResizing) {
        let height = initialHeight + (event.clientY - initialY);
        height = Math.min(500, Math.max(50, height));

        // timerContainer.fontSize = `${height / 1.5}px`;
        timerText.style.height = `${height}px`;
        timerText.style.fontSize = `${height / 1.5}px`;
        timerContainer.style.borderRadius = `${height / 1.5}px`;
    } else if (isDragging) {
        const left = event.clientX - initialX;
        const top = event.clientY - initialY;

        timerContainer.style.left = `${left}px`;
        timerContainer.style.top = `${top}px`;
    }
});

document.addEventListener('mouseup', () => {
    isResizing = false;
    isDragging = false;
    console.log("stopped resizing");
});

// Disable context menu when resizing
document.addEventListener('contextmenu', e => {
    e.preventDefault();
})


// -------------- //
// TIMER SETTINGS //

const settings = document.querySelector("#settings");
const settingsContainer = document.querySelector(".timer-settings");

const centerButton = document.querySelector('.wycentruj');
const hideButton = document.querySelector('.ukryj');

const stopbutton = document.querySelector('button.stop');
const startbutton = document.querySelector('button.start');

settings.addEventListener('click', () => {
    settingsContainer.classList.toggle('hidden');
})

centerButton.addEventListener('click', () => {
    timerContainer.style.left = '';
    timerContainer.style.top = '';
});

hideButton.addEventListener('click', () => {
    startbutton.classList.toggle('hidden');
    stopbutton.classList.toggle('hidden');
})




stopbutton.addEventListener('click', () => {
    started = false;
    timerText.style.color = 'rgba(255,255,255,0.5)';
});
startbutton.addEventListener('click', () => {
    started = true;
    timerText.style.color = ''; 
});


// ------------------- //
// TIMER FUNCTIONALITY //

const timerInput = document.querySelector('.timer-input');
const ustaw = document.querySelector('.ustaw');

const czasResult = document.querySelector('.czas-result');

let time = 10;
let started = false;

function formatTime(time) {
    if (time <= 0) {
        timerText.style.color = 'red';
        return `00:00`;
    } else if (time < 10) {
        timerText.style.color = 
            time % 2 == 0 ? 'red' 
            : '';
    } else {
        timerText.style.color = '';
    };

    let minutes = Math.floor(time / 60);
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    let seconds = time % 60;
    seconds = seconds < 10 ? `0${seconds}` : seconds;


    return `${minutes}:${seconds}`;
}

function getTime() {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let seconds = date.getSeconds();

    let targetTime = timerInput.value;
    let targetHour = parseInt(targetTime.split(":")[0]);
    let targetMinute = parseInt(targetTime.split(":")[1]);

    let timeDifference = (targetHour - hour) * 60 + (targetMinute - minute);
    if (timeDifference < 0) {
        timeDifference += 24 * 60; // Add 24 hours if the target time is in the past
    }

    if (isNaN(timeDifference)) return false;

    return timeDifference * 60 - seconds;
}

timerInput.addEventListener('input', () => {
    started = false;

    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();

    let timeRemaining = getTime();
    czasResult.innerHTML = `Bieżący czas: ${hour}:${minute}<br> Celowy czas: ${timerInput.value} (czas: ${formatTime(timeRemaining)})`;

    timerText.innerHTML = `${formatTime(timeRemaining)}`;
    timerText.style.color = `rgba(255,255,255,0.5)`;
});

ustaw.addEventListener('click', () => {
    time = getTime()
    started = true;
    timerText.style.color = '';

    updateTime();
});

function updateTime() {
    timerText.innerText = formatTime(time);
}

// Start the timer!
setInterval(() => {
    if (!started) return;

    updateTime();
    time--;
}, 1000)

