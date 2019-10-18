import React from 'react';
import Button from "./Button";

const style = {
    buttonStyle: {
        width: '200px'
    }
};

export default function Question({text, subtext, color, onYesClicked, onNoClicked}) {
    return (
        <div className="ui-root">
            <div className="ui-container">
                <div className="ui-header" style={{color: color}}>{text}</div>
                <div className="ui-subheader" style={style.subHeader}>{subtext}</div>
                <Button text="YES" style={style.buttonStyle} onClick={onYesClicked}/>
                <Button text="NO" style={style.buttonStyle} onClick={onNoClicked}/>
            </div>
        </div>
    )
}