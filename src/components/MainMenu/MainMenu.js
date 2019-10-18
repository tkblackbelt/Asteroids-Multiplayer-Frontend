import React from 'react';
import PropTypes from 'prop-types';
import MainMenuTitle from "./MainMenuTitle";
import Background from "../../engine/entities/entity/Background";
import {generateAsteroidField} from "../../engine/entities/entity/Asteroid";
import {startSinglePlayerGame} from "../../store/actions.ui";
import {connect} from "react-redux";
import Button from "../common/Button";

const style = {
    buttons: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        placeItems: 'center'
    }
};

class MainMenu extends React.Component {

    state = {
        background: new Background(150),
        asteroids: [],
        animationId: 0
    };

    shouldComponentUpdate(nextProps, nextState, nextContext): boolean {
        return this.props.screenHeight !== nextProps.screenHeight ||
            this.props.screenWidth !== nextProps.screenWidth ||
            this.state.asteroids.length === 0;
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
            <div className="ui-root">
                <MainMenuTitle mainText="ASTEROIDS" subText="ONLINE"/>
                <div className="ui-container" style={style.buttons}>
                    <Button text="Single Player" onClick={this.props.startSinglePlayerGame}/>
                    <Button text="Multi-Player"/>
                    <Button text="Leader Board"/>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        startSinglePlayerGame: () => {
            dispatch(startSinglePlayerGame())
        }
    }
};

export default connect(null, mapDispatchToProps)(MainMenu);

MainMenu.propTypes = {
    startSinglePlayerGame: PropTypes.func,
    canDraw: PropTypes.func,
    screenWidth: PropTypes.number,
    screenHeight: PropTypes.number
};