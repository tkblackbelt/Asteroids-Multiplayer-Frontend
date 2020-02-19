import {
    CLOSE_HIGH_SCORES,
    OPEN_HIGH_SCORES,
    Screens,
    SET_SCREEN,
    START_MULTIPLAYER
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
    multiPlayer: {
        playerName: ""
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
            };
        case START_MULTIPLAYER:
            return {
                ...state,
                screen: action.payload.screen,
                multiPlayer: {
                    playerName: action.payload.playerName
                }
            }
        case OPEN_HIGH_SCORES:
            return updateHighScores(state, {open: true});
        case CLOSE_HIGH_SCORES:
            return updateHighScores(state, {open: false});
        default:
            return state;
    }
}