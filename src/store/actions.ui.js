import axios from 'axios'

export const SET_SCREEN = 'SET_SCREEN';
export const START_MULTIPLAYER = 'START_MULTIPLAYER';
export const JOIN_MULTIPLAYER_GAMEROOM = 'JOIN_MULTIPLAYER_ROOM';
export const OPEN_HIGH_SCORES = 'OPEN_HIGH_SCORES';
export const CLOSE_HIGH_SCORES = 'CLOSE_HIGH_SCORES';

const API = 'https://zgn8c4rya7.execute-api.ca-central-1.amazonaws.com/Prod';

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
                    dispatch({
                        type: JOIN_MULTIPLAYER_GAMEROOM,
                        payload: {
                            gameID: response.data.game_id
                        }
                    })
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