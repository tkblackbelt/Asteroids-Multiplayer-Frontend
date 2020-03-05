import React from 'react';
import GameUI from "./components/Game/GameUI";
import WindowManager from "./engine/manager/WindowManager";
import MainMenu from "./components/MainMenu/MainMenu";
import Canvas from "./components/Canvas";

import './App.css';
import InputManager from "./engine/manager/InputManager";
import { connect } from "react-redux";
import { Screens } from "./store/actions.ui";
import { loadAudioSources } from "./engine/manager/AudioManager";
import NetworkGameUI from './components/Game/NetworkGameUI';
import NetworkGame from './engine/NetworkGame';
import Game from './engine/Game';

class App extends React.Component {

    componentDidMount(): void {
        loadAudioSources();
    }

    getScreen = (screen) => {
        // const s = new NetworkGame('GameServerApplicationLB-1541062293.ca-central-1.elb.amazonaws.com/socket');
        // s.joinGame('123', '123', '123');
        switch (screen) {
            case Screens.MAIN_MENU:
                return <MainMenu />;
            case Screens.GAME:
                const game = new Game({
                    numberOfStars: 100,
                    screenWidth: window.innerWidth,
                    screenHeight: window.innerHeight,
                    baseScore: 100,
                    variableScoreMin: 1,
                    variableScoreMax: 50,
                    maxLives: 3
                });

                return <InputManager>
                    <GameUI game={game} />
                </InputManager>;
            case Screens.MULTIPLAYER_GAME:
                return <InputManager>
                    <NetworkGameUI />
                </InputManager>
            default:
                return null
        }
    };

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
    }
};

export default connect(mapStateToProps, null)(App);