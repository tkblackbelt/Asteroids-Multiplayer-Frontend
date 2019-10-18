export const SET_SCREEN = 'SET_SCREEN';
export const ADJUST_SCORE = 'ADJUST_SCORE';
export const ADJUST_LIVES = 'ADJUST_LIVES';
export const NEXT_LEVEL = 'NEXT_LEVEL';
export const RESET_GAME = 'RESET_GAME';

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

export function startMainMenu() {
    return {
        type: SET_SCREEN,
        payload: Screens.MAIN_MENU
    };
}

export function adjustScore(delta: Number) {
    return {
        type: ADJUST_SCORE,
        payload: delta
    };
}

export function removeLife() {
    return adjustLives(-1);
}

export function adjustLives(delta: Number) {
    return {
        type: ADJUST_LIVES,
        payload: delta
    }
}

export function nextLevel() {
    return {
        type: NEXT_LEVEL
    }
}

export function resetGame() {
    return {
        type: RESET_GAME
    }
}