const lettersContainer = document.getElementById('letters-container');
const timeDisplay = document.getElementById('time');
const resetButton = document.getElementById('reset-button');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const popup = document.getElementById('popup');

let timer;
let timeLeft = 40;
let isPaused = false;
let gameStarted = false;

// Función para crear las letras del abecedario
function createLetters() {
    lettersContainer.innerHTML = ''; // Limpia las letras actuales
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    alphabet.split('').forEach(letter => {
        const letterButton = document.createElement('button');
        letterButton.classList.add('letter');
        letterButton.textContent = letter;
        letterButton.onclick = () => removeLetter(letterButton);
        lettersContainer.appendChild(letterButton);
    });
}

// Función para iniciar el temporizador
function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            timeDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                showPopup();
                disableButtons();
            }
        }
    }, 1000);
}

// Función para pausar el temporizador
function pauseTimer() {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? "Reanudar" : "Pausa";
}

// Función para eliminar una letra y reiniciar el temporizador
function removeLetter(button) {
    if (gameStarted && !isPaused) {
        button.style.display = 'none'; // Ocultar la letra
        timeLeft = 40; // Reiniciar el tiempo
        timeDisplay.textContent = timeLeft;
        startTimer(); // Reiniciar el temporizador
    }
}

// Función para iniciar el juego
function startGame() {
    popup.classList.add("popup-hidden"); // Ocultar el popup si está visible
    timeLeft = 40; // Reiniciar el tiempo
    timeDisplay.textContent = timeLeft;
    gameStarted = true;
    startButton.style.display = 'none'; // Ocultar el botón "Iniciar Juego"
    pauseButton.disabled = false;
    resetButton.disabled = false;
    createLetters();
    startTimer();
}

// Función para reiniciar el juego
function resetGame() {
    clearInterval(timer);
    timeLeft = 40;
    timeDisplay.textContent = timeLeft;
    isPaused = false;
    gameStarted = true;
    pauseButton.textContent = "Pausa";
    createLetters();
    startTimer();
}

// Función para deshabilitar botones cuando termina el juego
function disableButtons() {
    resetButton.disabled = true;
    pauseButton.disabled = true;
    gameStarted = false;
}

// Función para mostrar el popup de "Perdiste"
function showPopup() {
    popup.classList.remove("popup-hidden");
    popup.classList.add("popup-visible");
}

// Función para cerrar el popup manualmente
function closePopup() {
    popup.classList.remove("popup-visible");
    popup.classList.add("popup-hidden");
}

// Añadir eventos de clic a los botones
startButton.addEventListener('click', startGame);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetGame);
