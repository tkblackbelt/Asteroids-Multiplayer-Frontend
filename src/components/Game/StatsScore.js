import React from 'react';

export default function StatsScore({score}) {
    return <div>
        <span>SCORE: </span>{score ? score : 0}
    </div>
}