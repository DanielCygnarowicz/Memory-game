const timer = document.querySelector(".time");
const moves = document.querySelector(".moves");
const btn_start = document.querySelector(".start");
const btn_reset = document.querySelector(".reset");
let cards = document.querySelectorAll(".card");
cards = [...cards];
let isOn = false;
let interval = null;
let milisec = 0,
  sec = 0,
  min = 0;
movesCounter = 0;
openCardCounter = 0;
openCard = null;

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
const init = () => {
  cards = document.querySelectorAll(".card");
  cards = [...cards];
  cards.forEach((card) => {
    card.classList.remove("visible");
    let order = Math.floor(Math.random() * 100);
    card.style.order = order;
  });
  resetClock();
  isOn = false;
  btn_start.innerHTML = "Start";
  movesCounter = 0;
  moves.innerHTML = "0";
  openCardCounter = 0;
  openCard = null;
};

const handleStart = () => {
  isOn = !isOn;
  cards.forEach((card) => {
    card.addEventListener("click", function () {
      handleMove(card);
    });
  });
  btn_start.innerHTML = isOn ? "Stop" : "Start";
  if (isOn) {
    clock();
  } else {
    clearInterval(interval);
  }
};
const handleWin = () => {
  clearInterval(interval);
  setTimeout(() => {
    alert(`Your time: ${timer.innerHTML}. You won in ${movesCounter} moves!`);
    resetClock();
  }, 1000);
};
const handleMove = function (card) {
  card.classList.add("visible");
  openCardCounter++;
  if (openCard !== card) {
    if (openCardCounter % 2 == 0) {
      movesCounter++;
      moves.innerHTML = movesCounter;
      if (openCard.classList.value !== card.classList.value) {
        openCardCounter -= 2;
        setTimeout(() => {
          cards.forEach((card) => {
            card.classList.remove("visible");
          });
        }, 600);
      } else if (openCardCounter === 24) handleWin();
      else {
        cards = cards.filter((one) => one !== openCard);
        cards = cards.filter((one) => one !== card);
      }
      openCard = null;
    } else {
      openCard = card;
    }
  } else openCardCounter--;
};

btn_start.addEventListener("click", handleStart);
btn_reset.addEventListener("click", init);
init();
