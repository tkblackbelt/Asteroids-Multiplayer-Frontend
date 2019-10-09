import React from 'react';
import PropTypes from 'prop-types';

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
        const {screenWidth, screenHeight} = this.props;

        this.refs.canvas.width = screenWidth;
        this.refs.canvas.height = screenHeight;
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
                <canvas ref="canvas"/>
                <div style={{position: 'fixed', top: 0}}>
                    {React.cloneElement(this.props.children, this.getChildrenProps())}
                </div>
            </React.Fragment>
        )
    }

    getChildrenProps = () => {
        const props = {...this.props};
        delete props['children'];

        return {
            ...props,
            context: this.state.context,
            canDraw: this.canDraw
        };
    };

    canDraw = () => {
        if (this.state.context) {
            const {fpsInterval} = this.state;

            if (this.timeSinceLastUpdate() > fpsInterval) {
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