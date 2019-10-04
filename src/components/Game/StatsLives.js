import React from 'react';

function renderLives(lives: Number) {
    let myLives = "";
    for (let i = 0; i < lives; i++) {
        myLives += "|";
    }
    return myLives;
}

export default function StatsLives({lives}) {
    return <div>
        <span>LIVES:</span>{renderLives(lives)}
    </div>
}