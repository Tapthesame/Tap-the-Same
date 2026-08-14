// ============================================================
// TAP THE SAME - FINAL GAME.JS
// ============================================================

const fruits = [
  { name: "Apple", image: "apple" },
  { name: "Banana", image: "banana" },
  { name: "Mango", image: "mango" },
  { name: "Orange", image: "orange" },
  { name: "Strawberry", image: "strawberry" },
  { name: "Watermelon", image: "watermelon" },
  { name: "Pineapple", image: "pineapple" },
  { name: "Grapes", image: "grapes" },
  { name: "Kiwi", image: "kiwi" },
  { name: "Peach", image: "peach" },
  { name: "Pear", image: "pear" },
  { name: "Cherry", image: "cherry" },
  { name: "Coconut", image: "coconut" },
  { name: "Lemon", image: "lemon" },
  { name: "Avocado", image: "avocado" },
  { name: "Melon", image: "melon" },
  { name: "Pomegranate", image: "pomegranate" },
  { name: "Raspberry", image: "raspberry" },
  { name: "Blackberry", image: "blackberry" },
  { name: "Papaya", image: "papaya" },
  { name: "Fig", image: "fig" },
  { name: "Dates", image: "dates" },
  { name: "Persimmon", image: "persimmon" },
  { name: "Dragon Fruit", image: "dragonfruit" },
  { name: "Guava", image: "guava" },
  { name: "Sapota", image: "sapota" },
  { name: "Lychee", image: "lychee" },
  { name: "Jackfruit", image: "jackfruit" },
  { name: "Star Fruit", image: "starfruit" },
  { name: "Passion Fruit", image: "passionfruit" }
];

const birds = [
  { name: "Parrot", image: "parrot" },
  { name: "Peacock", image: "peacock" },
  { name: "Owl", image: "owl" },
  { name: "Eagle", image: "eagle" },
  { name: "Duck", image: "duck" },
  { name: "Swan", image: "swan" },
  { name: "Penguin", image: "penguin" },
  { name: "Flamingo", image: "flamingo" },
  { name: "Kingfisher", image: "kingfisher" },
  { name: "Crow", image: "crow" },
  { name: "Hen", image: "hen" },
  { name: "Rooster", image: "rooster" }
];

const allItems = [...fruits, ...birds];

let score = 0;
let bestScore = Number(localStorage.getItem("tapSameBest") || 0);
let lives = 3;
let level = 1;
let target = null;
let timer = null;
let timeLeft = 8;
let locked = false;

// ------------------------------------------------------------
// DOM
// ------------------------------------------------------------

const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const levelEl = document.getElementById("level");
const targetEmoji = document.getElementById("targetEmoji");
const targetName = document.getElementById("targetName");
const optionsEl = document.getElementById("options");
const messageEl = document.getElementById("message");
const timerBar = document.getElementById("timerBar");

const hearBtn = document.getElementById("hearBtn");
const restartBtn = document.getElementById("restartBtn");

// ------------------------------------------------------------
// IMAGE SPRITE
// ------------------------------------------------------------

// Generated cartoon image file.
// Upload this exact file into the same GitHub folder as game.js:
//
// cartoon-fruits-birds.png

const spriteFile = "cartoon-fruits-birds.png";

// Coordinates inside the generated sprite sheet.
// They are intentionally approximate crops around each illustration.
const spritePositions = {

  // Fruits
  apple:        "0% 0%",
  banana:       "17% 0%",
  mango:        "34% 0%",
  orange:       "51% 0%",
  strawberry:   "68% 0%",
  watermelon:   "85% 0%",

  pineapple:    "0% 25%",
  grapes:       "17% 25%",
  kiwi:         "34% 25%",
  peach:        "51% 25%",
  pear:         "68% 25%",
  cherry:       "85% 25%",

  coconut:      "0% 50%",
  lemon:        "17% 50%",
  avocado:      "34% 50%",
  melon:        "51% 50%",
  pomegranate:  "68% 50%",
  raspberry:    "85% 50%",

  blackberry:   "0% 75%",
  papaya:       "17% 75%",
  fig:          "34% 75%",
  dates:        "51% 75%",
  persimmon:    "68% 75%",
  dragonfruit:  "85% 75%",

  guava:        "0% 100%",
  sapota:       "17% 100%",
  lychee:       "34% 100%",
  jackfruit:    "51% 100%",
  starfruit:    "68% 100%",
  passionfruit: "85% 100%"
};

// ------------------------------------------------------------
// BIRD SPRITE POSITIONS
// ------------------------------------------------------------

const birdPositions = {
  parrot:     "0% 0%",
  peacock:    "50% 0%",
  owl:        "100% 0%",

  eagle:      "0% 33%",
  duck:       "50% 33%",
  swan:       "100% 33%",

  penguin:    "0% 66%",
  flamingo:   "50% 66%",
  kingfisher: "100% 66%",

  crow:       "0% 100%",
  hen:        "50% 100%",
  rooster:    "100% 100%"
};

// ------------------------------------------------------------
// CREATE ART
// ------------------------------------------------------------

function createArt(item) {

  const art = document.createElement("div");
  art.className = "game-art";

  art.style.backgroundImage = `url("${spriteFile}")`;

  if (item.image in spritePositions) {
    art.style.backgroundPosition = spritePositions[item.image];
  }

  if (item.image in birdPositions) {
    art.style.backgroundPosition = birdPositions[item.image];
  }

  art.style.backgroundSize = "600% 500%";
  art.setAttribute("aria-label", item.name);

  return art;
}

// ------------------------------------------------------------
// RANDOM ITEM
// ------------------------------------------------------------

function randomItem() {
  return allItems[Math.floor(Math.random() * allItems.length)];
}

// ------------------------------------------------------------
// UPDATE HEADER
// ------------------------------------------------------------

function updateHeader() {

  scoreEl.textContent = score;
  livesEl.textContent = lives;
  levelEl.textContent = level;

  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("tapSameBest", bestScore);
  }
}

// ------------------------------------------------------------
// TIMER
// ------------------------------------------------------------

function startTimer() {

  clearInterval(timer);

  timeLeft = Math.max(4, 9 - level);

  if (timerBar) {
    timerBar.style.width = "100%";
  }

  timer = setInterval(() => {

    timeLeft--;

    const percentage =
      Math.max(0, (timeLeft / Math.max(4, 9 - level)) * 100);

    if (timerBar) {
      timerBar.style.width = percentage + "%";
    }

    if (timeLeft <= 0) {

      clearInterval(timer);

      if (locked) return;

      locked = true;
      loseLife("⏰ Time's up!");

      setTimeout(() => {
        if (lives > 0) {
          nextRound();
        }
      }, 700);
    }

  }, 1000);
}

// ------------------------------------------------------------
// NEXT ROUND
// ------------------------------------------------------------

function nextRound() {

  if (lives <= 0) {
    gameOver();
    return;
  }

  locked = false;

  target = randomItem();

  targetName.textContent = target.name;

  // Remove old target art
  targetEmoji.innerHTML = "";

  const targetArt = createArt(target);
  targetArt.classList.add("target-art");

  targetEmoji.appendChild(targetArt);

  createOptions();

  messageEl.textContent = "";

  startTimer();
}

// ------------------------------------------------------------
// CREATE OPTIONS
// ------------------------------------------------------------

function createOptions() {

  optionsEl.innerHTML = "";

  const choices = [target];

  while (choices.length < 4) {

    const item = randomItem();

    if (!choices.some(x => x.name === item.name)) {
      choices.push(item);
    }
  }

  // Shuffle
  choices.sort(() => Math.random() - 0.5);

  choices.forEach(item => {

    const button = document.createElement("button");

    button.type = "button";
    button.className = "fruit-option";

    const art = createArt(item);

    const name = document.createElement("div");
    name.className = "option-name";
    name.textContent = item.name;

    button.appendChild(art);
    button.appendChild(name);

    button.addEventListener("click", () => {
      selectAnswer(item, button);
    });

    optionsEl.appendChild(button);
  });
}

// ------------------------------------------------------------
// ANSWER
// ------------------------------------------------------------

function selectAnswer(item, button) {

  if (locked) return;

  locked = true;
  clearInterval(timer);

  if (item.name === target.name) {

    score += 10;

    if (score % 50 === 0) {
      level++;
    }

    button.classList.add("correct");

    messageEl.textContent =
      "🎉 Correct! " + item.name;

    speak(item.name);

    updateHeader();

    setTimeout(() => {
      nextRound();
    }, 650);

  } else {

    button.classList.add("wrong");

    loseLife("❌ Try again!");

    setTimeout(() => {

      if (lives <= 0) {
        gameOver();
      } else {
        nextRound();
      }

    }, 700);
  }
}

// ------------------------------------------------------------
// LOSE LIFE
// ------------------------------------------------------------

function loseLife(text) {

  lives--;

  messageEl.textContent = text;

  updateHeader();
}

// ------------------------------------------------------------
// GAME OVER
// ------------------------------------------------------------

function gameOver() {

  clearInterval(timer);

  locked = true;

  const finalScore = score;

  messageEl.innerHTML = `
    <div class="game-over">
      <div class="game-over-title">🎮 GAME OVER</div>
      <div class="final-score">Score: ${finalScore}</div>
      <div class="best-score">🏆 Best Score: ${bestScore}</div>
      <button id="playAgainBtn" type="button">
        🔄 Play Again
      </button>
    </div>
  `;

  const playAgainBtn =
    document.getElementById("playAgainBtn");

  if (playAgainBtn) {
    playAgainBtn.addEventListener("click", startNewGame);
  }
}

// ------------------------------------------------------------
// NEW GAME
// ------------------------------------------------------------

function startNewGame() {

  clearInterval(timer);

  score = 0;
  lives = 3;
  level = 1;
  locked = false;

  updateHeader();

  messageEl.textContent = "";

  nextRound();
}

// ------------------------------------------------------------
// SPEECH
// ------------------------------------------------------------

function speak(text) {

  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utterance =
    new SpeechSynthesisUtterance(text);

  utterance.lang = "en-IN";
  utterance.rate = 0.78;
  utterance.pitch = 1;

  window.speechSynthesis.speak(utterance);
}

// ------------------------------------------------------------
// HEAR BUTTON
// ------------------------------------------------------------

if (hearBtn) {

  hearBtn.addEventListener("click", () => {

    if (target) {
      speak(target.name);
    }

  });
}

// ------------------------------------------------------------
// RESTART BUTTON
// ------------------------------------------------------------

if (restartBtn) {

  restartBtn.addEventListener("click", () => {

    startNewGame();

  });
}

// ------------------------------------------------------------
// IMPORTANT:
// GAME DOES NOT AUTO-START.
// game.html should start only after user reaches it.
// ------------------------------------------------------------

updateHeader();

// Start only when game.html is opened.
// The Home page PLAY NOW button should link to game.html.
nextRound();
