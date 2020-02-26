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
        game: null
    }

    componentWillMount() {
        this.setState({
            game: new NetworkGame('/socket', this.onPlayersUpdated)
        });
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

    render() {
        return (
            <React.Fragment>
                {this.renderScene()}
            </React.Fragment>
        )
    }

    renderScene() {
        const { waitingForGame } = this.props;
        const { gameID, playerID, playerName } = this.props.multiPlayer;
        const game = this.getGame();

        if (!waitingForGame && gameID && playerID && game) {
            game.joinGame(gameID, playerName, playerID);
        }
       
        if (!game || waitingForGame || !game.isInitialized()) {
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