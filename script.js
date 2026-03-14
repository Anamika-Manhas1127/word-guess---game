const words = ["apple", "house", "train", "plant", "table", "chair", "water"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let attemptsLeft = 6;

const wordDisplay = document.getElementById("wordDisplay");
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const message = document.getElementById("message");
const attempts = document.getElementById("attempts");
const fontSelect = document.getElementById("fontSelect");

function setFontPreference(fontKey) {
    document.body.classList.remove("font-orbitron", "font-inconsolata", "font-josefin");
    if (fontKey) {
        document.body.classList.add(`font-${fontKey}`);
        localStorage.setItem("preferredFont", fontKey);
    }
}

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

function setMessage(text, type = "") {
    message.textContent = text;
    message.classList.remove("error", "success");
    if (type) {
        message.classList.add(type);
    }
    // small pulse for feedback
    animate(message, "pulse");
}

function animate(el, className, duration = 400) {
    if (!el) return;
    el.classList.add(className);
    setTimeout(() => el.classList.remove(className), duration);
}

function checkGameStatus() {
    if (!wordDisplay.textContent.includes("_")) {
        setMessage("Congratulations! You guessed the word.", "success");
        animate(wordDisplay, "pulse");
        guessBtn.disabled = true;
        guessInput.disabled = true;
    } else if (attemptsLeft === 0) {
        setMessage(`Game Over! The word was: ${selectedWord}`, "error");
        animate(wordDisplay, "shake");
        guessBtn.disabled = true;
        guessInput.disabled = true;
    }
}

// apply preferred font selection (persists between sessions)
const storedFont = localStorage.getItem("preferredFont");
setFontPreference(storedFont || "orbitron");
if (fontSelect) {
    fontSelect.value = storedFont || "orbitron";
    fontSelect.addEventListener("change", (e) => setFontPreference(e.target.value));
}

updateWordDisplay();
attempts.textContent = `Attempts left: ${attemptsLeft}`;

function handleGuess() {
    const guess = guessInput.value.toLowerCase();
    setMessage("");

    if (!guess || guess.length !== 1 || !/[a-z]/.test(guess)) {
        setMessage("Please enter a valid letter.", "error");
        animate(guessInput, "shake");
        guessInput.value = "";
        guessInput.focus();
        return;
    }

    if (guessedLetters.includes(guess)) {
        setMessage("You already guessed that letter.", "error");
        animate(guessInput, "shake");
        guessInput.value = "";
        guessInput.focus();
        return;
    }

    guessedLetters.push(guess);

    if (!selectedWord.includes(guess)) {
        attemptsLeft--;
        animate(wordDisplay, "shake");
        setMessage("Wrong guess. Try again.", "error");
    } else {
        animate(wordDisplay, "pulse");
    }

    updateWordDisplay();
    attempts.textContent = `Attempts left: ${attemptsLeft}`;
    checkGameStatus();

    guessInput.value = "";
    guessInput.focus();
}

guessBtn.addEventListener("click", handleGuess);

guessInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        handleGuess();
    }
});
