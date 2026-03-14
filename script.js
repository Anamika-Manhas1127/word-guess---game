const words = ["apple", "house", "train", "plant", "table", "chair", "water"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let attemptsLeft = 6;

const wordDisplay = document.getElementById("wordDisplay");
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const message = document.getElementById("message");
const attempts = document.getElementById("attempts");

function updateWordDisplay() {
    let display = "";
    for (let letter of selectedWord) {
        if (guessedLetters.includes(letter)) {
            display += letter + " ";
        } else {
            display += "_ ";
        }
    }
    wordDisplay.textContent = display.trim();
}

function checkGameStatus() {
    if (!wordDisplay.textContent.includes("_")) {
        message.textContent = "Congratulations! You guessed the word.";
        guessBtn.disabled = true;
        guessInput.disabled = true;
    } else if (attemptsLeft === 0) {
        message.textContent = `Game Over! The word was: ${selectedWord}`;
        guessBtn.disabled = true;
        guessInput.disabled = true;
    }
}

updateWordDisplay();
attempts.textContent = `Attempts left: ${attemptsLeft}`;

guessBtn.addEventListener("click", () => {
    const guess = guessInput.value.toLowerCase();
    message.textContent = "";
    if (!guess || guess.length !== 1 || !/[a-z]/.test(guess)) {
        message.textContent = "Please enter a valid letter.";
        guessInput.value = "";
        return;
    }
    if (guessedLetters.includes(guess)) {
        message.textContent = "You already guessed that letter.";
        guessInput.value = "";
        return;
    }
    guessedLetters.push(guess);
    if (!selectedWord.includes(guess)) {
        attemptsLeft--;
    }
    updateWordDisplay();
    attempts.textContent = `Attempts left: ${attemptsLeft}`;
    checkGameStatus();
    guessInput.value = "";
    guessInput.focus();
});

guessInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        guessBtn.click();
    }
});
