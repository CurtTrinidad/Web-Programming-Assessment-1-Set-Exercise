const samples = [

    // Page 1 of sound samples
    { title: "Ah-Ha", file: "audio/ahha.mp3" },
    { title: "Back of the Net", file: "audio/backofthenet.mp3" },
    { title: "Bang Out of Order", file: "audio/bangoutoforder.mp3" },
    { title: "Dan", file: "audio/dan.mp3" },
    { title: "Email of the Evening", file: "audio/emailoftheevening.mp3" },
    { title: "Hello Partridge", file: "audio/hellopartridge.mp3" },
    { title: "I Ate a Scotch Egg", file: "audio/iateascotchegg.mp3" },
    { title: "I'm Confused", file: "audio/imconfused.mp3" },
    { title: "Rawr", file: "audio/rawr.wav" },

    // Page 2 of sound samples
    { title: "Kawaii", file: "audio/kawai.mp3" },
    { title: "Charge", file: "audio/charge.mp3" },
    { title: "Yada Yada", file: "audio/yada.mp3" },
    { title: "Onii Chan", file: "audio/oniichan.mp3" },
    { title: "Gate Opening", file: "audio/gate.mp3" },
    { title: "Whoosh 1", file: "audio/whoosh1.mp3" },
    { title: "Whoosh 2", file: "audio/whoosh2.mp3" },
    { title: "Ara Ara", file: "audio/araara.mp3" },
    { title: "Shine", file: "audio/shine.mp3" },

    // Page 3 of sound samples
    { title: "Fall", file: "audio/cartoon_fall.mp3" },
    { title: "Punch", file: "audio/cartoon_punch.mp3" },
    { title: "Phone Voice", file: "audio/cartoon_phone.mp3" },
    { title: "Scream", file: "audio/cartoon_scream.mp3" },
    { title: "Violin Fail", file: "audio/cartoon_violin.mp3" },
    { title: "Eating", file: "audio/cartoon_eating.mp3" },
    { title: "Splat", file: "audio/cartoon_splat.mp3" },
    { title: "Explosion", file: "audio/cartoon_explosion.mp3" },
    { title: "Blink", file: "audio/cartoon_blink.mp3" },

];

// Limits the soundboard to 9 samples per page
const samplesPerPage = 9;
// Keeps track of the current sample page
let currentPage = 0;

const soundboard = document.getElementById("sb"); // Selects the soundboard container
const leftArrow = document.getElementById("leftArrow"); // Selects the left arrow button
const rightArrow = document.getElementById("rightArrow"); // Selects the right arrow button
const speakBtn = document.getElementById("speakBtn"); // Selects the text to speech button
const ttsInput = document.getElementById("ttsInput"); // Selects the text area input

function renderSamples() {
    soundboard.innerHTML = ""; // Clears the current samples before showing the new page

    const start = currentPage * samplesPerPage; // Finds the starting index for the current page
    const end = start + samplesPerPage; // Finds the ending index for the current page
    const currentSamples = samples.slice(start,end); // Gets only the samples for the current page

    currentSamples.forEach((sample) => {
        const card = document.createElement("div");
        card.className = "s-card"; // Creates a card for each sample

        const button = document.createElement("button");
        button.className = "s-btn";
        button.textContent = sample.title; // Displays the sample title on the button

        const durationText = document.createElement("div");
        durationText.className = "duration";
        durationText.textContent = "Loading..."; // Temporary text shown before the duration loads

        const audio = new Audio(sample.file); // Creates an audio object for reading the file metadata

        audio.addEventListener("loadedmetadata", () => {
            const minutes = Math.floor(audio.duration / 60);
            const seconds = Math.floor(audio.duration % 60)
                .toString()
                .padStart(2, "0");

            durationText.textContent = minutes + ":" + seconds; // Displays the sample length in minutes and seconds
        });
    
        audio.addEventListener("error", () => {
            durationText.textContent = "N/A"; // Shows N/A if the audio file cannot be loaded
        });

        button.addEventListener("click", () => {
            const playAudio = new Audio(sample.file);
            playAudio.play(); // Plays the selected sample when clicked
        });

        card.appendChild(button);
        card.appendChild(durationText);
        soundboard.appendChild(card); // Adds the button and duration into the soundboard
    });

    updateArrows(); // Updates which arrows should be visible

}

function updateArrows() {
    const totalPages = Math.ceil(samples.length / samplesPerPage); // Calculates the total number of pages

    if (currentPage === 0) {
        leftArrow.style.display = "none"; // Hides the left arrow on the first page
    } else {
        leftArrow.style.display = "inline-block";
    }

    if (currentPage === totalPages - 1) {
        rightArrow.style.display = "none"; // Hides the right arrow on the last page
    } else {
        rightArrow.style.display = "inline-block";
    }
}

leftArrow.addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        renderSamples(); // Goes to the previous page of samples
    }
});

rightArrow.addEventListener("click", () => {
    const totalPages = Math.ceil(samples.length / samplesPerPage);

    if (currentPage < totalPages - 1) {
        currentPage++;
        renderSamples(); // Goes to the next page of samples
    }
});

speakBtn.addEventListener("click", () => {
    const text = ttsInput.value.trim(); // Gets the typed text and removes extra spaces

    if (text === "") {
        alert("Please type something first.");
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text); // Creates a speech object from the typed text
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    speechSynthesis.cancel(); // Stops any current speech before playing a new one
    speechSynthesis.speak(utterance); // Speaks the typed text out loud

});

renderSamples(); // Displays the first page of samples when the page loads
