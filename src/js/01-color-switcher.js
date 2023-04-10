const startColor = document.querySelector('[data-start]');
const stopColor = document.querySelector('[data-stop]');
const bodyColor = document.querySelector('body')

let timer = null;

startColor.addEventListener('click', onClickChangeColor);
stopColor.addEventListener('click', onClickStopColor);

function onClickChangeColor() {
    timer = setInterval(getBgColor, 1000);

    startColor.disabled = true;
    if (startColor.disabled) {
        stopColor.disabled = false
    }
}

function onClickStopColor() {
    clearInterval(timer);
    stopColor.disabled = true
    if (startColor.disabled) {
        startColor.disabled = false
    }
}

function getBgColor() {
    bodyColor.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}