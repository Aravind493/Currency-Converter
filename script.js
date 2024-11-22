// Include API for currency exchange
const api = "https://api.exchangerate-api.com/v4/latest/USD";

// Selecting different controls
var search = document.querySelector(".searchBox");
var convert = document.querySelector(".convert");
var fromCurrency = document.querySelector(".from");
var toCurrency = document.querySelector(".to");
var finalValue = document.querySelector(".finalValue");
var finalAmount = document.getElementById("finalAmount");

var resultFrom = "USD"; // Default value
var resultTo = "USD"; // Default value
var searchValue = 1; // Default value

// Event when currency is changed
fromCurrency.addEventListener("change", (event) => {
    resultFrom = event.target.value;
});

// Event when currency is changed
toCurrency.addEventListener("change", (event) => {
    resultTo = event.target.value;
});

// Event when input value is updated
search.addEventListener("input", updateValue);

// Function for updating input value
function updateValue(e) {
    searchValue = parseFloat(e.target.value) || 1; // Ensure it's a number, default to 1
}

// When user clicks, it calls the getResults function
convert.addEventListener("click", getResults);

// Function to fetch API and calculate conversion
function getResults() {
    fetch(api)
        .then((response) => response.json())
        .then((currency) => {
            displayResults(currency);
        })
        .catch((error) => {
            alert("Error fetching currency data: " + error.message);
        });
}

// Display results after conversion
function displayResults(currency) {
    if (!resultFrom || !resultTo || isNaN(searchValue)) {
        alert("Please enter valid data for conversion.");
        return;
    }

    let fromRate = currency.rates[resultFrom];
    let toRate = currency.rates[resultTo];

    if (!fromRate || !toRate) {
        alert("Invalid currency codes selected.");
        return;
    }

    finalValue.innerHTML = ((toRate / fromRate) * searchValue).toFixed(2);
    finalAmount.style.display = "block";
}

// When the user clicks on the reset button
function clearVal() {
    search.value = ""; // Clear input field
    finalValue.innerHTML = ""; // Clear conversion result
    finalAmount.style.display = "none"; // Hide result section
    fromCurrency.value = "USD"; // Reset default currencies
    toCurrency.value = "USD";
    searchValue = 1;
}
