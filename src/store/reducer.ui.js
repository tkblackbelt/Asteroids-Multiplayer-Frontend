import {
    Screens,
    SET_SCREEN,
    START_MULTIPLAYER,
    JOIN_MULTIPLAYER_GAMEROOM
} from "./actions.ui";

const initialState = {
    screen: Screens.MAIN_MENU,
    multiPlayer: {
        playerName: "",
        playerID: null,
        waitingForGame: true,
        gameID: null
    },
    fps: 60
};


export function AsteroidsGame(state = initialState, action) {
    switch (action.type) {
        case SET_SCREEN:
            return {
                ...state,
                screen: action.payload,
            };
        case START_MULTIPLAYER:
            // return {
            //     ...state,
            //     screen: action.payload.screen,
            //     multiPlayer: {
            //         ...state.multiPlayer,
            //         playerName: action.payload.playerName,
            //         playerID: action.payload.playerName,
            //         waitingForGame: true
            //     }
            // };
            return {
                ...state,
                screen: action.payload.screen,
                multiPlayer: {
                    playerName: action.payload.playerName,
                    playerID: action.payload.playerID,
                    waitingForGame: true,
                    gameID: null
                }
            }
        case JOIN_MULTIPLAYER_GAMEROOM:
            // return state;
            return {
                ...state,
                multiPlayer: {
                    ...state.multiPlayer,
                    gameID: action.payload.gameID,
                    waitingForGame: false
                }
            }
        default:
            return state;
    }
}