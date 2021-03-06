import React from 'react';
import PropTypes from 'prop-types';

class WindowManager extends React.Component {

    state = {
        width: 0,
        height: 0,
    };

    componentDidMount() {
        window.addEventListener('resize', this.resizeWindow);
        this.resizeWindow();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeWindow)
    }

    resizeWindow = () => {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        });
    };

    render() {
        console.log("WINDOW RENDER");
        return (
            <div style={{
                width: `${this.state.width}px`,
                height: `${this.state.height}px`,
                position: 'fixed',
            }}>
                {React.cloneElement(this.props.children, {
                    screenWidth: this.state.width,
                    screenHeight: this.state.height
                })}
            </div>
        );
    }
}

WindowManager.propTypes = {
    children: PropTypes.object.isRequired
};

export default WindowManager