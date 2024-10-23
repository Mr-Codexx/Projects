// Currency data (for demo purposes)
const currencies = {
    "USD": "United States Dollar",
    "EUR": "Euro",
    "GBP": "British Pound Sterling",
    "INR": "Indian Rupee",
    "JPY": "Japanese Yen",
    // Add more currencies as needed
};

// Populate currency dropdowns
const fromCurrencySelect = document.getElementById("from-currency");
const toCurrencySelect = document.getElementById("to-currency");

for (const [code, name] of Object.entries(currencies)) {
    const optionFrom = document.createElement("option");
    optionFrom.value = code;
    optionFrom.textContent = name;
    fromCurrencySelect.appendChild(optionFrom);

    const optionTo = document.createElement("option");
    optionTo.value = code;
    optionTo.textContent = name;
    toCurrencySelect.appendChild(optionTo);
}

// Handle form submission
document.getElementById("converter-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    // Fetch conversion rate (for demo, we'll use static rates)
    const conversionRates = {
        "USD": { "EUR": 0.85, "GBP": 0.75, "INR": 73.57, "JPY": 109.64 },
        "EUR": { "USD": 1.18, "GBP": 0.88, "INR": 86.53, "JPY": 129.88 },
        // Add more rates as needed
    };

    let convertedAmount = amount;

    if (fromCurrency !== toCurrency) {
        convertedAmount = amount * (conversionRates[fromCurrency][toCurrency] || 1);
    }

    document.getElementById("result").textContent = `Converted Amount: ${convertedAmount.toFixed(2)} ${toCurrency}`;
});
