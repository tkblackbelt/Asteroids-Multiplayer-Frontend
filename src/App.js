import React from 'react';
import Game from "./components/Game/Game";
import WindowManager from "./engine/manager/WindowManager";
import MainMenu from "./components/MainMenu/MainMenu";
import Canvas from "./components/Canvas";

import './App.css';
import InputManager from "./engine/manager/InputManager";
import {connect} from "react-redux";
import {Screens} from "./store/actions.ui";
import {loadAudioSources, playBackgroundMusic} from "./engine/manager/AudioManager";

class App extends React.Component {

    componentDidMount(): void {
        loadAudioSources();
        // playBackgroundMusic();
    }

    getScreen = (screen) => {
        switch (screen) {
            case Screens.MAIN_MENU:
                return <MainMenu/>;
            case Screens.GAME:
                return <InputManager>
                    <Game/>
                </InputManager>;
            default:
                return null
        }
    };

    render() {
        const {screen, fps} = this.props;
        return (
            <WindowManager>
                <Canvas fps={fps} >
                    {this.getScreen(screen)}
                </Canvas>
            </WindowManager>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        screen: state.screen,
        fps: state.fps
    }
};

export default connect(mapStateToProps, null)(App);