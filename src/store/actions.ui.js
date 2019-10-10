export const SET_SCREEN = 'SET_SCREEN';
export const SET_SCORE = 'SET_SCORE';
export const ADJUST_SCORE = 'ADJUST_SCORE';
export const SET_LIVES = 'SET_LIVES';
export const ADJUST_LIVES = 'ADJUST_LIVES';

export const Screens = Object.freeze({
    MAIN_MENU: Symbol("main_menu"),
    GAME: Symbol("game")
});

export function startSinglePlayerGame() {
    return {
        type: SET_SCREEN,
        payload: Screens.GAME
    };
}

export function setScore(score: Number): void {
    return {
        type: SET_SCORE,
        payload: score
    };
}

export function adjustScore(delta: Number): void {
    return {
        type: ADJUST_SCORE,
        payload: delta
    };
}

export function setLives(lives: Number): void {
    return {
        type: SET_LIVES,
        payload: lives
    };
}

export function removeLife(): void {
    return adjustLives(-1);
}

export function addLife() {
    return adjustLives(1);
}

export function adjustLives(delta: Number): void {
    return {
        type: ADJUST_LIVES,
        payload: delta
    }
}