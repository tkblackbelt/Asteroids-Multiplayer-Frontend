export const SET_SCREEN = 'SET_SCREEN';

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