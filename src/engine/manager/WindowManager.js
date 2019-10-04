import React from 'react';

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

export default WindowManager