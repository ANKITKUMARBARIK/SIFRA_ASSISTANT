const btn = document.querySelector('#btn');
const content = document.querySelector('#content');
const voice = document.querySelector('#voice');

function speak(text) {
    let textSpeak = new SpeechSynthesisUtterance(text);
    textSpeak.pitch = 1;
    textSpeak.rate = 1;
    textSpeak.volume = 1;
    textSpeak.lang = "hi-IN";
    window.speechSynthesis.speak(textSpeak);
}

function wishMe() {
    let day = new Date();
    if (day.getHours() >= 0 && day.getHours() < 12) {
        speak('GOOD MORNING SIR');
    } else if (day.getHours() >= 12 && day.getHours() < 16) {
        speak('GOOD AFTERNOON SIR');
    } else {
        speak('GOOD EVENING SIR');
    }
}

window.addEventListener('load', () => {
    wishMe();
});

let speech = window.speechRecognition || window.webkitSpeechRecognition;
let recognition = new speech();

recognition.onresult = (e) => {
    let currentIndex = e.resultIndex;
    let transcript = e.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    recognition.start();
    btn.style.display = 'none';
    voice.style.display = 'block';
});

function takeCommand(message) {
    btn.style.display = 'flex';
    voice.style.display = 'none';

    if (message.includes('hello') || message.includes('hey')) {
        speak('HELLO JI, WHAT CAN I HELP YOU WITH?');
    } else if (message.includes('who are you')) {
        speak('I AM SIFRA, CREATED BY ANKIT JI');
    } else if (message.includes('open youtube')) {
        speak('OPENING YOUTUBE');
        window.open('https://www.youtube.com');
    } else if (message.includes('open google')) {
        speak('OPENING GOOGLE');
        window.open('https://www.google.com');
    } else if (message.includes('open facebook')) {
        speak('OPENING FACEBOOK');
        window.open('https://www.facebook.com');
    } else if (message.includes('open instagram')) {
        speak('OPENING INSTAGRAM');
        window.open('https://www.instagram.com');
    } else if (message.includes('open calculator')) {
        speak('OPENING CALCULATOR');
        window.open('calculator://');
    } else if (message.includes('open whatsapp')) {
        speak('OPENING WHATSAPP');
        window.open('whatsapp://');
    } else if (message.includes('time')) {
        let time = new Date().toLocaleString(undefined, { hour: 'numeric', minute: 'numeric' });
        speak(time);
    } else if (message.includes('date')) {
        let date = new Date().toLocaleString(undefined, { day: 'numeric', month: 'short' });
        speak(date);
    } else {
        let cleanedMessage = message.replace(/SIFRA|SIPRA/g, '').trim();
        let finalText = `THIS IS WHAT I FOUND ON THE INTERNET REGARDING: ${cleanedMessage}`;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(cleanedMessage)}`, '_blank');
    }
}
