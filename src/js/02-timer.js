import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
let chosenTime = 0;
let timeDifference = 0;

const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chosenTime = selectedDates[0].getTime();
  },
};

const fp = flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const actualDateTimer = () => {
  const actualDate = new Date().getTime();
  return actualDate;
};

const timersDifference = () => {
  return (timeDifference = chosenTime - actualDateTimer());
};

function setTimer() {
  if (chosenTime < actualDateTimer()) {
    return Notify.failure('Please choose a date in the future');
  }
  const timerInterval = setInterval(() => {
    timersDifference();
    const dateSet = convertMs(timeDifference);
    days.innerText = dateSet.days;
    hours.innerText = dateSet.hours;
    minutes.innerText = dateSet.minutes;
    seconds.innerText = dateSet.seconds;
    if (days.innerText.length < 2) {
      days.innerText = '0' + days.innerText;
    }
    if (hours.innerText.length < 2) {
      hours.innerText = '0' + hours.innerText;
    }
    if (minutes.innerText.length < 2) {
      minutes.innerText = '0' + minutes.innerText;
    }
    if (seconds.innerText.length < 2) {
      seconds.innerText = '0' + seconds.innerText;
    }
    if (timeDifference <= 1000) {
      clearInterval(timerInterval);
    }
  }, 1000);
  btn.setAttribute('disabled', 'disabled');
}

btn.addEventListener('click', setTimer);
