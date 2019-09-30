import React from 'react';
import Game from "./Game";
import WindowManager from "./engine/manager/WindowManager";
import './App.css';

export default class App extends React.Component {

    state = {
        canvas: null,
        context: null,
    };

    componentDidMount() {
        const canvas = this.refs.canvas;
        this.setState({
            canvas,
            context: canvas.getContext('2d')
        })
    }

    render() {
        const {canvas, context} = this.state;
        return (
            <div>
                <WindowManager>
                    <Game canvas={canvas} context={context}/>
                </WindowManager>
                <canvas ref="canvas">
                    Canvas is not supported by your browser
                </canvas>
            </div>
        )
    }
}