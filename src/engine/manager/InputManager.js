import {KEY_A, KEY_D, KEY_SPACE, KEY_W} from "./KeyCode";


export default class InputManager {
    constructor() {
        this.pressedKeys = {
            left: false,
            right: false,
            forward: false,
            shoot: false
        }
    }

    bind = () => {
        window.addEventListener('keydown', this.onKeyPressed);
        window.addEventListener('keyup', this.onKeyReleased);
    };

    unbind = () => {
        window.removeEventListener('keydown', this.onKeyPressed);
        window.removeEventListener('keyup', this.onKeyReleased);
    };

    onKeyPressed = (event) => this.handleKeyStateChange(event, true);
    onKeyReleased = (event) => this.handleKeyStateChange(event, false);

    handleKeyStateChange = (event, pressed) => {
        const keyCode = event.charCode || event.keyCode;
        switch (keyCode) {
            case KEY_A:
                this.pressedKeys.left = pressed;
                break;
            case KEY_D:
                this.pressedKeys.right = pressed;
                break;
            case KEY_W:
                this.pressedKeys.forward = pressed;
                break;
            case KEY_SPACE:
                this.pressedKeys.shoot = pressed;
            default:
                break;
        }
    }
}