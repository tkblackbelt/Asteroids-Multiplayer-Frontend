import React from 'react';

export default function StateLevel({level}) {
    return <div>
        <span>LEVEL: </span>{level ? level : 0}
    </div>
}