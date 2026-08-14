const fruits = [
  ["Apple","🍎"],
  ["Banana","🍌"],
  ["Mango","🥭"],
  ["Orange","🍊"],
  ["Strawberry","🍓"],
  ["Watermelon","🍉"],
  ["Pineapple","🍍"],
  ["Grapes","🍇"],
  ["Papaya","🧡"],
  ["Guava","🍐"],
  ["Pomegranate","❤️"],
  ["Kiwi","🥝"],
  ["Dragon Fruit","🐉"],
  ["Peach","🍑"],
  ["Pear","🍐"],
  ["Cherry","🍒"],
  ["Blueberry","🫐"],
  ["Raspberry","🔴"],
  ["Blackberry","⚫"],
  ["Coconut","🥥"],
  ["Lemon","🍋"],
  ["Lime","🟢"],
  ["Muskmelon","🍈"],
  ["Jackfruit","🟡"],
  ["Custard Apple","💚"],
  ["Sapota / Chikoo","🟤"],
  ["Fig","🟣"],
  ["Lychee","🔴"],
  ["Passion Fruit","🟣"],
  ["Avocado","🥑"],
  ["Star Fruit","⭐"],
  ["Persimmon","🟠"],
  ["Amla","🟢"],
  ["Tamarind","🟤"],
  ["Dates","🟤"],
  ["Rambutan","🔴"],
  ["Mangosteen","🟣"],
  ["Durian","🟢"],
  ["Pomelo","🟡"],
  ["Grapefruit","🍊"],
  ["Mandarin","🍊"],
  ["Nectarine","🍑"],
  ["Clementine","🍊"],
  ["Breadfruit","🟢"],
  ["Soursop","🟢"],
  ["Jujube","🔴"],
  ["Quince","🟡"],
  ["Cantaloupe","🍈"]
].map((item, index) => ({
  id: index,
  name: item[0],
  emoji: item[1]
}));

let score = 0;
let lives = 3;
let level = 1;
let target = null;
let timer = null;
let timeLeft = 100;

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function updateHUD() {
  const scoreElement = document.getElementById("score");
  const livesElement = document.getElementById("lives");
  const levelElement = document.getElementById("level");

  if (scoreElement) scoreElement.textContent = score;
  if (livesElement) livesElement.textContent = lives;
  if (levelElement) levelElement.textContent = level;
}

function speak(text) {
  if (!window.speechSynthesis) return;

  window.speechSynthesis.cancel();

  const voice = new SpeechSynthesisUtterance(text);
  voice.lang = "en-US";
  voice.rate = 0.82;
  voice.pitch = 1;
  voice.volume = 1;

  window.speechSynthesis.speak(voice);
}

function drawTimer() {
  const timerBar = document.getElementById("timerBar");

  if (timerBar) {
    timerBar.style.width = Math.max(0, timeLeft) + "%";
  }
}

function startTimer() {
  clearInterval(timer);

  timeLeft = 100;
  drawTimer();

  timer = setInterval(() => {
    timeLeft -= 1;
    drawTimer();

    if (timeLeft <= 0) {
      clearInterval(timer);
      loseLife("⏰ Time's up!");
    }
  }, 100);
}

function createRound() {
  clearInterval(timer);

  /*
    IMPORTANT:
    The correct fruit is ALWAYS included
    among the four answer options.
  */

  target = fruits[Math.floor(Math.random() * fruits.length)];

  const wrongOptions = shuffle(
    fruits.filter(fruit => fruit.id !== target.id)
  ).slice(0, 3);

  const options = shuffle([
    target,
    ...wrongOptions
  ]);

  const targetEmoji = document.getElementById("targetEmoji");
  const targetName = document.getElementById("targetName");
  const optionsContainer = document.getElementById("options");
  const message = document.getElementById("message");

  if (!targetEmoji || !targetName || !optionsContainer) {
    return;
  }

  targetEmoji.textContent = target.emoji;
  targetName.textContent = target.name;

  optionsContainer.innerHTML = "";

  if (message) {
    message.textContent = "";
  }

  options.forEach(fruit => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "fruit-option";
    button.textContent = fruit.emoji;

    button.setAttribute(
      "aria-label",
      fruit.name
    );

    button.addEventListener("click", () => {
      checkAnswer(fruit, button);
    });

    optionsContainer.appendChild(button);
  });

  startTimer();
}

function checkAnswer(fruit, button) {
  clearInterval(timer);

  if (fruit.id === target.id) {

    button.classList.add("correct");

    score += 10;

    level = Math.min(
      50,
      Math.floor(score / 100) + 1
    );

    updateHUD();

    const message = document.getElementById("message");

    if (message) {
      message.textContent = "🎉 " + target.name + "!";
    }

    speak(target.name);

    setTimeout(() => {
      createRound();
    }, 700);

  } else {

    button.classList.add("wrong");

    loseLife("❌ Wrong fruit! Try again.");
  }
}

function loseLife(messageText) {

  lives--;

  updateHUD();

  const message = document.getElementById("message");

  if (message) {
    message.textContent = messageText;
  }

  if (lives <= 0) {

    clearInterval(timer);

    const oldBest = Number(
      localStorage.getItem("tapSameBest") || 0
    );

    if (score > oldBest) {
      localStorage.setItem(
        "tapSameBest",
        score
      );
    }

    if (message) {
      message.textContent =
        "💥 Game Over! Score: " + score;
    }

    speak("Game Over");

    return;
  }

  setTimeout(() => {
    createRound();
  }, 600);
}

function startGame() {

  clearInterval(timer);

  score = 0;
  lives = 3;
  level = 1;

  updateHUD();

  createRound();
}

document.addEventListener("DOMContentLoaded", () => {

  /*
    The game starts automatically when
    game.html is opened.
  */

  if (document.getElementById("options")) {

    startGame();

    const hearButton =
      document.getElementById("hearBtn");

    if (hearButton) {
      hearButton.addEventListener(
        "click",
        () => {
          if (target) {
            speak(target.name);
          }
        }
      );
    }

    const restartButton =
      document.getElementById("restartBtn");

    if (restartButton) {
      restartButton.addEventListener(
        "click",
        startGame
      );
    }
  }
});
