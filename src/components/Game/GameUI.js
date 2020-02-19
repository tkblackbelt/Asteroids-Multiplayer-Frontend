import React from 'react';
import PropTypes from 'prop-types';
import Background from "../../engine/entities/entity/Background";
import Player from "../../engine/entities/entity/Player";
import { generateAsteroidField } from "../../engine/entities/entity/Asteroid";
import Stats from "./Stats";
import { startMainMenu } from "../../store/actions.ui";
import { connect } from "react-redux";
import { playAsteroidExplosion, playBlaster } from "../../engine/manager/AudioManager";
import Question from "../common/Question";
import { numberBetween } from "../../util/helpers";
import LevelNotification from "./LevelNotification";
import Client from '../../engine/network/Client';
import Game, { CollisionResultT } from '../../engine/Game';


class GameUI extends React.Component {

    state = {
        animationId: 0,
        running: false,
        levelCountDownOpen: false,
        levelCompleteDialogOpen: false,
        gameOverDialogOpen: false,
        forceRender: false
    };

    componentDidMount() {
        this.initializeLevel();
        this.gameLoop();
    }

    componentWillUnmount() {
        window.cancelAnimationFrame(this.state.animationId);
        this.props.game.exit();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { screenWidth, screenHeight, game } = this.props;

        game.setScreenSize(screenWidth, screenHeight);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.screenHeight !== nextProps.screenHeight ||
            this.props.screenWidth !== nextProps.screenWidth ||
            this.state.running !== nextState.running ||
            this.state.levelCountDownOpen !== nextState.levelCountDownOpen ||
            this.state.forceRender !== nextState.forceRender ||
            this.state.levelCompleteDialogOpen !== nextState.levelCompleteDialogOpen ||
            this.state.gameOverDialogOpen !== nextState.gameOverDialogOpen;
    }

    initializeLevel() {
        this.props.game.initializeLevel();
        this.setState({
            levelCountDownOpen: true,
            running: false
        });
    }

    gameLoop = () => {
        const { running } = this.state;
        const { context, game } = this.props;

        if (this.props.canDraw()) {

            if (running) {
                this.processInputs();
                game.update();
                game.cleanScreen();

                const collision: CollisionResultT = game.checkCollisions();

                if (collision.asteroidHit) {
                    playAsteroidExplosion();
                    this.forceRender();
                }
                if (collision.playerHit) {
                    playAsteroidExplosion();
                    this.respawnPlayer();
                }
                this.checkForGameEnd();
            }
            game.draw(context);
        }

        this.setState({
            animationId: window.requestAnimationFrame(this.gameLoop)
        });
    };

    processInputs = () => {
        const { running } = this.state;
        const { inputState, game } = this.props;

        const player = game.getPlayer();

        if (player.isAlive() && running) {

            if (inputState.left) {
                game.rotatePlayerLeft();
            } else if (inputState.right) {
                game.rotatePlayerRight();
            }

            if (inputState.forward) {
                game.enablePlayerThrust();
            } else {
                game.disablePlayerThrust();
            }

            if (inputState.shoot) {
                game.shootPlayerBullet();
                playBlaster();
            }
        }
    };

    respawnPlayer = () => {
        const { game } = this.props;

        if (!game.getPlayer().isAlive() && !game.isGameOver()) {
            setTimeout(() => {
                game.respawnPlayer();
                this.forceRender();
            }, 1000);
        }
    };

    checkForGameEnd = () => {
        const { game } = this.props;

        if (game.isLevelCompleted()) {
            this.openLevelCompleteDialog();
        } else if (game.isGameOver()) {
            this.openGameOverDialog();
        }
    };

    forceRender = () => {
        this.setState({
            forceRender: !this.state.forceRender
        });
    };

    onLevelStart = () => {
        this.setState({
            running: true,
            levelCountDownOpen: false
        })
    };

    render() {
        return <div style={{ zIndex: 9999 }}>
            {this.renderStats()}
            {this.renderLevelNotification()}
            {this.renderGameOverDialog()}
            {this.renderLevelComplete()}
        </div>
    };

    renderStats = () => {
        const { game } = this.props;
        const player = game.getPlayer();

        return <Stats score={player.getScore()}
            lives={player.getLives()} maxLives={game.getMaxLives()} />
    };

    renderLevelNotification = () => {
        const { game } = this.props;
        const { levelCountDownOpen } = this.state;

        return <LevelNotification open={levelCountDownOpen} level={game.getLevel()} onFinish={this.onLevelStart} />
    };

    renderGameOverDialog = () => {
        const { game } = this.props;

        if (game.isGameOver()) {
            return <Question text="GAME OVER" subtext="Play Again?" color="red"
                onNoClicked={this.props.startMainMenu}
                onYesClicked={this.resetGame} />
        }
    };

    renderLevelComplete = () => {
        const { levelCompleteDialogOpen } = this.state;

        if (levelCompleteDialogOpen) {
            return <Question text="SUCCESS!" subtext="Start next round?" color="green"
                onNoClicked={this.props.startMainMenu}
                onYesClicked={this.goToNextLevel} />
        }
    };

    goToNextLevel = () => {
        const { game } = this.props;

        game.advanceLevel();
        this.initializeLevel();
        this.closeDialogs();
    }

    resetGame = () => {
        const { game } = this.props;

        game.reset();
        this.initializeLevel();
        this.closeDialogs();
    }

    openLevelCompleteDialog = () => {
        this.setState({
            levelCompleteDialogOpen: true
        });
    };

    openGameOverDialog = () => {
        this.setState({
            gameOverDialogOpen: true
        });
    };

    closeDialogs = () => {
        this.setState({
            levelCompleteDialogOpen: false,
            gameOverDialogOpen: false
        })
    };

}

const mapDispatchToProps = dispatch => {
    return {
        startMainMenu: () => {
            dispatch(startMainMenu());
        }
    }
};

GameUI.propTypes = {
    canDraw: PropTypes.func,
    screenWidth: PropTypes.number,
    screenHeight: PropTypes.number,
    game: PropTypes.object
};

export default connect(null, mapDispatchToProps)(GameUI);