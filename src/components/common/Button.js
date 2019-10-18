import React from 'react';
import PropTypes from 'prop-types';
import '../../App.css';

const baseStyle = {
    opacity: .8,
};

const hoverStyle = {
    opacity: 1,
};

class Button extends React.Component {

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

    getStyle = () => {
        const otherStyles = this.state.mouseEntered ? hoverStyle : {};
        return {
            ...baseStyle,
            ...otherStyles,
            ...this.props.style
        }
    };

    render() {
        const {onClick, text} = this.props;

        return <button
            className="ui-button"
            style={this.getStyle()}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onClick={onClick}>{text}</button>;
    }
}

Button.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string,
    style: PropTypes.object
};

export default Button