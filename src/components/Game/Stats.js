import React from 'react';
import StatsScore from "./StatsScore";
import StatsLives from "./StatsLives";

class Stats extends React.Component {
    render() {
        return (
            <div style={{
                position: 'fixed',
                color: 'white',
                right: '0',
                margin: '10px',
                display: 'flex'
            }}>

                <StatsLives lives={3}/>
                <div style={{width: '10px'}}/>
                <StatsScore score={100}/>

            </div>
        )
    }
}

export default Stats;