import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactLoading from "react-loading";
import { checkForGameStart } from "../../store/actions.ui";

const style = {
    container: {
        backgroundColor: 'black',
        margin: 0,
        display: 'flex',
        alignItems: 'center'
    }
}

class WaitingForPlayers extends React.Component {

    state = {
        pollingLoop: null
    }

    componentDidMount = () => {
        const loop = setInterval(() => {
            console.log("POLLING", this.props);
            this.props.checkForGameStart(this.props.playerID);
        }, 5000);

        this.setState({
            pollingLoop: loop
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.pollingLoop);
    }

    render() {
        return (
            <div className="ui-root" style={style.container}>
                <ReactLoading type="bars" />
                <h1>Waiting for Players...</h1>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkForGameStart: (playerID: str) => {
            dispatch(checkForGameStart(playerID))
        }
    }
};

WaitingForPlayers.propTypes = {
    playerID: PropTypes.string
};

export default connect(null, mapDispatchToProps)(WaitingForPlayers);