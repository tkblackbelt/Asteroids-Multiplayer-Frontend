import React from 'react';
import GameUI from "./components/Game/GameUI";
import WindowManager from "./engine/manager/WindowManager";
import MainMenu from "./components/MainMenu/MainMenu";
import Canvas from "./components/Canvas";

import './App.css';
import InputManager from "./engine/manager/InputManager";
import { connect } from "react-redux";
import { Screens } from "./store/actions.ui";
import { loadAudioSources, playBackgroundMusic } from "./engine/manager/AudioManager";
import Game, { GameConfigT } from './engine/Game';
import NetworkGame from './engine/NetworkGame';

class App extends React.Component {

    componentDidMount(): void {
        loadAudioSources();
        // playBackgroundMusic();
    }

    getScreen = (screen) => {
        switch (screen) {
            case Screens.MAIN_MENU:
                return <MainMenu />;
            case Screens.GAME:
                return <InputManager>
                    <GameUI game={this.getGame()} />
                </InputManager>;
            case Screens.MULTIPLAYER_GAME:
                return <InputManager>
                    <GameUI game={this.getGame()} />
                </InputManager>
            default:
                return null
        }
    };

    getGame = () => {
        const gameConfig: GameConfigT = {
            numberOfStars: 100,
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            baseScore: 50,
            variableScoreMin: 1,
            variableScoreMax: 50,
            maxLives: 3
        }

        const { multiPlayer } = this.props;

        return new NetworkGame(gameConfig, 'http://localhost:5000', '', multiPlayer.playerName);
    }

    render() {
        const { screen, fps } = this.props;
        return (
            <WindowManager>
                <Canvas fps={fps}>
                    {this.getScreen(screen)}
                </Canvas>
            </WindowManager>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        screen: state.screen,
        fps: state.fps,
        multiPlayer: state.multiPlayer
    }
};

export default connect(mapStateToProps, null)(App);