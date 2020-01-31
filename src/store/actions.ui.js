export const SET_SCREEN = 'SET_SCREEN';
export const OPEN_HIGH_SCORES = 'OPEN_HIGH_SCORES';
export const CLOSE_HIGH_SCORES = 'CLOSE_HIGH_SCORES';

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

export function openHighScores() {
    return {
        type: OPEN_HIGH_SCORES
    };
}

export function closeHighScores() {
    return {
        type: CLOSE_HIGH_SCORES
    };
}