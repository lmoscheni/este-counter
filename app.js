const recordButton = document.getElementById("record");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const speechRecognition = new SpeechRecognition();

speechRecognition.onstart = function() {
    recordButton.className += " --recording"
    console.info("voice recording activated");
};

speechRecognition.onresult = function(event) {
    const counter = document.getElementById("counter");
    const lastSpeech = document.getElementById("lastSpeech");
    let words = {
        "este": parseInt(counter.textContent),
        "esté": 0,
        "éste": 0
    };

    console.log("words", words);

    const currentSpeech = event.resultIndex;
    const transcription = event.results[currentSpeech][0].transcript;

    transcription.toLowerCase().split(" ").forEach(word => {
        console.log("word: ", word);
        if (!!words[word]) {
            words[word] = words[word] + 1;
        } else {
            words[word] = 1;
        }
    });

    console.log("updated words", words);

    counter.textContent = `${words["este"] + words["esté"] + words["éste"]}`;
    lastSpeech.textContent = transcription;
};

speechRecognition.onend = function() {
    recordButton.className = "recordContainer";
    console.info("stop voice recording");
}


recordButton.addEventListener("click", () => {
    if (recordButton.className.includes("--recording")) {
        recordButton.className = "recordContainer";
        speechRecognition.stop();
    } else {
        speechRecognition.start();
    }
});