const recordButton = document.getElementById("record");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const speechRecognition = new SpeechRecognition();
speechRecognition.lang = "es-AR";

speechRecognition.onstart = function () {
  console.info("voice recording activated");
};

speechRecognition.onresult = function (event) {
  const counter = document.getElementById("counter");
  const lastSpeech = document.getElementById("lastSpeech");
  let words = {
    este: parseInt(counter.textContent),
    esté: 0,
    éste: 0,
  };

  console.log("words", words);

  const currentSpeech = event.resultIndex;
  const transcription = event.results[currentSpeech][0].transcript;

  transcription
    .toLowerCase()
    .split(" ")
    .forEach((word) => {
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

speechRecognition.onend = function () {
  console.info("stop voice recording");
};

recordButton.addEventListener("click", () => {
  if (recordButton.classList.contains("bg-white")) {
    recordButton.classList.replace("bg-white", "bg-amber-500");
    recordButton.textContent = "Grabando..";
    speechRecognition.start();
  } else {
    recordButton.classList.replace("bg-amber-500", "bg-white");
    recordButton.textContent = "Grabar";
    speechRecognition.stop();
  }
});
