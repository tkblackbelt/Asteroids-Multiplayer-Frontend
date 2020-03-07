import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameUI from './GameUI';
import NetworkGame from '../../engine/NetworkGame';
import { GameConfigT } from '../../engine/Game'
import Teammates from './Teammates';
import WaitingForPlayers from './WaitingForPlayers';

class NetworkGameUI extends React.Component {

    state = {
        forceRender: false,
        game: null,
        gameJoinLoop: null
    }

    componentWillMount() {
        this.setState({
            game: new NetworkGame(SOCKET_URL, this.onPlayersUpdated)
        });
    }

    componentDidUpdate() {
        console.log("UPDATING");

        const { waitingForGame } = this.props;
        const { gameID, playerID, playerName } = this.props.multiPlayer;
        const game = this.getGame();

        if (!waitingForGame && gameID && playerID && game) {
            game.joinGame(gameID, playerName, playerID);
        }

        if (this.isWaitingForGame()) {
            this.startGameJoinLoop();
        } else {
            this.stopGameJoinLoop();
        }
    }

    getTeammates = () => {
        return this.getGame().getPlayers();
    }

    getGame = (): NetworkGame => {
        return this.state.game
    }

    onPlayersUpdated = () => {
        this.setState({ forceRender: !this.state.forceRender });
    }

    startGameJoinLoop = () => {
        if (!this.state.gameJoinLoop) {
            const loop = setInterval(() => {
                this.getGame().sendPlayerJoinPacket()
            }, 5000);

            this.setState({
                gameJoinLoop: loop
            })
        }
    }

    stopGameJoinLoop = () => {
        if (this.state.gameJoinLoop) {
            clearTimeout(this.state.gameJoinLoop);
            this.setState({
                gameJoinLoop: null
            })
        }
    }

    isWaitingForGame = () => {
        const { waitingForGame } = this.props;
        const game = this.getGame();

        return !game || waitingForGame || !game.isInitialized();
    }

    render() {
        return (
            <React.Fragment>
                {this.renderScene()}
            </React.Fragment>
        )
    }

    renderScene() {
        console.log("RENDERING SCENE");
        const { waitingForGame } = this.props;
        const { playerID } = this.props.multiPlayer;
        const game = this.getGame();

        if (this.isWaitingForGame()) {
            return (
                <WaitingForPlayers playerID={playerID} />
            )
        } else {
            return (
                <React.Fragment>
                    <GameUI {...this.props} game={game} />
                    <Teammates players={this.getTeammates()} />
                </React.Fragment>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        multiPlayer: state.multiPlayer
    }
};

NetworkGameUI.propTypes = {
    canDraw: PropTypes.func,
    screenWidth: PropTypes.number,
    screenHeight: PropTypes.number,
    multiPlayer: PropTypes.object
};

export default connect(mapStateToProps, null)(NetworkGameUI);