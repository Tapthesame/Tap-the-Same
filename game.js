/* =========================================================
   TAP THE SAME
   FINAL GAME.JS
   =========================================================

   GAME FLOW:

   WEBSITE OPEN
        ↓
   HOME / PLAY NOW
        ↓
   PLAY NOW CLICK
        ↓
   GAME SCREEN
        ↓
   START GAME CLICK
        ↓
   ROUND 1
        ↓
   Correct → Score increases
   Wrong   → Life decreases
   Timeout → Life decreases
        ↓
   Lives = 0
        ↓
   GAME OVER
        ↓
   PLAY AGAIN
        ↓
   Score = 0
   Lives = 3
   Level = 1
*/

/* =========================================================
   FRUITS + BIRDS
   ========================================================= */

const ITEMS = [

  /* ---------- COMMON FRUITS ---------- */

  { name: "Apple", emoji: "🍎", type: "fruit" },
  { name: "Green Apple", emoji: "🍏", type: "fruit" },
  { name: "Banana", emoji: "🍌", type: "fruit" },
  { name: "Orange", emoji: "🍊", type: "fruit" },
  { name: "Lemon", emoji: "🍋", type: "fruit" },
  { name: "Watermelon", emoji: "🍉", type: "fruit" },
  { name: "Grapes", emoji: "🍇", type: "fruit" },
  { name: "Strawberry", emoji: "🍓", type: "fruit" },
  { name: "Cherry", emoji: "🍒", type: "fruit" },
  { name: "Peach", emoji: "🍑", type: "fruit" },
  { name: "Mango", emoji: "🥭", type: "fruit" },
  { name: "Pineapple", emoji: "🍍", type: "fruit" },
  { name: "Kiwi", emoji: "🥝", type: "fruit" },
  { name: "Coconut", emoji: "🥥", type: "fruit" },
  { name: "Avocado", emoji: "🥑", type: "fruit" },
  { name: "Pear", emoji: "🍐", type: "fruit" },
  { name: "Melon", emoji: "🍈", type: "fruit" },
  { name: "Papaya", emoji: "🧡", type: "fruit" },
  { name: "Plum", emoji: "🟣", type: "fruit" },

  /* ---------- SPECIAL FRUITS ---------- */

  {
    name: "Blackberry",
    image: "fruit-sheet.png",
    position: "0% 0%",
    type: "fruit"
  },

  {
    name: "Pomegranate",
    image: "fruit-sheet.png",
    position: "50% 0%",
    type: "fruit"
  },

  {
    name: "Dragon Fruit",
    image: "fruit-sheet.png",
    position: "100% 0%",
    type: "fruit"
  },

  {
    name: "Star Fruit",
    image: "fruit-sheet.png",
    position: "0% 100%",
    type: "fruit"
  },

  {
    name: "Fig",
    image: "fruit-sheet.png",
    position: "50% 100%",
    type: "fruit"
  },

  {
    name: "Dates",
    image: "fruit-sheet.png",
    position: "100% 100%",
    type: "fruit"
  },

  { name: "Raspberry", emoji: "🔴", type: "fruit" },
  { name: "Blueberry", emoji: "🔵", type: "fruit" },
  { name: "Guava", emoji: "🟢", type: "fruit" },
  { name: "Apricot", emoji: "🟠", type: "fruit" },
  { name: "Lychee", emoji: "🔴", type: "fruit" },
  { name: "Passion Fruit", emoji: "🟣", type: "fruit" },
  { name: "Persimmon", emoji: "🟠", type: "fruit" },
  { name: "Tangerine", emoji: "🍊", type: "fruit" },
  { name: "Grapefruit", emoji: "🍊", type: "fruit" },
  { name: "Cantaloupe", emoji: "🍈", type: "fruit" },
  { name: "Nectarine", emoji: "🍑", type: "fruit" },
  { name: "Cranberry", emoji: "🔴", type: "fruit" },
  { name: "Mulberry", emoji: "🫐", type: "fruit" },
  { name: "Jackfruit", emoji: "🟢", type: "fruit" },
  { name: "Durian", emoji: "🟢", type: "fruit" },
  { name: "Longan", emoji: "🟤", type: "fruit" },

  /* ---------- BIRDS ---------- */

  { name: "Parrot", emoji: "🦜", type: "bird" },
  { name: "Penguin", emoji: "🐧", type: "bird" },
  { name: "Flamingo", emoji: "🦩", type: "bird" },
  { name: "Owl", emoji: "🦉", type: "bird" },
  { name: "Eagle", emoji: "🦅", type: "bird" },
  { name: "Duck", emoji: "🦆", type: "bird" },
  { name: "Swan", emoji: "🦢", type: "bird" },
  { name: "Peacock", emoji: "🦚", type: "bird" },
  { name: "Rooster", emoji: "🐓", type: "bird" },
  { name: "Chicken", emoji: "🐔", type: "bird" },
  { name: "Turkey", emoji: "🦃", type: "bird" },
  { name: "Dove", emoji: "🕊️", type: "bird" },
  { name: "Hummingbird", emoji: "🐦", type: "bird" },
  { name: "Seagull", emoji: "🪽", type: "bird" }
];


/* =========================================================
   GAME VARIABLES
   ========================================================= */

let score = 0;
let lives = 3;
let level = 1;

let target = null;

let gameStarted = false;
let gameOver = false;

let timer = null;
let timeLeft = 8;

let bestScore =
  Number(localStorage.getItem("tapSameBestScore")) || 0;


/* =========================================================
   FIND ELEMENTS
   ========================================================= */

const scoreEl =
  document.getElementById("score");

const livesEl =
  document.getElementById("lives");

const levelEl =
  document.getElementById("level");

const optionsEl =
  document.getElementById("options");

const targetNameEl =
  document.getElementById("targetName");

const targetEmojiEl =
  document.getElementById("targetEmoji");

const timerBar =
  document.getElementById("timerBar");

const messageEl =
  document.getElementById("message");

const hearBtn =
  document.getElementById("hearBtn");

const restartBtn =
  document.getElementById("restartBtn");

const gameSection =
  document.getElementById("gameSection");

const playNowBtn =
  document.getElementById("playNow");


/* =========================================================
   UPDATE SCORE / LIVES / LEVEL
   ========================================================= */

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


/* =========================================================
   CREATE ITEM IMAGE
   ========================================================= */

function createItemVisual(item, big = false) {

  /* SPECIAL REAL IMAGE SPRITE */

  if (item.image) {

    const size =
      big ? "300% 200%" : "300% 200%";

    return `
      <div
        class="real-item-image ${big ? "big" : ""}"
        style="
          background-image:url('${item.image}');
          background-size:${size};
          background-position:${item.position};
          background-repeat:no-repeat;
        ">
      </div>
    `;
  }


  /* NORMAL ITEM */

  return `
    <div class="item-emoji ${big ? "big" : ""}">
      ${item.emoji}
    </div>
  `;
}


/* =========================================================
   SHOW TARGET
   ========================================================= */

function showTarget() {

  if (!target) return;

  if (targetEmojiEl) {

    targetEmojiEl.innerHTML =
      createItemVisual(target, true);
  }

  if (targetNameEl) {

    targetNameEl.textContent =
      target.name;
  }
}


/* =========================================================
   GET RANDOM ITEMS
   ========================================================= */

function getRandomItems(count) {

  const shuffled =
    [...ITEMS].sort(
      () => Math.random() - 0.5
    );

  return shuffled.slice(0, count);
}


/* =========================================================
   CREATE OPTIONS
   ========================================================= */

function createOptions() {

  if (!optionsEl) return;

  optionsEl.innerHTML = "";


  let choices = [target];


  const others =
    ITEMS.filter(
      item => item.name !== target.name
    );


  const shuffledOthers =
    [...others].sort(
      () => Math.random() - 0.5
    );


  while (
    choices.length < 4 &&
    shuffledOthers.length
  ) {

    const item =
      shuffledOthers.shift();

    if (
      !choices.some(
        x => x.name === item.name
      )
    ) {

      choices.push(item);
    }
  }


  choices.sort(
    () => Math.random() - 0.5
  );


  choices.forEach(item => {

    const button =
      document.createElement("button");

    button.type = "button";

    button.className =
      "fruit-option";


    button.innerHTML = `
      <div class="option-picture">
        ${createItemVisual(item)}
      </div>

      <div class="option-name">
        ${item.name}
      </div>
    `;


    button.addEventListener(
      "click",
      () => selectItem(item)
    );


    optionsEl.appendChild(button);

  });
}


/* =========================================================
   START TIMER
   ========================================================= */

function startTimer() {

  clearInterval(timer);


  timeLeft =
    Math.max(
      4,
      9 - Math.floor(level / 3)
    );


  if (timerBar) {

    timerBar.style.width =
      "100%";
  }


  timer =
    setInterval(() => {

      timeLeft -= 0.1;


      const percentage =
        Math.max(
          0,
          (timeLeft / 9) * 100
        );


      if (timerBar) {

        timerBar.style.width =
          percentage + "%";
      }


      if (timeLeft <= 0) {

        clearInterval(timer);

        timeOut();
      }

    }, 100);
}


/* =========================================================
   TIME OUT
   ========================================================= */

function timeOut() {

  if (!gameStarted || gameOver) {
    return;
  }


  lives--;


  updateHeader();


  showMessage(
    "⏰ Time Up!",
    "wrong"
  );


  if (lives <= 0) {

    endGame();
    return;
  }


  setTimeout(() => {

    if (!gameOver) {

      clearMessage();

      nextRound();
    }

  }, 700);
}


/* =========================================================
   SELECT ITEM
   ========================================================= */

function selectItem(item) {

  if (
    !gameStarted ||
    gameOver
  ) {
    return;
  }


  clearInterval(timer);


  if (
    item.name === target.name
  ) {

    /* CORRECT */

    score += 10;


    level =
      Math.floor(score / 100) + 1;


    if (score > bestScore) {

      bestScore = score;

      localStorage.setItem(
        "tapSameBestScore",
        bestScore
      );
    }


    updateHeader();


    showMessage(
      "🎉 Correct!",
      "correct"
    );


    setTimeout(() => {

      if (!gameOver) {

        clearMessage();

        nextRound();
      }

    }, 450);


  } else {

    /* WRONG */

    lives--;


    updateHeader();


    showMessage(
      "❌ Wrong!",
      "wrong"
    );


    if (lives <= 0) {

      endGame();
      return;
    }


    setTimeout(() => {

      if (!gameOver) {

        clearMessage();

        nextRound();
      }

    }, 650);
  }
}


/* =========================================================
   NEXT ROUND
   ========================================================= */

function nextRound() {

  if (
    !gameStarted ||
    gameOver
  ) {
    return;
  }


  clearInterval(timer);


  target =
    ITEMS[
      Math.floor(
        Math.random() * ITEMS.length
      )
    ];


  showTarget();

  createOptions();

  startTimer();
}


/* =========================================================
   START GAME
   ========================================================= */

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


  if (optionsEl) {

    optionsEl.innerHTML = "";
  }


  nextRound();
}


/* =========================================================
   END GAME
   ========================================================= */

function endGame() {

  clearInterval(timer);


  gameStarted = false;

  gameOver = true;


  if (score > bestScore) {

    bestScore = score;

    localStorage.setItem(
      "tapSameBestScore",
      bestScore
    );
  }


  if (targetNameEl) {

    targetNameEl.textContent =
      "Game Over";
  }


  if (targetEmojiEl) {

    targetEmojiEl.innerHTML =
      "🏆";
  }


  if (optionsEl) {

    optionsEl.innerHTML = `
      <div class="game-over">

        <div class="game-over-title">
          🎮 GAME OVER
        </div>

        <div class="final-score">
          Your Score: ${score}
        </div>

        <div class="best-score">
          🏆 Best Score: ${bestScore}
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
    "Great job! 🎉",
    ""
  );
}


/* =========================================================
   MESSAGE
   ========================================================= */

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


/* =========================================================
   HEAR FRUIT / BIRD
   ========================================================= */

if (hearBtn) {

  hearBtn.addEventListener(
    "click",
    () => {

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

        speech.rate = 0.65;

        speech.pitch = 1;


        speechSynthesis.speak(
          speech
        );
      }
    }
  );
}


/* =========================================================
   RESTART BUTTON
   ========================================================= */

if (restartBtn) {

  restartBtn.addEventListener(
    "click",
    startGame
  );
}


/* =========================================================
   PLAY NOW
   IMPORTANT:
   WEBSITE OPEN → NO GAME
   PLAY NOW → SHOW GAME
   ========================================================= */

function openGameScreen() {

  if (gameSection) {

    gameSection.style.display =
      "block";

    gameSection.scrollIntoView({
      behavior: "smooth"
    });
  }


  /*
    IMPORTANT:
    We DO NOT call startGame()
    here.

    Player must press
    START GAME separately.
  */


  showStartScreen();
}


/* =========================================================
   SHOW START SCREEN
   ========================================================= */

function showStartScreen() {

  gameStarted = false;

  gameOver = false;

  clearInterval(timer);


  if (targetEmojiEl) {

    targetEmojiEl.innerHTML =
      "🍓";
  }


  if (targetNameEl) {

    targetNameEl.textContent =
      "Ready to Play?";
  }


  if (optionsEl) {

    optionsEl.innerHTML = `

      <div class="start-screen">

        <div class="start-title">
          🍓 Ready?
        </div>

        <p>
          Find the matching fruit
          or bird!
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
}


/* =========================================================
   PLAY NOW BUTTON
   ========================================================= */

if (playNowBtn) {

  playNowBtn.addEventListener(
    "click",
    openGameScreen
  );
}


/* =========================================================
   INITIAL STATE
   ========================================================= */

/*
   VERY IMPORTANT:

   DO NOT START GAME HERE.

   When website opens:
       gameStarted = false

   Player must click:
       PLAY NOW

   Then:
       START GAME

   Only then:
       nextRound()
*/


gameStarted = false;

gameOver = false;

clearInterval(timer);


/*
   If game section is already on the
   page, don't start it automatically.
*/

if (gameSection) {

  gameSection.style.display =
    "none";
}


/* =========================================================
   IF GAME PAGE IS OPEN DIRECTLY
   ========================================================= */

if (
  !playNowBtn &&
  optionsEl
) {

  /*
     game.html direct open:
     show START GAME,
     but DON'T automatically start.
  */

  if (gameSection) {

    gameSection.style.display =
      "block";
  }

  showStartScreen();
}



  
