import React from 'react';
import StatsScore from "./StatsScore";
import StatsLives from "./StatsLives";
import {connect} from "react-redux";

class Stats extends React.Component {
    render() {
        return (
            <div style={{
                position: 'fixed',
                color: 'white',
                right: '10px',
                top: '10px',
                margin: '10px',
                display: 'flex',
                fontSize: '2em',
                alignItems: 'center'
            }}>
                <StatsLives lives={this.props.lives} maxLives={this.props.maxLives}/>
                <div style={{width: '10px'}}/>
                <StatsScore score={this.props.score}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        score: state.gameState.score,
        lives: state.gameState.lives,
        maxLives: state.gameState.maxLives
    }
};

export default connect(mapStateToProps, null)(Stats);