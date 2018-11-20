import React from 'react';
import WAAClock from 'waaclock';

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            steps: [0, 0, 0, 0],
            currentStep: 0,
            playing: false
        };
    }

    triggerSound(context, deadline) {
        console.log("SOUND");
    }

    handleTick({ deadline }) {
        console.log("Tick");
        const { currentStep, steps } = this.state;
        const newCurrentStep = currentStep + 1;

        if (steps[newCurrentStep % steps.length]) {
            this.triggerSound(this.context, deadline);
        }

        this.setState({ currentStep: newCurrentStep });
    }

    handlePlayPress() {
        if (!this.state.playing) {
            this.setState({
                playing: true
            });
            this.clock.start();
        }
        else {
            this.setState({
                playing: false
            });
            this.clock.stop();
        }
    }

    componentDidMount() {
        this.context = new window.AudioContext();
        this.clock = new WAAClock(this.context);
    }

    render() {
        const {currentStep, playing, steps} = this.state;

        return(
            <div className="sequencer-wrapper">
                <div className="step-display">
                    {`Current Step: ${currentStep % steps.length}`}
                </div>
                <button className="play-button" onClick={() => this.handlePlayPress()}>
                    {playing? 'Stop' : 'Play'}
                </button>
            </div>
        );
    }
}
export default Player;
//ReactDOM.render(<Player />, document.getElementById('root'));