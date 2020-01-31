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
    screen: Screens.GAME,
    highScores: {
        open: false,
        scores: [
            {user: 'Bob', score: 99999},
            {user: 'Jim', score: 88888},
            {user: 'Chuck', score: 10000},
        ]
    },
    fps: 60
};


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
        case OPEN_HIGH_SCORES:
            return updateHighScores(state, {open: true});
        case CLOSE_HIGH_SCORES:
            return updateHighScores(state, {open: false});
        default:
            return state;
    }
}