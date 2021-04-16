import mp3File from "./assets/error.mp3";
let browsers = Array.from(document.querySelectorAll(".browser"));
const ieBrowser = document.querySelector(".browser.ie");
const startButton = document.querySelector("button.start");
const resetButton = document.querySelector("button.reset");
const errorSound = new Audio(mp3File);

const MAX_PIXEL_INCREMENT_X = 10;
const GOAL_PIXEL_X = 850;
const ITERATION_TIME = 50;

const initGame = () => {
  browsers = Array.from(document.querySelectorAll(".browser"));
  browsers.forEach(browser => {
    const positionX = -35;
    browser.style.setProperty("--x", `${positionX}px`);
    browser.style.setProperty("--y", 0);
    browser.classList.remove("draw");
    browser.classList.remove("winner");
    browser.classList.remove("loser");
  });
};

const isAnyWinner = () => {
  return browsers.some(browser => {
    const positionX = Number.parseInt(browser.style.getPropertyValue("--x"));
    return positionX > GOAL_PIXEL_X;
  });
};

const finishGame = () => {
  const winner = browsers.filter(browser => {
    const positionX = Number.parseInt(browser.style.getPropertyValue("--x"));
    return positionX > GOAL_PIXEL_X;
  });

  if (winner.length === 1) {
    const browserWinner = winner[0];
    browserWinner.classList.add("winner");
  }

  // Empate
  if (winner.length > 1) {
    winner.forEach(browser => browser.classList.add("draw"));
  }

  browsers.forEach(browser => {
    const isWinner = browser.classList.contains("winner");
    const isDraw = browser.classList.contains("draw");
    const isLoser = !isWinner && !isDraw;

    if (isLoser) {
      browser.classList.add("loser");
    }
  });
};

const iterationGame = () => {
  browsers.forEach(browser => {
    const positionX = Number.parseInt(browser.style.getPropertyValue("--x"));
    const positionY = Number.parseInt(browser.style.getPropertyValue("--y"));
    const incrementX = Math.floor(Math.random() * MAX_PIXEL_INCREMENT_X);
    const incrementY = -2 + Math.floor(Math.random() * 5);
    browser.style.setProperty("--x", `${positionX + incrementX}px`);
    browser.style.setProperty("--y", `${positionY + incrementY}px`);
  });

  const buggedIE = Math.floor(Math.random() * 100) === 0;
  if (buggedIE && browsers.includes(ieBrowser)) {
    errorSound.play();
    browsers = browsers.filter(browser => !browser.classList.contains("ie"));
  }

  if (!isAnyWinner()) {
    setTimeout(iterationGame, ITERATION_TIME);
  } else {
    finishGame();
  }
};

const startGame = () => {
  console.log("Empieza el juego.");

  iterationGame();
};

startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", initGame);

initGame();
