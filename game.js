const items = [
  // FRUITS
  {name:"Apple", image:"https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f34e.svg", type:"fruit"},
  {name:"Banana", image:"https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f34c.svg", type:"fruit"},
  {name:"Mango", image:"https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f96d.svg", type:"fruit"},
  {name:"Orange", image:"https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f34a.svg", type:"fruit"},
  {name:"Strawberry", image:"https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f353.svg", type:"fruit"},
  {name:"Watermelon", image:"https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f349.svg", type:"fruit"},
  {name:"Pineapple", image:"https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f34d.svg", type:"fruit"},
  {name:"Grapes", image:"https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f347.svg", type:"fruit"},
  {name:"Kiwi", image:"https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f95d.svg", type:"fruit"},
  {name:"Peach", image:"https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f351.svg", type:"fruit"},
  {name:"Pear", image:"https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f350.svg", type:"fruit"},
  {name:"Cherry", image:"https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f352.svg", type:"fruit"},
  {name:"Coconut", image:"https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f965.svg", type:"fruit"},
  {name:"Lemon", image:"https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f34b.svg", type:"fruit"},
  {name:"Avocado", image:"https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f951.svg", type:"fruit"},
  {name:"Melon", image:"https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f348.svg", type:"fruit"},
  {name:"Pomegranate", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Pomegranate%20fruit.jpg", type:"fruit"},
  {name:"Raspberry", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Raspberries.png", type:"fruit"},
  {name:"Blackberry", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Blackberries.jpg", type:"fruit"},
  {name:"Papaya", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Papaya.jpg", type:"fruit"},
  {name:"Fig", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Figs.jpg", type:"fruit"},
  {name:"Dates", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Dates.jpg", type:"fruit"},
  {name:"Dragon Fruit", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Pitaya%20fruit.jpg", type:"fruit"},
  {name:"Passion Fruit", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Passionfruit.jpg", type:"fruit"},
  {name:"Guava", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Guava.jpg", type:"fruit"},
  {name:"Sapota", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Sapodilla.jpg", type:"fruit"},
  {name:"Lychee", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Lychee.jpg", type:"fruit"},
  {name:"Jackfruit", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Jackfruit.jpg", type:"fruit"},
  {name:"Star Fruit", image:"https://commons.wikimedia.org/wiki/Special:FilePath/Carambola.jpg", type:"fruit"},
  {name:"Avocado", image:"https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f951.svg", type:"fruit"},

  // BIRDS
  {name:"Parrot", image:"https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f99c.svg", type:"bird"},
  {name:"Peacock", image:"https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f99a.svg", type:"bird"},
  {name:"Owl", image:"https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f989.svg", type:"bird"},
  {name:"Duck", image:"https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f986.svg", type:"bird"},
  {name:"Eagle", image:"https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f985.svg", type:"bird"},
  {name:"Penguin", image:"https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f427.svg", type:"bird"},
  {name:"Swan", image:"https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f9a2.svg", type:"bird"},
  {name:"Chicken", image:"https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f414.svg", type:"bird"},
  {name:"Rooster", image:"https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f413.svg", type:"bird"},
  {name:"Turkey", image:"https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f983.svg", type:"bird"}
];

let score = 0;
let lives = 3;
let level = 1;
let target = null;
let timer = null;
let timeLeft = 100;
let locked = false;

const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const levelEl = document.getElementById("level");
const targetEmojiEl = document.getElementById("targetEmoji");
const targetNameEl = document.getElementById("targetName");
const optionsEl = document.getElementById("options");
const messageEl = document.getElementById("message");
const timerBar = document.getElementById("timerBar");
const hearBtn = document.getElementById("hearBtn");
const restartBtn = document.getElementById("restartBtn");

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function updateHUD() {
  if (scoreEl) scoreEl.textContent = score;
  if (livesEl) livesEl.textContent = lives;
  if (levelEl) levelEl.textContent = level;
}

function speak(text) {
  if (!window.speechSynthesis) return;

  speechSynthesis.cancel();

  const voice = new SpeechSynthesisUtterance(text);

  voice.lang = "en-US";
  voice.rate = 0.78;
  voice.pitch = 1;
  voice.volume = 1;

  speechSynthesis.speak(voice);
}

function startTimer() {
  clearInterval(timer);

  timeLeft = Math.max(45, 100 - ((level - 1) * 5));

  if (timerBar) {
    timerBar.style.width = "100%";
  }

  timer = setInterval(() => {

    timeLeft--;

    if (timerBar) {
      timerBar.style.width = timeLeft + "%";
    }

    if (timeLeft <= 0) {

      clearInterval(timer);

      if (locked) return;

      locked = true;

      lives--;

      updateHUD();

      if (messageEl) {
        messageEl.textContent = "⏰ Time's up!";
      }

      setTimeout(() => {

        if (lives <= 0) {
          gameOver();
        } else {
          nextRound();
        }

      }, 700);
    }

  }, 100);
}

function createImage(item, size) {

  const img = document.createElement("img");

  img.src = item.image;

  img.alt = item.name;

  img.loading = "eager";

  img.style.width = size + "px";
  img.style.height = size + "px";

  img.style.objectFit = "contain";

  img.style.display = "block";

  img.style.margin = "auto";

  img.onerror = function () {

    this.style.display = "none";

    const fallback = document.createElement("div");

    fallback.textContent = item.type === "bird"
      ? "🐦"
      : "🍎";

    fallback.style.fontSize = size * 0.75 + "px";

    this.parentElement.prepend(fallback);
  };

  return img;
}

function chooseTarget() {

  target =
    items[Math.floor(Math.random() * items.length)];
}

function createOptions() {

  /*
     EXACTLY FOUR OPTIONS.
     TARGET IS ALWAYS INCLUDED.
  */

  const otherItems = items.filter(
    item => item.name !== target.name
  );

  const wrongItems =
    shuffle(otherItems).slice(0, 3);

  return shuffle([
    target,
    ...wrongItems
  ]);
}

function renderQuestion() {

  chooseTarget();

  const options = createOptions();

  if (options.length !== 4) {
    renderQuestion();
    return;
  }

  targetEmojiEl.innerHTML = "";

  targetEmojiEl.appendChild(
    createImage(target, 130)
  );

  targetNameEl.textContent =
    target.name;

  optionsEl.innerHTML = "";

  options.forEach(item => {

    const button =
      document.createElement("button");

    button.type = "button";

    button.className =
      "fruit-option";

    button.style.minHeight = "150px";

    button.style.display = "flex";

    button.style.flexDirection =
      "column";

    button.style.alignItems =
      "center";

    button.style.justifyContent =
      "center";

    button.style.gap = "7px";

    button.appendChild(
      createImage(item, 82)
    );

    const name =
      document.createElement("span");

    name.textContent =
      item.name;

    name.style.fontWeight =
      "800";

    name.style.fontSize =
      "14px";

    button.appendChild(name);

    button.addEventListener(
      "click",
      () => checkAnswer(item, button)
    );

    optionsEl.appendChild(button);
  });

  if (messageEl) {
    messageEl.textContent = "";
  }

  locked = false;

  startTimer();
}

function checkAnswer(item, button) {

  if (locked) return;

  locked = true;

  clearInterval(timer);

  if (item.name === target.name) {

    /*
       CORRECT:
       SCORE ONLY INCREASES.
    */

    score += 10;

    level =
      Math.floor(score / 50) + 1;

    updateHUD();

    button.style.transform =
      "scale(1.08)";

    button.style.boxShadow =
      "0 0 0 5px #54d88a";

    if (messageEl) {
      messageEl.textContent =
        "🎉 Correct! " +
        target.name;
    }

    speak(target.name);

    setTimeout(
      nextRound,
      750
    );

  } else {

    /*
       WRONG:
       SCORE NEVER DECREASES.
       ONLY LIFE DECREASES.
    */

    lives--;

    updateHUD();

    button.style.boxShadow =
      "0 0 0 5px #ff5577";

    if (messageEl) {
      messageEl.textContent =
        "❌ Wrong answer!";
    }

    setTimeout(() => {

      if (lives <= 0) {

        gameOver();

      } else {

        nextRound();

      }

    }, 700);
  }
}

function nextRound() {

  clearInterval(timer);

  if (lives <= 0) {
    gameOver();
    return;
  }

  renderQuestion();
}

function gameOver() {

  clearInterval(timer);

  locked = true;

  const previousBest =
    Number(
      localStorage.getItem(
        "tapTheSameBest"
      ) || 0
    );

  const best =
    Math.max(
      score,
      previousBest
    );

  localStorage.setItem(
    "tapTheSameBest",
    best
  );

  const oldScreen =
    document.getElementById(
      "tapSameGameOver"
    );

  if (oldScreen) {
    oldScreen.remove();
  }

  const overlay =
    document.createElement("div");

  overlay.id =
    "tapSameGameOver";

  overlay.style.position =
    "fixed";

  overlay.style.inset = "0";

  overlay.style.zIndex =
    "99999";

  overlay.style.display =
    "flex";

  overlay.style.alignItems =
    "center";

  overlay.style.justifyContent =
    "center";

  overlay.style.background =
    "rgba(30,15,45,.82)";

  overlay.innerHTML = `

    <div style="
      width:min(92vw,430px);
      background:white;
      border-radius:30px;
      padding:35px 25px;
      text-align:center;
      box-shadow:0 25px 70px rgba(0,0,0,.35);
    ">

      <div style="
        font-size:65px;
      ">🏆</div>

      <h2 style="
        font-size:34px;
        margin:10px 0;
      ">
        Game Over!
      </h2>

      <div style="
        font-size:24px;
        font-weight:900;
        margin:15px 0;
      ">
        Final Score: ${score}
      </div>

      <div style="
        font-size:19px;
        margin-bottom:25px;
      ">
        ⭐ Best Score: ${best}
      </div>

      <button id="playAgain"
        style="
          border:0;
          border-radius:18px;
          padding:16px 30px;
          font-size:19px;
          font-weight:900;
          color:white;
          background:linear-gradient(
            90deg,
            #ff477d,
            #ff9b45
          );
          cursor:pointer;
        "
      >
        PLAY AGAIN
      </button>

    </div>
  `;

  document.body.appendChild(overlay);

  document
    .getElementById("playAgain")
    .addEventListener(
      "click",
      () => {

        overlay.remove();

        /*
           NEW GAME
           Score = 0
           Lives = 3
           Level = 1
        */

        score = 0;

        lives = 3;

        level = 1;

        updateHUD();

        renderQuestion();
      }
    );
}

if (hearBtn) {

  hearBtn.addEventListener(
    "click",
    () => {

      if (target) {
        speak(target.name);
      }

    }
  );
}

if (restartBtn) {

  restartBtn.addEventListener(
    "click",
    () => {

      document
        .getElementById(
          "tapSameGameOver"
        )
        ?.remove();

      score = 0;

      lives = 3;

      level = 1;

      updateHUD();

      renderQuestion();
    }
  );
}

updateHUD();

renderQuestion();
