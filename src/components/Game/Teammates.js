import React from 'react';
import PropTypes from 'prop-types';
import StatsLives from './StatsLives';
import StatsScore from './StatsScore';

const style = {
    root: {
        float: "right",
        border: '1px solid green',
        marginRLeft: 5,
        marginTop: 5,
        opacity: .7
    },
    header: {
        textAlign: 'center'
    },
    player_name: {
        display: "inline"
    },
    list: {
        listStyleType: 'none',
        padding: 0,
        margin: 5
    },
    list_item: {
        borderTop: "1px solid green",
        paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 5
    }
}

class Teammates extends React.Component {

    renderTeammates = () => {
        return this.props.players.map((player, idx) => {
            return <li key={idx} style={{...style.list_item, backgroundColor: player.getColor()}}>
                <h4 style={style.player_name}>{player.getName()}</h4>
                <StatsLives lives={player.getLives()} maxLives={3} />
                <StatsScore score={player.getScore()} />
            </li>
        })
    }

    render() {
        return <div style={style.root}>
            <h3 style={style.header}>Team</h3>
            <ul style={style.list}>
                {this.renderTeammates()}
            </ul>
        </div>
    }
}

Teammates.propTypes = {
    players: PropTypes.array
}

export default Teammates;