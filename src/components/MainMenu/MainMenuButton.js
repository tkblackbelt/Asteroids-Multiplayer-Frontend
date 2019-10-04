import React from 'react';


const baseStyle = {
    width: '300px',
    height: '50px',
    fontSize: '20px',
    opacity: .8,
    backgroundColor: 'aquamarine',
    margin: '10px',
    fontFamily: 'zorque',
    border: '0',
};

const hoverStyle = {
    opacity: 1,
};

export default class MainMenuButton extends React.Component {

    state = {
        mouseEntered: false
    };

    onMouseEnter = () => {
        this.setState({
            mouseEntered: true
        })
    };

    onMouseLeave = () => {
        this.setState({
            mouseEntered: false
        })
    };

    render() {
        const {onClick, text} = this.props;
        const {mouseEntered} = this.state;

        const otherStyles = mouseEntered ? hoverStyle : {};
        const style = {
            ...baseStyle,
            ...otherStyles
        };

        return <button
            style={style}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onClick={onClick}>{text}</button>;
    }
};