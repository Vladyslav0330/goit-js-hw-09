import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysData = document.querySelector('[data-days]');
const hoursData = document.querySelector('[data-hours]');
const minutesData = document.querySelector('[data-minutes]');
const secondsData = document.querySelector('[data-seconds]');

let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      startBtn.disabled = true;
      Notiflix.Notify.warning('Please, choose a date in the future!');
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(inputDate, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startBtn.addEventListener('click', startTimer);

function startTimer() {
  startBtn.disabled = true;
  intervalId = setInterval(timer, 1000);
}

function timer() {
  const timeDiference = new Date(inputDate.value) - Date.now();
  if (timeDiference < 1000) {
    clearInterval(intervalId);
    Notiflix.Notify.success('Timer ended');
  }

  daysData.textContent = addLeadingZero(
    convertMs(timeDiference).days.toString()
  );

  hoursData.textContent = addLeadingZero(
    convertMs(timeDiference).hours.toString()
  );

  minutesData.textContent = addLeadingZero(
    convertMs(timeDiference).minutes.toString()
  );
  secondsData.textContent = addLeadingZero(
    convertMs(timeDiference).seconds.toString()
  );
}
