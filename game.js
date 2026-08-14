/* =====================================================
   TAP THE SAME
   ANIMALS & BIRDS EDITION
   ===================================================== */

const ITEMS = [
  ["Dog", "🐶"],
  ["Cat", "🐱"],
  ["Lion", "🦁"],
  ["Tiger", "🐯"],
  ["Elephant", "🐘"],
  ["Panda", "🐼"],
  ["Koala", "🐨"],
  ["Monkey", "🐵"],
  ["Fox", "🦊"],
  ["Bear", "🐻"],
  ["Rabbit", "🐰"],
  ["Frog", "🐸"],
  ["Pig", "🐷"],
  ["Cow", "🐮"],
  ["Horse", "🐴"],
  ["Sheep", "🐑"],
  ["Goat", "🐐"],
  ["Chicken", "🐔"],
  ["Duck", "🦆"],
  ["Eagle", "🦅"],
  ["Owl", "🦉"],
  ["Parrot", "🦜"],
  ["Flamingo", "🦩"],
  ["Peacock", "🦚"],
  ["Penguin", "🐧"],
  ["Swan", "🦢"],
  ["Turtle", "🐢"],
  ["Crocodile", "🐊"],
  ["Snake", "🐍"],
  ["Giraffe", "🦒"],
  ["Zebra", "🦓"],
  ["Kangaroo", "🦘"],
  ["Hippo", "🦛"],
  ["Rhino", "🦏"],
  ["Octopus", "🐙"],
  ["Dolphin", "🐬"],
  ["Whale", "🐳"],
  ["Shark", "🦈"],
  ["Fish", "🐠"],
  ["Butterfly", "🦋"],
  ["Bee", "🐝"],
  ["Ladybug", "🐞"],
  ["Snail", "🐌"],
  ["Ant", "🐜"],
  ["Spider", "🕷️"]
].map(([name, emoji]) => ({ name, emoji }));


/* =====================================================
   GAME STATE
   ===================================================== */

let score = 0;
let lives = 3;
let level = 1;

let target = null;

let gameStarted = false;
let gameOver = false;

let timer = null;
let timeLeft = 8;


/* =====================================================
   ELEMENTS
   ===================================================== */

const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const levelEl = document.getElementById("level");

const optionsEl = document.getElementById("options");
const targetEmojiEl = document.getElementById("targetEmoji");
const targetNameEl = document.getElementById("targetName");

const timerBar = document.getElementById("timerBar");
const messageEl = document.getElementById("message");

const hearBtn = document.getElementById("hearBtn");
const restartBtn = document.getElementById("restartBtn");

const gameSection = document.getElementById("gameSection");
const playNowBtn = document.getElementById("playNow");


/* =====================================================
   CHANGE OLD FRUIT WORDS AUTOMATICALLY
   ===================================================== */

const smallLabel = document.querySelector(".small-label");

if (smallLabel) {
  smallLabel.textContent = "FIND THIS ANIMAL";
}

if (hearBtn) {
  hearBtn.textContent = "🔊 Hear Animal";
}


/* =====================================================
   SPEECH
   ===================================================== */

function speakAnimal(name) {

  if (!("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();

  const utterance =
    new SpeechSynthesisUtterance(name);

  utterance.lang = "en-US";
  utterance.rate = 0.65;
  utterance.pitch = 1.05;
  utterance.volume = 1;

  const voices =
    window.speechSynthesis.getVoices();

  const englishVoice =
    voices.find(v =>
      v.lang &&
      v.lang.toLowerCase().startsWith("en")
    );

  if (englishVoice) {
    utterance.voice = englishVoice;
  }

  window.speechSynthesis.speak(utterance);
}


/* =====================================================
   HEADER
   ===================================================== */

function updateHeader() {

  if (scoreEl) {
    scoreEl.textContent = score;
  }

  if (livesEl) {
    livesEl.textContent = lives;
  }

  if (levelEl) {
    levelEl.textContent = level;
  }
}


/* =====================================================
   RANDOM ANIMAL
   ===================================================== */

function randomAnimal() {

  return ITEMS[
    Math.floor(Math.random() * ITEMS.length)
  ];
}


/* =====================================================
   TARGET
   ===================================================== */

function showTarget() {

  if (!target) {
    return;
  }

  if (targetEmojiEl) {

    targetEmojiEl.innerHTML = `
      <div class="target-animal">
        ${target.emoji}
      </div>
    `;
  }

  if (targetNameEl) {
    targetNameEl.textContent = target.name;
  }
}


/* =====================================================
   OPTIONS
   ===================================================== */

function createOptions() {

  if (!optionsEl) {
    return;
  }

  optionsEl.innerHTML = "";

  const choices = [target];

  while (choices.length < 4) {

    const animal = randomAnimal();

    const exists =
      choices.some(
        item => item.name === animal.name
      );

    if (!exists) {
      choices.push(animal);
    }
  }

  choices.sort(
    () => Math.random() - 0.5
  );


  choices.forEach(animal => {

    const button =
      document.createElement("button");

    button.type = "button";
    button.className = "animal-option";

    button.innerHTML = `
      <span class="option-animal">
        ${animal.emoji}
      </span>

      <span class="option-name">
        ${animal.name}
      </span>
    `;


    button.addEventListener(
      "click",
      () => selectAnimal(animal)
    );


    optionsEl.appendChild(button);
  });
}


/* =====================================================
   TIMER
   ===================================================== */

function startTimer() {

  clearInterval(timer);

  timeLeft = 8;

  if (timerBar) {
    timerBar.style.width = "100%";
  }

  timer = setInterval(() => {

    timeLeft -= 0.1;

    const percentage =
      Math.max(
        0,
        (timeLeft / 8) * 100
      );

    if (timerBar) {
      timerBar.style.width =
        percentage + "%";
    }

    if (timeLeft <= 0) {

      clearInterval(timer);

      timeUp();
    }

  }, 100);
}


/* =====================================================
   TIME UP
   ===================================================== */

function timeUp() {

  if (!gameStarted || gameOver) {
    return;
  }

  lives--;

  updateHeader();

  showMessage(
    "⏰ Time's Up!",
    "wrong"
  );

  if (lives <= 0) {
    endGame();
    return;
  }

  setTimeout(() => {

    if (!gameOver) {
      nextRound();
    }

  }, 800);
}


/* =====================================================
   SELECT ANIMAL
   ===================================================== */

function selectAnimal(animal) {

  if (!gameStarted || gameOver) {
    return;
  }

  clearInterval(timer);

  /* Speak the animal that player tapped */
  speakAnimal(animal.name);


  if (animal.name === target.name) {

    score += 10;

    level =
      Math.floor(score / 100) + 1;

    updateHeader();

    showMessage(
      `🎉 Correct! ${animal.name}`,
      "correct"
    );

    setTimeout(() => {

      if (!gameOver) {
        nextRound();
      }

    }, 700);

  } else {

    lives--;

    updateHeader();

    showMessage(
      `❌ That's ${animal.name}`,
      "wrong"
    );

    if (lives <= 0) {

      endGame();
      return;
    }

    setTimeout(() => {

      if (!gameOver) {
        nextRound();
      }

    }, 900);
  }
}


/* =====================================================
   NEXT ROUND
   ===================================================== */

function nextRound() {

  if (!gameStarted || gameOver) {
    return;
  }

  clearInterval(timer);

  target = randomAnimal();

  showTarget();

  createOptions();

  startTimer();
}


/* =====================================================
   START GAME
   ===================================================== */

function startGame() {

  clearInterval(timer);

  score = 0;
  lives = 3;
  level = 1;

  target = null;

  gameStarted = true;
  gameOver = false;

  updateHeader();

  clearMessage();

  nextRound();
}


/* =====================================================
   GAME OVER
   ===================================================== */

function endGame() {

  clearInterval(timer);

  gameStarted = false;
  gameOver = true;

  if (targetEmojiEl) {
    targetEmojiEl.innerHTML = "🏆";
  }

  if (targetNameEl) {
    targetNameEl.textContent = "Game Over";
  }

  if (optionsEl) {

    optionsEl.innerHTML = `
      <div class="game-over">

        <div class="game-over-icon">
          🏆
        </div>

        <div class="game-over-title">
          GAME OVER
        </div>

        <div class="final-score">
          Your Score: ${score}
        </div>

        <div class="final-level">
          ⭐ Level ${level}
        </div>

        <button
          id="playAgainBtn"
          class="play-again"
          type="button">
          🔄 PLAY AGAIN
        </button>

      </div>
    `;


    const playAgainBtn =
      document.getElementById(
        "playAgainBtn"
      );


    if (playAgainBtn) {

      playAgainBtn.addEventListener(
        "click",
        startGame
      );
    }
  }

  showMessage(
    "Well Played! 🎉",
    "correct"
  );
}


/* =====================================================
   MESSAGE
   ===================================================== */

function showMessage(text, type) {

  if (!messageEl) {
    return;
  }

  messageEl.textContent = text;

  messageEl.className =
    "message " + type;
}


function clearMessage() {

  if (!messageEl) {
    return;
  }

  messageEl.textContent = "";

  messageEl.className = "message";
}


/* =====================================================
   HEAR ANIMAL BUTTON
   ===================================================== */

if (hearBtn) {

  hearBtn.addEventListener(
    "click",
    function () {

      if (target) {
        speakAnimal(target.name);
      }

    }
  );
}


/* =====================================================
   RESTART
   ===================================================== */

if (restartBtn) {

  restartBtn.addEventListener(
    "click",
    startGame
  );
}


/* =====================================================
   START SCREEN
   ===================================================== */

function showStartScreen() {

  clearInterval(timer);

  gameStarted = false;
  gameOver = false;

  if (targetEmojiEl) {
    targetEmojiEl.innerHTML = "🐾";
  }

  if (targetNameEl) {
    targetNameEl.textContent =
      "Ready to Play?";
  }

  if (optionsEl) {

    optionsEl.innerHTML = `
      <div class="start-screen">

        <div class="start-animals">
          🦁 🐼 🐶 🐱 🐘
        </div>

        <div class="start-title">
          Animal Match
        </div>

        <p>
          Find the animal that matches
          the target!
        </p>

        <button
          id="startGameBtn"
          class="play-again"
          type="button">
          ▶️ START GAME
        </button>

      </div>
    `;


    const startGameBtn =
      document.getElementById(
        "startGameBtn"
      );


    if (startGameBtn) {

      startGameBtn.addEventListener(
        "click",
        startGame
      );
    }
  }

  updateHeader();
}


/* =====================================================
   PLAY NOW
   ===================================================== */

if (playNowBtn) {

  playNowBtn.addEventListener(
    "click",
    function () {

      if (gameSection) {

        gameSection.style.display =
          "block";

        gameSection.scrollIntoView({
          behavior: "smooth"
        });
      }

      showStartScreen();
    }
  );
}


/* =====================================================
   INITIAL STATE
   ===================================================== */

gameStarted = false;
gameOver = false;

clearInterval(timer);


/*
   DO NOT AUTO START.
*/

if (!playNowBtn && optionsEl) {

  if (gameSection) {
    gameSection.style.display = "block";
  }

  showStartScreen();
}
