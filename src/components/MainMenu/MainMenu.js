import React from 'react';
import PropTypes from 'prop-types';
import MainMenuTitle from "./MainMenuTitle";
import Background from "../../engine/entities/entity/Background";
import {generateAsteroidField} from "../../engine/entities/entity/Asteroid";
import MainMenuButton from "./MainMenuButton";
import {startSinglePlayerGame} from "../../store/actions.ui";
import {connect} from "react-redux";

const style = {
    root: {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'fixed',
    },
    buttons: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        placeItems: 'center'
    }
};

class MainMenu extends React.Component {

    state = {
        background: new Background(0, 150),
        asteroids: [],
        animationId: 0
    };

    shouldComponentUpdate(nextProps, nextState, nextContext): boolean {
        return this.props.screenHeight !== nextProps.screenHeight ||
            this.props.screenWidth !== nextProps.screenWidth
    }

    componentDidUpdate(prevProps, prevState) {
        const {asteroids} = this.state;
        const {screenWidth, screenHeight} = this.props;

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

        this.setState({
            animationId: window.requestAnimationFrame(this.gameLoop)
        })
    };

    update = () => {
        const {background, asteroids} = this.state;
        const {screenWidth, screenHeight} = this.props;

        background.update(screenWidth, screenHeight);
        asteroids.forEach(a => a.update(screenWidth, screenHeight))
    };

    draw = () => {
        const {background, asteroids} = this.state;
        const {context} = this.props;

        background.draw(context);
        asteroids.forEach(a => a.draw(context))
    };

    render() {
        return (
            <div style={style.root}>
                <MainMenuTitle mainText="ASTEROIDS" subText="ONLINE"/>
                <div style={style.buttons}>
                    <MainMenuButton text="Single Player" onClick={this.props.startSinglePlayerGame}/>
                    <MainMenuButton text="Multi-Player"/>
                    <MainMenuButton text="Instructions"/>
                </div>
            </div>
        );
    }
}

MainMenu.propTypes = {
    startSinglePlayerGame: PropTypes.func,
    canDraw: PropTypes.func,
    screenWidth: PropTypes.number,
    screenHeight: PropTypes.number
};

const mapDispatchToProps = dispatch => {
    return {
        startSinglePlayerGame: () => {
            dispatch(startSinglePlayerGame())
        }
    }
};

export default connect(null, mapDispatchToProps)(MainMenu);