const moves = document.querySelector(".moves");
const btn_start = document.querySelector(".start");
const btn_reset = document.querySelector(".reset");
const cardContainer = document.querySelector(".card-container");

let interval = null;
let isOn = false;

openCard = null;
movesCounter = 0;
let cards = [];
let isBusy = false;
let matchCards = [];
const canMove = (card) => {
  return !isBusy && !matchCards.includes(card) && card !== openCard;
};
const init = () => {
  cardContainer.classList.add("stop");
  cards = document.querySelectorAll(".card");
  cards = [...cards];
  cards.forEach((card) => {
    card.classList.remove("visible");
    card.classList.remove("stop");
    let order = Math.floor(Math.random() * 100);
    card.style.order = order;
  });
  resetClock();
  isOn = false;
  btn_start.innerHTML = "Start";
  movesCounter = 0;
  moves.innerHTML = "0";
  matchCards = [];
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
    cardContainer.classList.remove("stop");
  } else {
    clearInterval(interval);
    cardContainer.classList.add("stop");
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
  if (canMove(card)) {
    card.classList.add("visible");
    if (openCard) {
      movesCounter++;
      moves.innerHTML = movesCounter;
      if (openCard.classList.value === card.classList.value) {
        matchCards.push(card);
        matchCards.push(openCard);
        if (matchCards.length === cards.length) handleWin();
        openCard = null;
      } else {
        isBusy = true;
        setTimeout(() => {
          card.classList.remove("visible");
          openCard.classList.remove("visible");
          isBusy = false;
          openCard = null;
        }, 600);
      }
    } else {
      openCard = card;
    }
  }
};

btn_start.addEventListener("click", handleStart);
btn_reset.addEventListener("click", init);
init();
