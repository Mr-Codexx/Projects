const randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

document.getElementById('submitGuess').addEventListener('click', function() {
    const guessInput = document.getElementById('guessInput');
    const guess = Number(guessInput.value);
    const result = document.getElementById('result');
    
    if (!guess || guess < 1 || guess > 100) {
        result.textContent = 'Please enter a number between 1 and 100!';
        return;
    }

    attempts++;
    
    if (guess === randomNumber) {
        result.textContent = `Congratulations! You've guessed the number ${randomNumber} in ${attempts} attempts.`;
        document.getElementById('restartGame').style.display = 'block';
        document.getElementById('submitGuess').disabled = true;
    } else if (guess < randomNumber) {
        result.textContent = 'Too low! Try again.';
    } else {
        result.textContent = 'Too high! Try again.';
    }

    guessInput.value = '';
    guessInput.focus();
});

document.getElementById('restartGame').addEventListener('click', function() {
    attempts = 0;
    randomNumber = Math.floor(Math.random() * 100) + 1;
    result.textContent = '';
    this.style.display = 'none';
    document.getElementById('submitGuess').disabled = false;
    document.getElementById('guessInput').value = '';
    document.getElementById('guessInput').focus();
});
