// Get all needed elements from the page
const costPerLiterInput = document.getElementById("costPerLiter");
const litersPurchasedInput = document.getElementById("litersPurchased");
const calculateBtn = document.getElementById("calcubtn");
const totalCostText = document.getElementById("totalCost");

// Run calculation when button is clicked
calculateBtn.addEventListener("click", function () {

    // Get values from the inputs
    const costPerLiter = parseFloat(costPerLiterInput.value);
    const litersPurchased = parseFloat(litersPurchasedInput.value);

    // Calculate total petrol cost
    const total = costPerLiter * litersPurchased;

    // Display the result on screen
    totalCostText.textContent = `Total Cost: DHS ${total.toFixed(2)}`;

});
