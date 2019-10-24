import React from 'react';
import PropTypes from 'prop-types';

class LevelNotification extends React.Component {

    state = {
        open: true,
        notificationTimeoutSeconds: 3,
        countDownSeconds: 3,
        countDownInterval: null
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.level > 0 && this.props.level !== prevProps.level) {
            this.setState({
                open: true,
                countDownSeconds: this.state.notificationTimeoutSeconds,
                countDownInterval: this.startCountDown()
            });
        }
    }

    componentWillUnmount() {
        this.stopCounter();
    }

    startCountDown = () => {
        return setInterval(() => {
            if (this.counterFinished()) {
                this.stopCounter();
                this.notifyCounterFinished();
            } else {
                this.decrementCounter();
            }
        }, 1000)
    };

    counterFinished = () => {
        return this.state.countDownInterval && this.state.countDownSeconds === 1;
    };

    stopCounter = () => {
        clearInterval(this.state.countDownInterval);
        this.setState({
            open: false,
            countDownInterval: null
        });
    };

    notifyCounterFinished = () => {
        if (this.props.onFinish) {
            this.props.onFinish();
        }
    };

    decrementCounter = () => {
        this.setState(state => {
            return {
                countDownSeconds: state.countDownSeconds - 1
            }
        })
    };

    render() {
        return this.state.open && <div className="ui-root">
            <div className="ui-container">
                <div className="ui-header" style={{color: 'white'}}>Level {this.props.level}</div>
                <div className="ui-subheader" style={{color: 'green'}}>Starting in {this.state.countDownSeconds}</div>
            </div>
        </div>
    }
}

LevelNotification.propTypes = {
    level: PropTypes.number,
    onFinish: PropTypes.func
};

export default LevelNotification