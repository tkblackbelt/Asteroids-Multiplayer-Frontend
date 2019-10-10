import {Screens, SET_SCREEN, SET_LIVES, SET_SCORE, ADJUST_LIVES, ADJUST_SCORE} from "./actions.ui";

const initialState = {
    screen: Screens.MAIN_MENU,
    gameState: {
        score: 0,
        lives: 3
    },
    fps: 60
};

function updateGameState(state, changes) {
    return {
        ...state,
        gameState: {
            ...state.gameState,
            ...changes
        }
    }
}

export function AsteroidsGame(state = initialState, action) {
    switch (action.type) {
        case SET_SCREEN:
            return {
                ...state,
                screen: action.payload
            };
        case SET_LIVES:
            return updateGameState(state, {lives: action.payload});
        case ADJUST_LIVES:
            return updateGameState(state, {lives: state.gameState.lives + action.payload});
        case SET_SCORE:
            return updateGameState(state, {score: action.payload});
        case ADJUST_SCORE:
            return updateGameState(state, {score: state.gameState.score + action.payload});
        default:
            return state;
    }
}