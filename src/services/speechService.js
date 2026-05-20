let recognition = null;

// Check browser support
const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

// Start listening
export const startListening = (onResult, onEnd) => {

    if (!SpeechRecognition) {
        alert("Speech Recognition not supported in this browser");
        return;
    }

    recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {

        const transcript = event.results[0][0].transcript;
        onResult(transcript);
    };

    recognition.onend = () => {
        if (onEnd) onEnd();
    };

    recognition.start();
};

// Stop listening
export const stopListening = () => {
    if (recognition) {
        recognition.stop();
        recognition = null;
    }
};

// ============================
// TEXT TO SPEECH (VOICE OUTPUT)
// ============================

let speech = null;

// Speak text
export const speakText = (text) => {

    if (!window.speechSynthesis) {
        alert("Speech Synthesis not supported");
        return;
    }

    // Stop previous speech
    window.speechSynthesis.cancel();

    speech = new SpeechSynthesisUtterance(text);

    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;
    speech.lang = "en-US";

    window.speechSynthesis.speak(speech);
};

// Stop speaking
export const stopSpeaking = () => {
    window.speechSynthesis.cancel();
};