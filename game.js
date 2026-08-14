/* =====================================================
   TAP THE SAME - ANIMALS & BIRDS EDITION
   ===================================================== */

const ITEMS = [
  { name: "Dog", emoji: "🐶" },
  { name: "Cat", emoji: "🐱" },
  { name: "Lion", emoji: "🦁" },
  { name: "Tiger", emoji: "🐯" },
  { name: "Elephant", emoji: "🐘" },
  { name: "Panda", emoji: "🐼" },
  { name: "Koala", emoji: "🐨" },
  { name: "Monkey", emoji: "🐵" },
  { name: "Fox", emoji: "🦊" },
  { name: "Bear", emoji: "🐻" },
  { name: "Rabbit", emoji: "🐰" },
  { name: "Frog", emoji: "🐸" },
  { name: "Pig", emoji: "🐷" },
  { name: "Cow", emoji: "🐮" },
  { name: "Horse", emoji: "🐴" },
  { name: "Sheep", emoji: "🐑" },
  { name: "Goat", emoji: "🐐" },
  { name: "Chicken", emoji: "🐔" },
  { name: "Duck", emoji: "🦆" },
  { name: "Eagle", emoji: "🦅" },
  { name: "Owl", emoji: "🦉" },
  { name: "Parrot", emoji: "🦜" },
  { name: "Flamingo", emoji: "🦩" },
  { name: "Peacock", emoji: "🦚" },
  { name: "Penguin", emoji: "🐧" },
  { name: "Swan", emoji: "🦢" },
  { name: "Turtle", emoji: "🐢" },
  { name: "Crocodile", emoji: "🐊" },
  { name: "Snake", emoji: "🐍" },
  { name: "Giraffe", emoji: "🦒" },
  { name: "Zebra", emoji: "🦓" },
  { name: "Kangaroo", emoji: "🦘" },
  { name: "Hippo", emoji: "🦛" },
  { name: "Rhino", emoji: "🦏" },
  { name: "Octopus", emoji: "🐙" },
  { name: "Dolphin", emoji: "🐬" },
  { name: "Whale", emoji: "🐳" },
  { name: "Shark", emoji: "🦈" },
  { name: "Fish", emoji: "🐠" },
  { name: "Butterfly", emoji: "🦋" },
  { name: "Bee", emoji: "🐝" }
];


/* =========================
   GAME VARIABLES
   ========================= */

let score = 0;
let lives = 3;
let level = 1;

let target = null;

let gameStarted = false;
let gameOver = false;

let timer = null;
let timeLeft = 8;


/* =========================
   ELEMENTS
   ========================= */

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


/* =========================
   UPDATE HEADER
   ========================= */

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


/* =========================
   RANDOM ITEM
   ========================= */

function randomItem() {

  return ITEMS[
    Math.floor(Math.random() * ITEMS.length)
  ];
}


/* =========================
   CREATE ANIMAL IMAGE
   ========================= */

function animalVisual(item, large = false) {

  return `
    <div
      class="animal-emoji ${large ? "large-animal" : ""}"
      aria-label="${item.name}">
      ${item.emoji}
    </div>
  `;
}


/* =========================
   SHOW TARGET
   ========================= */

function showTarget() {

  if (!target) return;

  if (targetEmojiEl) {

    targetEmojiEl.innerHTML =
      animalVisual(target, true);
  }

  if (targetNameEl) {

    targetNameEl.textContent =
      target.name;
  }
}


/* =========================
   CREATE OPTIONS
   ========================= */

function createOptions() {

  if (!optionsEl) return;

  optionsEl.innerHTML = "";

  let choices = [target];

  while (choices.length < 4) {

    const item = randomItem();

    const alreadyExists =
      choices.some(
        x => x.name === item.name
      );

    if (!alreadyExists) {
      choices.push(item);
    }
  }


  /* Shuffle */

  choices.sort(
    () => Math.random() - 0.5
  );


  choices.forEach(item => {

    const button =
      document.createElement("button");

    button.type = "button";

    button.className =
      "animal-option";


    button.innerHTML = `
      <div class="animal-picture">
        ${animalVisual(item)}
      </div>

      <div class="animal-name">
        ${item.name}
      </div>
    `;


    button.addEventListener(
      "click",
      function () {
        selectAnimal(item);
      }
    );


    optionsEl.appendChild(button);

  });
}


/* =========================
   TIMER
   ========================= */

function startTimer() {

  clearInterval(timer);

  timeLeft = 8;


  if (timerBar) {

    timerBar.style.width = "100%";
  }


  timer = setInterval(
    function () {

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

        timeoutRound();
      }

    },
    100
  );
}


/* =========================
   TIME OUT
   ========================= */

function timeoutRound() {

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


  setTimeout(
    function () {

      nextRound();

    },
    700
  );
}


/* =========================
   SELECT ANIMAL
   ========================= */

function selectAnimal(item) {

  if (!gameStarted || gameOver) {
    return;
  }


  clearInterval(timer);


  if (item.name === target.name) {

    /* CORRECT */

    score += 10;

    level =
      Math.floor(score / 100) + 1;

    updateHeader();


    showMessage(
      "🎉 Correct!",
      "correct"
    );


    setTimeout(
      function () {

        nextRound();

      },
      450
    );


  } else {

    /* WRONG */

    lives--;

    updateHeader();


    showMessage(
      "❌ Try Again!",
      "wrong"
    );


    if (lives <= 0) {

      endGame();

      return;
    }


    setTimeout(
      function () {

        nextRound();

      },
      650
    );
  }
}


/* =========================
   NEXT ROUND
   ========================= */

function nextRound() {

  if (!gameStarted || gameOver) {
    return;
  }


  clearInterval(timer);


  target = randomItem();


  showTarget();

  createOptions();

  startTimer();
}


/* =========================
   START GAME
   ========================= */

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


/* =========================
   GAME OVER
   ========================= */

function endGame() {

  clearInterval(timer);


  gameStarted = false;
  gameOver = true;


  if (targetEmojiEl) {

    targetEmojiEl.innerHTML = "🏆";
  }


  if (targetNameEl) {

    targetNameEl.textContent =
      "Game Over";
  }


  if (optionsEl) {

    optionsEl.innerHTML = `

      <div class="game-over">

        <div class="game-over-title">
          🎮 GAME OVER
        </div>

        <div class="final-score">
          Score: ${score}
        </div>

        <div class="final-level">
          ⭐ Level: ${level}
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
    "Well Played! 🏆",
    "correct"
  );
}


/* =========================
   MESSAGE
   ========================= */

function showMessage(text, type) {

  if (!messageEl) return;

  messageEl.textContent = text;

  messageEl.className =
    "message " + type;
}


function clearMessage() {

  if (!messageEl) return;

  messageEl.textContent = "";

  messageEl.className =
    "message";
}


/* =========================
   HEAR ANIMAL
   ========================= */

if (hearBtn) {

  hearBtn.addEventListener(
    "click",
    function () {

      if (!target) return;


      if (
        "speechSynthesis" in window
      ) {

        speechSynthesis.cancel();


        const speech =
          new SpeechSynthesisUtterance(
            target.name
          );


        speech.lang = "en-US";

        /*
          Slow pronunciation so
          children's names are easier
          to understand.
        */

        speech.rate = 0.65;
        speech.pitch = 1;


        speechSynthesis.speak(
          speech
        );
      }

    }
  );
}


/* =========================
   RESTART BUTTON
   ========================= */

if (restartBtn) {

  restartBtn.addEventListener(
    "click",
    startGame
  );
}


/* =========================
   START SCREEN
   ========================= */

function showStartScreen() {

  clearInterval(timer);


  gameStarted = false;
  gameOver = false;


  if (targetEmojiEl) {

    targetEmojiEl.innerHTML =
      "🐾";
  }


  if (targetNameEl) {

    targetNameEl.textContent =
      "Ready to Play?";
  }


  if (optionsEl) {

    optionsEl.innerHTML = `

      <div class="start-screen">

        <div class="start-animal">
          🦁 🐼 🐶
        </div>

        <div class="start-title">
          Animal Match!
        </div>

        <p>
          Find the animal that matches
          the target.
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


/* =========================
   PLAY NOW
   ========================= */

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


/* =========================
   INITIAL STATE
   ========================= */

/*
   VERY IMPORTANT:

   WEBSITE OPEN AINAPPUDU
   GAME AUTOMATIC GA START AVVADU.
*/

gameStarted = false;
gameOver = false;

clearInterval(timer);


/*
   If game section is directly visible,
   show START GAME screen.
*/

if (!playNowBtn && optionsEl) {

  if (gameSection) {

    gameSection.style.display =
      "block";
  }

  showStartScreen();
}
      
