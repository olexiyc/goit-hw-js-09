import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const input = document.querySelector('input#datetime-picker');
const btn = document.querySelector('button[data-start]');
const daysId = document.querySelector('[data-days]');
const hoursId = document.querySelector('[data-hours]');
const minutesId = document.querySelector('[data-minutes]');
const secondsId = document.querySelector('[data-seconds]');

let intervalsId = null;
btn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    console.log(selectedDates[0]);

    if(selectedDates[0] <= new Date()) {
        btn.disabled = true;
        Notiflix.Notify.failure("Please choose a date in the future");
        return;
      } else {
        btn.disabled = false;
      }

    btn.addEventListener('click', () => {
         intervalsId = setInterval(() => {
            const differenceInTime = selectedDates[0] - new Date();

            if(differenceInTime < 1000) {
                clearInterval(intervalsId);
            }
            const result = convertMs(differenceInTime);
            viewOfTimer(result);
         })
      })

    },
  };

flatpickr(input, options);

function viewOfTimer({ days, hours, minutes, seconds }) {
    daysId.textContent = `${days}`;
    hoursId.textContent = `${hours}`;
    minutesId.textContent = `${minutes}`;
    secondsId.textContent = `${seconds}`;
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
  