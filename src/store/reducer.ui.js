import {
    ADJUST_LIVES,
    ADJUST_SCORE,
    CLOSE_HIGH_SCORES,
    NEXT_LEVEL,
    OPEN_HIGH_SCORES,
    RESET_GAME,
    Screens,
    SET_SCREEN
} from "./actions.ui";

const initialState = {
    screen: Screens.MAIN_MENU,
    highScores: {
        open: false,
        scores: [
            {user: 'Bob', score: 99999},
            {user: 'Jim', score: 88888},
            {user: 'Chuck', score: 10000},
        ]
    },
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

function updateHighScores(state, changes) {
    return {
        ...state,
        highScores: {
            ...state.highScores,
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
        case OPEN_HIGH_SCORES:
            return updateHighScores(state, {open: true});
        case CLOSE_HIGH_SCORES:
            return updateHighScores(state, {open: false});
        default:
            return state;
    }
}