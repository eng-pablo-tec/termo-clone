const game = document.getElementById("game");
const message = document.getElementById("message");
const keyboard = document.getElementById("keyboard");

let currentRow = 0;
let currentCol = 0;
let isGameOver = false;

const grid = [];

for (let i = 0; i < 6; i++) {
  const row = document.createElement("div");
  row.className = "row";
  const tiles = [];

  for (let j = 0; j < 5; j++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    row.appendChild(tile);
    tiles.push(tile);
  }

  grid.push(tiles);
  game.appendChild(row);
}

const keys = [
  ..."QWERTYUIOP",
  ..."ASDFGHJKL",
  ..."ZXCVBNM",
  "⌫", "ENTER"
];

keys.forEach(k => {
  const key = document.createElement("button");
  key.className = "key";
  key.textContent = k;
  key.onclick = () => handleKey(k);
  keyboard.appendChild(key);
});

function handleKey(key) {
  if (isGameOver) return;

  if (key === "⌫") {
    if (currentCol > 0) {
      currentCol--;
      grid[currentRow][currentCol].textContent = "";
    }
  } else if (key === "ENTER") {
    if (currentCol === 5) {
      const guess = grid[currentRow].map(tile => tile.textContent.toLowerCase()).join("");
      if (!wordList.includes(guess)) {
        showMessage("Palavra inválida");
        return;
      }
      revealWord(guess);
    }
  } else if (/^[A-Z]$/.test(key)) {
    if (currentCol < 5) {
      grid[currentRow][currentCol].textContent = key;
      currentCol++;
    }
  }
}

function revealWord(guess) {
  const result = Array(5).fill("absent");
  const answerArray = answer.split("");

  // Marcar verdes
  for (let i = 0; i < 5; i++) {
    if (guess[i] === answer[i]) {
      result[i] = "correct";
      answerArray[i] = null;
    }
  }

  // Marcar amarelos
  for (let i = 0; i < 5; i++) {
    if (result[i] !== "correct" && answerArray.includes(guess[i])) {
      result[i] = "present";
      answerArray[answerArray.indexOf(guess[i])] = null;
    }
  }

  for (let i = 0; i < 5; i++) {
    grid[currentRow][i].classList.add(result[i]);
  }

  if (guess === answer) {
    showMessage("Parabéns! Você acertou!");
    isGameOver = true;
  } else if (currentRow === 5) {
    showMessage(`Fim de jogo! A palavra era: ${answer.toUpperCase()}`);
    isGameOver = true;
  } else {
    currentRow++;
    currentCol = 0;
  }
}

function showMessage(msg) {
  message.textContent = msg;
}
