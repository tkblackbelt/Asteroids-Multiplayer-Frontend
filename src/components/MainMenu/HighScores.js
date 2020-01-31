import React from 'react';
import Button from "../common/Button";

const style = {
    root: {
        fontSize: '1.5em',
        zIndex: 9999,
    },
    container: {
        backgroundColor: 'black',
        width: '40%',
        height: '40%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid green'
    },
    td: {
        padding: '0 15px 0 15px'
    }
};

function getScoresUI(scores) {
    return scores.map((score, index) => {
        return (
            <tr key={index}>
                <td style={style.td}>{index + 1}</td>
                <td style={style.td}>{score['user']}</td>
                <td style={style.td}>{score['score']}</td>
            </tr>
        );
    })
}

function sortScores(scores) {
    scores.sort((score1, score2) =>  score1['score'] - score2['score']);
}

export function HighScores({scores, open, onClose}) {
    if (open) {
        sortScores(scores);

        return (
            <div className="ui-root" style={style.root}>
                <div className="ui-container" style={style.container}>
                    <h3>High Scores</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Player</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getScoresUI(scores)}
                        </tbody>
                    </table>
                    <Button text="Close" style={{marginTop: '20px'}} onClick={onClose}/>
                </div>
            </div>
        );
    } else {
        return React.Fragment;
    }
}