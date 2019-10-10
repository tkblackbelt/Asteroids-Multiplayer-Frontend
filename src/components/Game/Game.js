import React from 'react';
import PropTypes from 'prop-types';
import Background from "../../engine/entities/entity/Background";
import Player from "../../engine/entities/entity/Player";
import {generateAsteroidField} from "../../engine/entities/entity/Asteroid";
import Stats from "./Stats";
import {adjustScore, removeLife, startSinglePlayerGame} from "../../store/actions.ui";
import {connect} from "react-redux";
import {playAsteroidExplosion, playBlaster} from "../../engine/manager/AudioManager";


class Game extends React.Component {

    state = {
        background: new Background(0, 100),
        player: new Player(0, 0),
        asteroids: [],
        animationId: 0
    };

    componentDidMount() {
        const {screenWidth, screenHeight} = this.props;

        this.state.player.positionCenterOf(screenWidth, screenHeight);
        this.setAsteroids(generateAsteroidField(20, screenWidth, screenHeight));

        this.initializeGameLoop();
    }

    componentWillUnmount() {
        window.cancelAnimationFrame(this.state.animationId);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // Only screensize changes should trigger re-render
        return this.props.screenHeight !== nextProps.screenHeight ||
            this.props.screenWidth !== nextProps.screenWidth;
    }

    initializeGameLoop = () => {
        this.gameLoop();
    };

    gameLoop = () => {
        if (this.props.canDraw()) {
            this.processInputs();
            this.processUpdates();
            this.removeDeadEntities();
            this.checkCollisions();
            this.drawScreen();
        }

        this.setState({
            animationId: window.requestAnimationFrame(this.gameLoop)
        });
    };

    processInputs = () => {
        const {player} = this.state;
        const {pressedKeys} = this.props;

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

    removeDeadEntities = () => {
        const {asteroids} = this.state;

        const asteroidsLeft = asteroids.filter(a => !a.shouldRemoveFromScreen());

        if (asteroidsLeft.length !== asteroids.length) {
            this.setAsteroids(asteroidsLeft);
        }
    };

    checkCollisions = () => {
        const {asteroids, player} = this.state;

        asteroids
            .filter(a => !a.isExploding())
            .forEach(asteroid => {
                if (!player.isDead() && asteroid.isTouching(player)) {
                    player.die();
                    playAsteroidExplosion();
                    this.props.removeLife();
                }

                if (player.bulletsHit(asteroid)) {
                    playAsteroidExplosion();
                    const newAsteroids = asteroid.explode();
                    this.setAsteroids(newAsteroids.concat(asteroids));
                    this.props.adjustScore(100);
                }
            });
    };

    drawScreen = () => {
        const {background, player, asteroids} = this.state;
        const {context} = this.props;

        background.draw(context);
        player.draw(context);
        asteroids.forEach(a => a.draw(context));
    };

    setAsteroids = (asteroids) => {
        this.setState({
            asteroids: asteroids
        })
    };

    render() {
        return <Stats/>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        adjustScore: (scoreDelta: Number) => {
            dispatch(adjustScore(scoreDelta))
        },
        removeLife: () => {
            dispatch(removeLife());
        }
    }
};

Game.propTypes = {
    canDraw: PropTypes.func,
    screenWidth: PropTypes.number,
    screenHeight: PropTypes.number
};

export default connect(null, mapDispatchToProps)(Game);