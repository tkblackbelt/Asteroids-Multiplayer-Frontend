import React from 'react';
import PropTypes from 'prop-types';
import nipplejs from 'nipplejs';
import {KEY_A, KEY_D, KEY_S, KEY_SPACE, KEY_W} from "./KeyCode";


export default class InputManager extends React.Component {

    state = {
        left: false,
        right: false,
        forward: false,
        shoot: false,
        mobileControls: true,
        mobileManager: null
    };

    componentDidMount() {
        window.addEventListener('keydown', this.onKeyPressed);
        window.addEventListener('keyup', this.onKeyReleased);
        const options = {
            zone: document.getElementById('joystick'),
            mode: 'static',
            position: {left: '10%', bottom: '10%'}
        };
        const nipple = nipplejs.create(options);
        nipple.on('move', this.onJoyStickMoved);
        nipple.on('end', this.onJoyStickEnd);

        this.setState({
            mobileManager: nipple
        });
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyPressed);
        window.removeEventListener('keyup', this.onKeyReleased);
    }

    componentDidUpdate(prevProps, prevState, snapshot): void {
        if (this.props.screenHeight < 720 || this.props.screenWidth < 720) {
            if (!this.state.mobileControls) {
                this.setState({
                    mobileControls: true
                })
            }
        } else {
            if (this.state.mobileControls) {
                this.setState({
                    mobileControls: false
                })
            }
        }
    }

    render() {
        // const display = !this.state.mobileControls ? {} : {display: 'none'};
        return (
            <React.Fragment>
                {React.cloneElement(this.props.children, this.getChildrenProps())}
                <div style={{width: '100%', height: '25%', position: 'fixed', bottom: '10%'}}
                     id="joystick"/>
            </React.Fragment>
        );
    }

    getChildrenProps = () => {
        const props = {...this.props};
        delete props['children'];

        return {
            ...props,
            pressedKeys: this.state
        }
    };


    onJoyStickMoved = (event, data) => {
        console.log(event, data);

        if (data.direction.x === "left") {
            this.handleKeyStateChange({charCode: KEY_A}, true);
            this.handleKeyStateChange({charCode: KEY_D}, false);
        } else {
            this.handleKeyStateChange({charCode: KEY_D}, true);
            this.handleKeyStateChange({charCode: KEY_A}, false)
        }

        if (data.direction.y === "up") {
            this.handleKeyStateChange({charCode: KEY_W}, true);
            this.handleKeyStateChange({charCode: KEY_S}, false)
        } else {
            this.handleKeyStateChange({charCode: KEY_S}, true);
            this.handleKeyStateChange({charCode: KEY_W}, false);
        }
    };

    onJoyStickEnd = () => {
        this.handleKeyStateChange({charCode: KEY_A}, false);
        this.handleKeyStateChange({charCode: KEY_D}, false);
        this.handleKeyStateChange({charCode: KEY_S}, false);
        this.handleKeyStateChange({charCode: KEY_W}, false);
    };

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