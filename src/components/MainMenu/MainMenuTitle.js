import React from 'react';

const style = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    mainHeader: {
        fontSize: '5em'
    },
    subHeader: {
        fontSize: '3em',
        color: 'red',
    }
};

export default function MainMenuTitle({mainText, subText}) {
    return (
        <div style={style.root}>
            <div style={style.mainHeader}>{mainText}</div>
            <div style={style.subHeader}>{subText}</div>
        </div>
    )
}