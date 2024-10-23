// Function to generate a random color in HEX format
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to determine if a color is light or dark
function isLightColor(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
    return brightness > 186; // Threshold for light color
}

// Function to change the background color and update the color code
function changeColor() {
    const color = getRandomColor(); // Get a random color
    document.body.style.backgroundColor = color; // Change the background color to the new color
    document.getElementById('color').textContent = color; // Update the displayed color code

    // Change button color based on the brightness of the new color
    const button = document.getElementById('btn');
    if (isLightColor(color)) {
        button.classList.remove('btn-primary');
        button.classList.add('btn-dark');
    } else {
        button.classList.remove('btn-dark');
        button.classList.add('btn-primary');
    }
}

// Adding event listener to the button
document.getElementById('btn').addEventListener('click', changeColor);
