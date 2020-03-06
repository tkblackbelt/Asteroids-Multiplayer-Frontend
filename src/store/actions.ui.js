import axios from 'axios'

export const SET_SCREEN = 'SET_SCREEN';
export const START_MULTIPLAYER = 'START_MULTIPLAYER';
export const JOIN_MULTIPLAYER_GAMEROOM = 'JOIN_MULTIPLAYER_ROOM';

const API = API_URL;

export const Screens = Object.freeze({
    MAIN_MENU: Symbol("main_menu"),
    GAME: Symbol("game"),
    MULTIPLAYER_GAME: Symbol('multiplayer_game')
});

export function startSinglePlayerGame() {
    return {
        type: SET_SCREEN,
        payload: Screens.GAME
    };
}

export function checkForGameStart(playerID: String) {
    if (playerID) {
        return (dispatch) => {
            axios.get(`${API}/game/${playerID}`)
                .then(response => {
                    if (response.data.game_id) {
                        dispatch({
                            type: JOIN_MULTIPLAYER_GAMEROOM,
                            payload: {
                                gameID: response.data.game_id
                            }
                        })
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
}

export function startMultiPlayerGame(playerName: String) {

    return (dispatch) => {
        const body = { "name": playerName };
        axios.post(`${API}/game`, body)
            .then(response => {
                dispatch({
                    type: START_MULTIPLAYER,
                    payload: {
                        screen: Screens.MULTIPLAYER_GAME,
                        playerName: playerName,
                        playerID: response.data.player_id
                    }
                })
            })
            .catch(error => {
                alert("Failed to Join Game")
            });
    }
}

export function startMainMenu() {
    return {
        type: SET_SCREEN,
        payload: Screens.MAIN_MENU
    };
}
