// Get the references from the HTML that is needed for the game
const rgbValueText = document.getElementById("rgbValue");
const colourOptions = document.getElementById("colourOptions");
const messageText = document.getElementById("mess");
const scoreText = document.getElementById("score");
const livesText = document.getElementById("lives");
const restartBtn = document.getElementById("restartBtn");

// The starting score and lives of the player
let score = 0;
let lives = 3;
let gameOver = false;

// This stores the correct answer for the rgb value of the current round
let correctColour = "";

// The total number of colour choices each round
const optionCount = 3;

// Generate a random number from 0 - 255
function randomNumber () {
    return Math.floor(Math.random() * 256);
}

// Creating a random rgb colour string
function generateRandomColour() {
    const r = randomNumber();
    const g = randomNumber();
    const b = randomNumber();
    return `rgb(${r}, ${g}, ${b})`;
}

// Shuffles an array into a random order
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        // swapping the positions
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

// This starts a new round
function startRound() {

    // Stop if the game is over
    if (gameOver) {
        return;
    }

    // Clears the previous buttons
    colourOptions.innerHTML = "";

    // Message of the round reset
    messageText.textContent = "Choose a colour.";

    // Gets the correct colour
    correctColour = generateRandomColour();

    // Shows the rgb text to the player
    rgbValueText.textContent = correctColour;

    // Creates an array to store the answer options
    const options = [correctColour];

    // Adds extra incorrect colours until there are enough options
    while (options.length < optionCount) {
        const newColour = generateRandomColour();

        // Makes it so that it doesn't make the same colour
        if (!options.includes(newColour)) {
            options.push(newColour);
        }
    }

    // Shuffles all the colour options so that the correct one is not always first
    shuffleArray(options);

    // Makes the buttons for each colour
    options.forEach(function (colour) {
        const button = document.createElement("button");
        button.classList.add("colour-btn");
        button.style.backgroundColor = colour;

        // When player chooses a colour, this checks if it is correct
        button.addEventListener("click", function () {
            checkAnswer(colour);
        });

        // Adds a button to the page
        colourOptions.appendChild(button);

    });

}

// Checks whether the selected colour is correct
function checkAnswer(selectedColour) {

    //Does nothing if the game is already over
    if (gameOver) {
        return;
    }
    
    // If the player picks the correct answer
    if (selectedColour === correctColour) {
        score++;
        scoreText.textContent = `Score: ${score}`;
        messageText.textContent = "Correct! New round started.";
        startRound();
    } 
    
    else {

        // If the player picks the wrong answer
        lives--;
        livesText.textContent = `Lives: ${lives}`;

        // If the player loses all his lives, the game ends
        if (lives <= 0) {
            endGame();
        } else {
            messageText.textContent = "Incorrect! Try again.";
        }
    }
}

// Ends the game
function endGame() {
    gameOver = true;
    
    // Removes the colour buttons
    colourOptions.innerHTML = "";

    // Show a game over text
    messageText.textContent = `Game Over! Final Score: ${score}`;

    // Changes the RGB text
    rgbValueText.textContent = "No Lives Left!";

    // Shows the restart button
    restartBtn.style.display = "block";
}

// Restart the game
function restartGame() {
    score = 0;
    lives = 3;
    gameOver = false;

    // Updates the score and lives on the screen
    scoreText.textContent = "Score: 0";
    livesText.textContent = "Lives: 3";

    // Hides the replay button again
    restartBtn.style.display = "none";

    // Starts a new round
    startRound();
}

// Restart button starts the game again
restartBtn.addEventListener("click", function() {
    restartGame();
});

// Starts the first round when the page loads
startRound();
