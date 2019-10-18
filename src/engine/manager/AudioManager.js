import '../../static/audio/blaster.wav';
import '../../static/audio/asteroid_explosion.wav';
import '../../static/audio/background.wav';

const GAME_SOUNDS_SOURCES = {
    blaster: {path: 'audio/blaster.wav', volume: .1},
    asteroid_explosion: {path: 'audio/asteroid_explosion.wav', volume: .2},
    background: {path: 'audio/background.wav', volume: 0}
};

const LOADED_SOUNDS = {};

export function loadAudioSources() {
    Object.keys(GAME_SOUNDS_SOURCES).forEach(source => {
        LOADED_SOUNDS[source] = new Audio(GAME_SOUNDS_SOURCES[source].path);
    });
    console.log("AUDIO LOADED", LOADED_SOUNDS);
}

export function playBlaster() {
    playSound('blaster');
}

export function playAsteroidExplosion() {
    playSound('asteroid_explosion');
}

export function playBackgroundMusic() {
    const aCtx = new AudioContext();

    const gainNode = aCtx.createGain();
    gainNode.gain.value = 0.0; // setting it to 10%
    gainNode.connect(aCtx.destination);

    let source = aCtx.createBufferSource();
    let buf;
    fetch('/audio/background.wav') // can be XHR as well
        .then(resp => resp.arrayBuffer())
        .then(buf => aCtx.decodeAudioData(buf)) // can be callback as well
        .then(decoded => {
            source.buffer = buf = decoded;
            source.loop = true;
            source.connect(gainNode);
        });
    source.start(0);
}

function playSound(sound_source) {
    const source = GAME_SOUNDS_SOURCES[sound_source];
    const sound = LOADED_SOUNDS[sound_source];

    if (sound) {
        const audio = sound.cloneNode();
        audio.volume = source.volume;
        audio.play();
    } else {
        console.error(sound_source, "not loaded");
    }
}