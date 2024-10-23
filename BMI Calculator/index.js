document.getElementById("bmiForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get weight and height values
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value) / 100; // Convert cm to meters

    // Calculate BMI
    const bmi = weight / (height * height);
    displayResult(bmi);
});

function displayResult(bmi) {
    const resultDiv = document.getElementById("result");
    let classification = "";

    // Determine BMI classification
    if (bmi < 18.5) {
        classification = "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        classification = "Normal weight";
    } else if (bmi >= 25 && bmi < 29.9) {
        classification = "Overweight";
    } else {
        classification = "Obesity";
    }

    // Display result
    resultDiv.innerHTML = `
        <div class="alert alert-info" role="alert">
            Your BMI is <strong>${bmi.toFixed(2)}</strong>, which is classified as <strong>${classification}</strong>.
        </div>
    `;
}
