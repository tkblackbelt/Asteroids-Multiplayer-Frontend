import React from 'react';
import heartImage from '../../static/img/heart.png';


function renderLives(lives: Number, maxLives: Number) {
    if (lives < 0)
        return null;

    const liveImages = [];

    for (let live = 0; live < maxLives; live++) {
        const style = {};
        if(live >= lives) {
            style['opacity'] = 0;
        }

        liveImages.push(<img key={live} style={style} src={heartImage} alt="Lives"/>);
    }

    return liveImages
}

export default function StatsLives({lives, maxLives}) {
    return <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }}>
        <span>LIVES:</span>{renderLives(lives, maxLives)}
    </div>
}