import React from 'react';
import PropTypes from 'prop-types';
import MainMenuTitle from "./MainMenuTitle";
import Background from "../../engine/entities/entity/Background";
import { generateAsteroidField } from "../../engine/entities/entity/Asteroid";
import { closeHighScores, openHighScores, startSinglePlayerGame, startMultiPlayerGame } from "../../store/actions.ui";
import { connect } from "react-redux";
import Button from "../common/Button";
import About from './About';
import Client from '../../engine/network/Client';
import QuestionInput from '../common/QuestionInput';

const style = {
    buttons: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        placeItems: 'center',
    }
};

class MainMenu extends React.Component {

    state = {
        background: new Background(150),
        asteroids: [],
        animationId: 0,
        multiplayerDialogOpen: false,
        aboutDialogOpen: false
    };

    shouldComponentUpdate(nextProps, nextState, nextContext): boolean {
        return this.props.screenHeight !== nextProps.screenHeight ||
            this.props.screenWidth !== nextProps.screenWidth ||
            this.state.asteroids.length === 0 ||
            this.props.highScores !== nextProps.highScores ||
            this.state.multiplayerDialogOpen !== nextState.multiplayerDialogOpen ||
            this.state.aboutDialogOpen !== nextState.aboutDialogOpen;
    }

    componentDidUpdate(prevProps, prevState) {
        const { asteroids } = this.state;
        const { screenWidth, screenHeight } = this.props;

        if (asteroids.length === 0) {
            this.setState({
                asteroids: generateAsteroidField(10, screenWidth, screenHeight)
            })
        }
    }

    componentDidMount(): void {
        this.gameLoop();
    }

    componentWillUnmount(): void {
        window.cancelAnimationFrame(this.state.animationId);
    }

    gameLoop = () => {
        if (this.props.canDraw()) {
            this.update();
            this.draw();
        }
        // this.state.animationId = window.requestAnimationFrame(this.gameLoop);
        this.setState({
            animationId:  window.requestAnimationFrame(this.gameLoop)
        })
    };

    update = () => {
        const { background, asteroids } = this.state;
        const { screenWidth, screenHeight } = this.props;

        background.update(screenWidth, screenHeight);
        asteroids.forEach(a => a.update(screenWidth, screenHeight))

        // this.state.client.emitPlayerUpdate({name: "Chuck"})
    };

    draw = () => {
        const { background, asteroids } = this.state;
        const { context } = this.props;

        background.draw(context);
        asteroids.forEach(a => a.draw(context))
    };

    onMultiPlayerDialogOpen = () => {
        alert("Apologies. Multi-player disabled since AWS Fargate and ELB gets pricey :). Feel free to checkout the code in the About Button though");
        //this.setState({
          //  multiplayerDialogOpen: true
        //})
    }

    closeMultiPlayerDialog = () => {
       // this.setState({
         //   multiplayerDialogOpen: false
        //});
    }

    onAboutDialogOpen = () => {
        this.setState({
            aboutDialogOpen: true
        })
    }

    closeAboutDialog = () => {
        this.setState({
            aboutDialogOpen: false
        });
    }

    render() {
        const { highScores, startMultiPlayerGame } = this.props;
        const { multiplayerDialogOpen, aboutDialogOpen } = this.state;

        return (
            <div className="ui-root">
                <MainMenuTitle mainText="ASTEROIDS" subText="ONLINE" />
                <About open={aboutDialogOpen} onClose={this.closeAboutDialog} />
                {multiplayerDialogOpen &&
                    <QuestionInput
                        text="Enter matchmaking?"
                        subtext="Enter name"
                        onNoClicked={this.closeMultiPlayerDialog}
                        onYesClicked={startMultiPlayerGame} />}
                <div className="ui-container" style={style.buttons}>
                    <Button text="Single Player" onClick={this.props.startSinglePlayerGame} />
                    <Button text="Multi-Player" onClick={this.onMultiPlayerDialogOpen} />
                    <Button text="About" onClick={this.onAboutDialogOpen} />
                </div>
                <div className="ui-container">
                    <h4>Controls</h4>
                    <h4>Movement: A(Left) D(Right)</h4>
                    <h4>Thrust: W</h4>
                    <h4>Shoot: Space</h4>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        startSinglePlayerGame: () => {
            dispatch(startSinglePlayerGame());
        },
        startMultiPlayerGame: (playerName: String) => {
            dispatch(startMultiPlayerGame(playerName))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        highScores: state.highScores,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);

MainMenu.propTypes = {
    startSinglePlayerGame: PropTypes.func,
    canDraw: PropTypes.func,
    screenWidth: PropTypes.number,
    screenHeight: PropTypes.number
};
