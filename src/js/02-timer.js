import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";




const inputId = document.querySelector('input#datatime-picker');
const minuteId = document.querySelector('[data-minutes]');
const secondsId = document.querySelector('[data-second]');
const hoursId = document.querySelector('[data-hours]');
const daysId = document.querySelector('[data-days]');
const btnId = document.querySelector('button[data-start]');

let intervalsId = null;
btnId.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      
      if (selectedDates[0] <= new Date()) {
          btnId.disabled = true;
          Notiflix.Notify.failure("Please choose a date in the future");
          return;
      } else {
          btnId.disabled = false;
      }

      btnId.addEventListener('click', () => {
          intervalsId = setInterval(() => {
              const timeDifferences = selectedDates[0] - new Date();

              if (timeDifferences < 1000) {
                  clearInterval(intervalsId);
              }
              const result = convertMs(timeDifferences);
              viewOfTimer(result);
          })
      })
       
  },
};

flatpickr(inputId, options);

function viewOfTimer({ days, hours, minutes, seconds }) {
    daysId.textContent = `${days}`;
    hoursId.textContent = `${hours}`;
    minuteId.textContent = `${minutes}`;
    secondsId.textContent = `${seconds}`;
}

function addZero(value) {
    return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}