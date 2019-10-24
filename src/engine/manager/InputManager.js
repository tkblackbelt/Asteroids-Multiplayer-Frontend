import React from 'react';
import PropTypes from 'prop-types';
import {KEY_A, KEY_D, KEY_SPACE, KEY_W} from "./KeyCode";


export default class InputManager extends React.Component {

    state = {
        left: false,
        right: false,
        forward: false,
        shoot: false
    };

    componentDidMount() {
        window.addEventListener('keydown', this.onKeyPressed);
        window.addEventListener('keyup', this.onKeyReleased);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyPressed);
        window.removeEventListener('keyup', this.onKeyReleased);
    }

    render() {
        return (
            <React.Fragment>
                {React.cloneElement(this.props.children, this.getChildrenProps())}
            </React.Fragment>
        );
    }

    getChildrenProps = () => {
        const props = {...this.props};
        delete props['children'];

        return {
            ...props,
            inputState: {
                left: this.state.left,
                right: this.state.right,
                forward: this.state.forward,
                shoot: this.state.shoot
            }
        }
    };


    onJoyStickMoved = (event, data) => {
        this.setState({angle: (360 - data.angle.degree) * Math.PI / 180})
    };
    onJoyStickEnd = () => this.setState({angle: 0});

    onKeyPressed = (event) => this.handleKeyStateChange(event, true);
    onKeyReleased = (event) => this.handleKeyStateChange(event, false);

    handleKeyStateChange = (event, pressed) => {
        const keyCode = event.charCode || event.keyCode;
        const pressedKeys = {
            ...this.state
        };

        switch (keyCode) {
            case KEY_A:
                pressedKeys.left = pressed;
                break;
            case KEY_D:
                pressedKeys.right = pressed;
                break;
            case KEY_W:
                pressedKeys.forward = pressed;
                break;
            case KEY_SPACE:
                pressedKeys.shoot = pressed;
                break;
            default:
                break;
        }

        this.setState(pressedKeys)
    }
}

InputManager.propTypes = {
    children: PropTypes.object,
    screenWidth: PropTypes.number,
    screenHeight: PropTypes.number
};