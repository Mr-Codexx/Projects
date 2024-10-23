const countdownDisplay = document.getElementById("countdown");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const datetimeInput = document.getElementById("datetime");

let countdownInterval;

startButton.addEventListener("click", function() {
    const endTime = new Date(datetimeInput.value).getTime();

    if (isNaN(endTime)) {
        alert("Please select a valid date and time.");
        return;
    }

    clearInterval(countdownInterval); // Clear any existing countdown

    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;

        // Time calculations for hours, minutes and seconds
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the countdown element
        countdownDisplay.innerHTML = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        // If the countdown is finished, display a message
        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownDisplay.innerHTML = "TIME'S UP!";
        }
    }, 1000);
});

resetButton.addEventListener("click", function() {
    clearInterval(countdownInterval);
    countdownDisplay.innerHTML = "00:00:00";
    datetimeInput.value = "";
});
