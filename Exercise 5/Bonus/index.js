// Selects all sample buttons
const buttons = document.querySelectorAll('.sample');

buttons.forEach(function(button) {
    // Adds a click event to each button
    button.addEventListener('click', function() {
        // Gets the matching sound ID from the button
        const soundId = button.getAttribute('data-sound');
        // Finds the audio element by the ID
        const audio = document.getElementById(soundId);

        // Restarts the audio from the beginning to each time
        audio.currentTime = 0;
        // Plays the selected sound
        audio.play();
    });
});
