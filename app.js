class TextToSpeech {
    constructor() {
        this.textarea = document.querySelector("#textarea");
        this.voiceSelect = document.querySelector("#voice");
        this.pitch = document.querySelector("#pitch");
        this.rate = document.querySelector("#rate");
        this.volume = document.querySelector("#volume");
        this.speak = document.querySelector("#speak");
        this.stop = document.querySelector("#stop");


        this.init();
    }

    init() {
        this.addListeners();
        this.getVoices();
    }

    addListeners() {
        this.speak.addEventListener("click", this.speakText);
        this.stop.addEventListener("click", this.stopText);
        window.speechSynthesis.onvoiceschanged = this.getVoices;
    }

    speakText = () => {
        window.speechSynthesis.cancel();

        const text = this.textarea.value;
        const msg = new SpeechSynthesisUtterance();
        msg.text = text;
        msg.voice = window.speechSynthesis.getVoices()
            .find(voice => voice.name === this.voiceSelect.value);
        msg.pitch = this.pitch.value;
        msg.rate = this.rate.value;
        msg.volume = this.volume.value;

        window.speechSynthesis.speak(msg);

    }

    stopText = () => {
window.speechSynthesis.cancel();
    }

    getVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        this.voiceSelect.innerHTML = voices
            .filter(voice => this.isLangAllowed(voice))
            .map(voice => {
                return `<option value="${voice.name}"> ${voice.name} - ${voice.lang} </option>`;
            })
            .join("");
    };

    isLangAllowed = (langToCheck) => {
        const allowedLanguages = ["pl", "en", "de", "es", "fr", "in"];
        return allowedLanguages.some((allowedLang) =>
            langToCheck.lang.includes(allowedLang)
    );
    };
}

const textToSpeech = new TextToSpeech();
