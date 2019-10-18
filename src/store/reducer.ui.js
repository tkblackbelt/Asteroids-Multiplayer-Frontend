import {Screens, SET_SCREEN, ADJUST_LIVES, ADJUST_SCORE, NEXT_LEVEL, RESET_GAME} from "./actions.ui";

const initialState = {
    screen: Screens.MAIN_MENU,
    gameState: {
        level: 0,
        score: 0,
        lives: 3,
        maxLives: 3,
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
                screen: action.payload,
                gameState: initialState.gameState
            };
        case ADJUST_LIVES:
            return updateGameState(state, {lives: state.gameState.lives + action.payload});
        case ADJUST_SCORE:
            return updateGameState(state, {score: state.gameState.score + action.payload});
        case NEXT_LEVEL:
            return updateGameState(state, {level: state.gameState.level + 1});
        case RESET_GAME:
            return updateGameState(state, initialState.gameState);
        default:
            return state;
    }
}