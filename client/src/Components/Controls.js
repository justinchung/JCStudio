import React from 'react';
import Looper from './Looper.js';
import Metronome from './Metronome.js';
import TempoControl from './TempoControl.js';

class Controls extends React.Component {
	constructor(props) {
		super(props);

        this.state = {
            isRecording: false,
            isPlaying: false,
            metronome: false,
            barCount: 1
        };
	}

	render() {
		return (
			<div className="controller">
			    <div className="control_panel">
                    <div className="controls left">
                        <button className="control record" onClick={this.toggleRecord.bind(this)}>Record</button>
                        <button className="control play" onClick={this.togglePlay.bind(this)}>Play</button>
                    </div>
                    <div className="controls center">
                        <button className="control add_bar" onClick={this.addBar.bind(this)}>+</button>
                        <button className="control remove_bar" onClick={this.removeBar.bind(this)}>-</button>
                    </div>
                    <div className="controls right">
                        <Metronome context={this.props.context} on={this.metronomeOn}/>
                    </div>
                    <TempoControl />

                </div>
				<Looper active={this.state.isRecording} barCount={this.state.barCount}/>
			</div>
		);
	}

	toggleRecord() {
		var button = document.getElementsByClassName("control record")[0];
		var controls = document.getElementsByClassName("progress");
		if (!this.state.isRecording) {
			for (let i = 0; i < controls.length; i++) {
				controls[i].classList.add('playing');
			}
			button.classList.add('active');
			this.setState({
			    isRecording: true,
			    metronome: true
			});

		}
		else {
			for (let i = 0; i < controls.length; i++) {
				controls[i].classList.remove('playing');
			}
			button.classList.remove('active');
			this.setState({
			    isRecording: false,
			    metronome: false
			});
		}
	}

	togglePlay() {
		var button = document.getElementsByClassName("control play")[0];
		var controls = document.getElementsByClassName("progress");
		if (!this.state.isPlaying) {
			for (let i = 0; i < controls.length; i++) {
				controls[i].classList.add('playing');
			}
			button.classList.add('active');
			this.setState({
			    isPlaying: true,
			    metronome: true
			});
		}
		else {
			for (let i = 0; i < controls.length; i++) {
				controls[i].classList.remove('playing');
			}
			button.classList.remove('active');
			this.setState({
			    isPlaying: false,
			    metronome: false
			})
		}
	}


	addBar() {
	    this.setState({barCount: this.state.barCount + 1});
	}

	removeBar() {
	    if (this.state.barCount > 0) {
	        this.setState({barCount: this.state.barCount - 1});
	    }
	}

	componentDidMount() {
	}

	componentWillUnmount() {
  	}
}

export default Controls;