import React from 'react';
import heartImage from '../../static/img/heart.png';


function renderLives(lives: Number) {
    if (lives < 0)
        return null;

    return [...Array(lives).keys()].map((_, idx) => {
        return <img key={idx} src={heartImage} alt="Lives"/>
    });
}

export default function StatsLives({lives}) {
    return <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }}>
        <span>LIVES:</span>{renderLives(lives)}
    </div>
}