const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let colorInterval;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16512141).toString(16)}`;
}
function changeColor() {
  colorInterval = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStart.setAttribute('disabled', 'disabled');
}
const stopColor = () => {
  if (btnStart.hasAttribute('disabled')) {
    clearInterval(colorInterval);
    btnStart.removeAttribute('disabled');
  }
};
btnStart.addEventListener('click', changeColor);
btnStop.addEventListener('click', stopColor);
