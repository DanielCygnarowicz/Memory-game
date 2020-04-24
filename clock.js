const timer = document.querySelector(".time");
let milisec = 0,
  sec = 0,
  min = 0;
const clock = () => {
  interval = setInterval(() => {
    if (milisec == 99) {
      milisec = 0;
      sec++;
    }
    if (sec == 60) {
      sec = 0;
      min++;
    }
    milisec++;
    let miliseconds = milisec * 1 < 10 ? `0${milisec}` : milisec;
    let seconds = sec * 1 < 10 ? `0${sec}` : sec;
    let minuts = min * 1 < 10 ? `0${min}` : min;
    timer.innerHTML = `${minuts}:${seconds}:${miliseconds}`;
  }, 10);
};
const resetClock = () => {
  clearInterval(interval);
  milisec = 0;
  sec = 0;
  min = 0;
  timer.innerHTML = "00:00:00";
};
