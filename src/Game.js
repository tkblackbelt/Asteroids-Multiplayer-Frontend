import React from 'react';
import InputManager from "./engine/manager/InputManager";
import Background from "./engine/entities/entity/Background";
import Player from "./engine/entities/entity/Player";
import {generateAsteroidField} from "./engine/entities/entity/Asteroid";
import Stats from "./components/GameStats/Stats";


class Game extends React.Component {

    state = {
        inputManager: new InputManager(),
        running: false,
        background: new Background(6, 50),
        player: new Player(400, 400),
        asteroids: []
    };

    componentDidMount() {
        this.initializeGameLoop();
        this.state.inputManager.bind();
    }

    componentWillUnmount() {
        this.state.inputManager.unbind();
    }

    componentDidUpdate(prevProps, prevState) {
        const {screenWidth, screenHeight, canvas} = this.props;

        if (canvas) {
            canvas.width = screenWidth;
            canvas.height = screenHeight;
        }
    }

    initializeGameLoop = () => {
        this.setState({
            running: true,
            asteroids: generateAsteroidField(1, 500, 500)
        });
        this.gameLoop();
    };

    gameLoop = () => {
        window.requestAnimationFrame(this.gameLoop);

        if (this.isGameRunning()) {
            this.processInputs();
            this.processUpdates();
            this.checkCollisions();
            this.drawScreen();
        }
    };

    isGameRunning = () => {
        return this.state.running && this.props.canvas
    };

    processInputs = () => {
        const {inputManager, player} = this.state;
        const {pressedKeys} = inputManager;

        if (pressedKeys.left) {
            player.rotateLeft();
        } else if (pressedKeys.right) {
            player.rotateRight();
        }

        if (pressedKeys.forward) {
            player.enableThrust();
        } else {
            player.disableThrust();
        }

        if (pressedKeys.shoot) {
            player.shootBullet();
        }
    };

    processUpdates = () => {
        const {background, player, asteroids} = this.state;
        const {screenWidth, screenHeight} = this.props;

        background.update(screenWidth, screenHeight);
        player.update(screenWidth, screenHeight);
        asteroids.forEach(e => e.update(screenWidth, screenHeight));
    };

    checkCollisions = () => {
        const {asteroids, player} = this.state;

        asteroids.forEach(asteroid => {
            if (asteroid.isTouching(player)) {
                player.die();
            }

            player.bullets.forEach(bullet => {
                if (bullet.isTouching(asteroid)) {
                    asteroid.explode();
                    bullet.setUsedUp();
                }
            })
        });
    };

    drawScreen = () => {
        const {background, player, asteroids} = this.state;
        const {context} = this.props;

        background.draw(context);
        player.draw(context);
        asteroids.forEach(a => a.draw(context));
    };

    render() {
        return <div>
            <Stats/>
        </div>;
    }
}

export default Game;