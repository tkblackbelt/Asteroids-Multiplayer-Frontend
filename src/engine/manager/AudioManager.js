import '../../static/audio/blaster.wav';
import '../../static/audio/asteroid_explosion.wav';

const GAME_SOUNDS_SOURCES = {
    blaster: {path: 'audio/blaster.wav', volume: .1},
    asteroid_explosion: {path: 'audio/asteroid_explosion.wav', volume: .2},
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