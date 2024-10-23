let is24HourFormat = true;

function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    if (!is24HourFormat) {
        // Convert to 12-hour format
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
        clockElement.innerText = `${hours}:${minutes}:${seconds} ${period}`;
    } else {
        clockElement.innerText = `${String(hours).padStart(2, '0')}:${minutes}:${seconds}`;
    }
}

// Toggle between 12-hour and 24-hour format
document.getElementById('toggleFormat').addEventListener('click', () => {
    is24HourFormat = !is24HourFormat;
});

// Start the clock
setInterval(updateClock, 1000);
updateClock(); // Initialize immediately
