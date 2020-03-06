import React from 'react';
import PropTypes from 'prop-types';

export const RESOLUTION = {
    width: 1024,
    height: 1024
}

class Canvas extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fpsInterval: 1000 / props.fps,
            lastUpdate: Date.now(),
            context: null
        }
    }

    componentDidMount() {
        this.setState({
            context: this.refs.canvas.getContext('2d')
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { screenWidth, screenHeight } = this.props;
        this.refs.canvas.width = RESOLUTION.width;
        this.refs.canvas.height = RESOLUTION.height;
        this.refs.canvas.style.width = `${screenWidth}px`;
        this.refs.canvas.style.height = `${screenHeight}px`;

        // this.refs.canvas.width = screenWidth;
        // this.refs.canvas.height = screenHeight;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext): boolean {
        const currentScreenWidth = this.props.screenWidth;
        const currentScreenHeight = this.props.screenHeight;

        //We only want to trigger a render if the screen changes
        //or the context is null. Otherwise ever adjustment to the last update
        //will trigger a render
        return currentScreenWidth !== nextProps.screenWidth ||
            currentScreenHeight !== nextProps.screenHeight ||
            (this.props.context === null && nextProps.context !== null) ||
            this.props.children !== nextProps.children;
    }

    render() {
        return (
            <React.Fragment>
                <canvas ref="canvas" />
                <div style={{ position: 'fixed', top: 0 }}>
                    {React.cloneElement(this.props.children, this.getChildrenProps())}
                </div>
            </React.Fragment>
        )
    }

    getChildrenProps = () => {
        const props = { ...this.props };
        delete props['children'];

        return {
            ...props,
            screenWidth: RESOLUTION.width,
            screenHeight: RESOLUTION.height,
            context: this.state.context,
            canDraw: this.canDraw
        };
    };

    canDraw = () => {
        if (this.state.context) {

            if (this.timeSinceLastUpdate() > this.state.fpsInterval) {
                this.setNextAllowedUpdate();
                return true
            }
        }
        return false;
    };

    timeSinceLastUpdate = () => {
        return Date.now() - this.state.lastUpdate;
    };

    setNextAllowedUpdate = () => {
        this.setState({
            lastUpdate: Date.now() - (this.timeSinceLastUpdate() % this.state.fpsInterval)
        });
    }
}

Canvas.propTypes = {
    fps: PropTypes.number,

    screenWidth: PropTypes.number,
    screenHeight: PropTypes.number,
    children: PropTypes.object
};

export default Canvas