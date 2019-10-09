import {Screens, SET_SCREEN, START_SINGLE_PLAYER} from "./actions.ui";

const initialState = {
    screen: Screens.MAIN_MENU,
    fps: 60
};

export function AsteroidsGame(state = initialState, action) {
    switch (action.type) {
        case SET_SCREEN:
            return {
                ...state,
                screen: action.payload
            };
        default:
            return state;
    }
}