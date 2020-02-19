import React from 'react';
import Button from "./Button";

const style = {
    buttonStyle: {
        width: '100px'
    },
    root: {
        zIndex: 9999
    },
    container: {
        backgroundColor: 'black',
        width: '40%',
        height: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid green'
    },
    input: {
        fontSize: "1.5em"
    },
    buttons: {
        display: "flex"
    }
};

export default function QuestionInput({ text, subtext, onYesClicked, onNoClicked }) {
    const ref = React.createRef()


    function onYes() {
        const playerName = ref.current.value;
        onYesClicked(playerName);
        
        ref.current.value = "";
    }

    return (
        <div className="ui-root" style={style.root}>
            <div className="ui-container" style={style.container}>
                <h3>{text}</h3>
                <h4>{subtext}</h4>
                <input style={style.input} ref={ref} type="text"></input>
                <div style={style.button}>
                    <Button text="JOIN" style={style.buttonStyle} onClick={onYes} />
                    <Button text="CANCEL" style={style.buttonStyle} onClick={onNoClicked} />
                </div>
            </div>
        </div>
    )
}