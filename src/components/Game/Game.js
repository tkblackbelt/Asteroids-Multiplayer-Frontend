import React from 'react';
import PropTypes from 'prop-types';
import Background from "../../engine/entities/entity/Background";
import Player from "../../engine/entities/entity/Player";
import {generateAsteroidField} from "../../engine/entities/entity/Asteroid";
import Stats from "./Stats";
import {adjustScore, nextLevel, removeLife, resetGame, startMainMenu} from "../../store/actions.ui";
import {connect} from "react-redux";
import {playAsteroidExplosion, playBlaster} from "../../engine/manager/AudioManager";
import Question from "../common/Question";
import {numberBetween} from "../../util/helpers";
import LevelNotification from "./LevelNotification";


class Game extends React.Component {

    state = {
        background: new Background(100),
        player: new Player(0, 0),
        asteroids: [],
        animationId: 0,
        running: false
    };

    componentDidMount() {
        this.initializeLevel();
        this.gameLoop();
    }

    componentWillUnmount() {
        window.cancelAnimationFrame(this.state.animationId);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // Only screensize changes should trigger re-render
        return this.props.screenHeight !== nextProps.screenHeight ||
            this.props.screenWidth !== nextProps.screenWidth ||
            this.props.lives !== nextProps.lives ||
            this.props.level !== nextProps.level ||
            this.state.running !== nextState.running ||
            this.state.asteroids.length !== nextState.asteroids.length;
    }

    componentDidUpdate(prevProps, prevState, snapshot): void {
        if (!this.state.player.isAlive()) {
            this.respawnPlayer(1000);
        }

        if (this.props.level > 0 && prevProps.level !== this.props.level) {
            this.initializeLevel();
        } else {
            if (this.props.level === 0) {
                 this.props.nextLevel();
            }
        }
    }

    respawnPlayer = (respondDelayMS) => {
        const {player} = this.state;

        if (this.props.lives > 0) {
            setTimeout(() => {
                player.respawn();
                player.positionCenterOf(this.props.screenWidth, this.props.screenHeight);
            }, respondDelayMS)
        }
    };

    initializeLevel = () => {
        const {screenWidth, screenHeight, level} = this.props;

        const baseAsteroidFieldSize = 5;
        const asteroidFieldSize = numberBetween(1, level) + baseAsteroidFieldSize;
        const asteroidField = generateAsteroidField(asteroidFieldSize, screenWidth, screenHeight);

        this.setAsteroids(asteroidField);
        this.respawnPlayer(0);

        this.setState({
            running: false
        });
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
        const {player, running} = this.state;
        const {inputState} = this.props;

        if (player.isAlive() && running) {

            if (inputState.left) {
                player.rotateLeft();
            } else if (inputState.right) {
                player.rotateRight();
            }

            if (inputState.forward) {
                player.enableThrust();
            } else {
                player.disableThrust();
            }

            if (inputState.shoot) {
                player.shootBullet();
                playBlaster();
            }
        }

    };

    processUpdates = () => {
        const {background, player, asteroids, running} = this.state;
        const {screenWidth, screenHeight} = this.props;

        background.update(screenWidth, screenHeight);

        if (running) {
            player.update(screenWidth, screenHeight);
            asteroids.forEach(e => e.update(screenWidth, screenHeight));
        }
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
                if (player.isAlive() && asteroid.isTouching(player)) {
                    this.collisionPlayerAndAsteroid()
                }

                if (player.bulletsHit(asteroid)) {
                    this.collisionBulletAndAsteroid(asteroid);
                }
            });
    };

    collisionPlayerAndAsteroid = () => {
        const {player} = this.state;
        const {removeLife} = this.props;

        player.die();
        removeLife();
        playAsteroidExplosion();
    };

    collisionBulletAndAsteroid = (asteroid) => {
        const {asteroids} = this.state;
        const {adjustScore} = this.props;
        const childAsteroids = asteroid.explodeIntoPieces();

        this.setAsteroids(childAsteroids.concat(asteroids));
        adjustScore(this.getScoreIncrease(asteroid));
        playAsteroidExplosion();
    };

    getScoreIncrease = (asteroid) => {
        const baseScore = 50;
        const variableScore = numberBetween(0, 100) * asteroid.getLives();
        return baseScore + variableScore;
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
            asteroids: asteroids,
            running: true
        })
    };

    isGameOver = () => {
        return this.props.lives === 0;
    };

    isLevelCompleted = () => {
        return this.state.running && this.state.asteroids.length === 0;
    };

    onLevelStart = () => {
        this.setState({
            running: true
        })
    };

    render() {
        return <div style={{zIndex: 9999}}>
            <Stats/>
            <LevelNotification level={this.props.level} onFinish={this.onLevelStart}/>
            {this.isGameOver() &&
            <Question text="GAME OVER" subtext="Play Again?" color="red"
                      onNoClicked={this.props.startMainMenu}
                      onYesClicked={this.props.resetGame}/>}

            {this.isLevelCompleted() &&
            <Question text="SUCCESS!" subtext="Start next round?" color="green"
                      onNoClicked={this.props.startMainMenu}
                      onYesClicked={this.props.nextLevel}/>
            }
        </div>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        adjustScore: (scoreDelta: Number) => {
            dispatch(adjustScore(scoreDelta))
        },
        removeLife: () => {
            dispatch(removeLife());
        },
        startMainMenu: () => {
            dispatch(startMainMenu());
        },
        nextLevel: () => {
            dispatch(nextLevel());
        },
        resetGame: () => {
            dispatch(resetGame());
        }
    }
};

const mapStateToProps = (state) => {
    return {
        lives: state.gameState.lives,
        level: state.gameState.level
    }
};

Game.propTypes = {
    canDraw: PropTypes.func,
    screenWidth: PropTypes.number,
    screenHeight: PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);