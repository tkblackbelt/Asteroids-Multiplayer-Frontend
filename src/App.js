import React from 'react';
import Game from "./components/Game/Game";
import WindowManager from "./engine/manager/WindowManager";
import MainMenu from "./components/MainMenu/MainMenu";
import Canvas from "./components/Canvas";

import './App.css';
import InputManager from "./engine/manager/InputManager";

export default class App extends React.Component {
    render() {
        return (
            <WindowManager>
                <Canvas fps={60}>
                    <MainMenu/>
                    {/*<InputManager>*/}
                    {/*    <Game/>*/}
                    {/*</InputManager>*/}
                </Canvas>
            </WindowManager>
        )
    }
}