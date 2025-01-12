import flatpickr from "flatpickr";
import iziToast from "izitoast";
const elements = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};
const timePicker = document.querySelector("#datetime-picker");

const btnStart = document.querySelector(".btn-start");
let userSelectedDate = null;
let intervalId = null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const diff = selectedDates[0] - new Date();

        if (diff <= 0) { btnStart.disabled = true;
            iziToast.show({
     message: 'Please choose a date in the future'
});
           
        } else { btnStart.disabled = false;
            userSelectedDate = selectedDates[0];
        }
    },
};
flatpickr(timePicker, options);
btnStart.addEventListener("click", startTimer);
function startTimer(){
    if (!userSelectedDate) return;
    btnStart.disabled = true;
    timePicker.disabled = true;
    intervalId =
        setInterval(() => {
            const ms = userSelectedDate - Date.now();

            if (ms <= 0) {
                stopTimer();

                return;
            }
            const timeComponents = convertMs(ms);
            
            elements.days.textContent = padDays(timeComponents.days);
            elements.hours.textContent = pad(timeComponents.hours);
            elements.minutes.textContent = pad(timeComponents.minutes);
            elements.seconds.textContent = pad(timeComponents.seconds);
        }, 1000);
}

   function stopTimer() {
       clearInterval(intervalId);
       intervalId = null;
     timePicker.disabled = false;
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

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }
    
   function pad(value) {
    return String(value).padStart(2, '0');
  }
function padDays(value) { if (value > 99) { return String(value); } else { return String(value).padStart(2, '0'); }}