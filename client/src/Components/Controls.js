import React from 'react';
import Looper from "./Looper.js";
import WAAClock from 'waaclock';

class Controls extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isRecording: false,
			isPlaying: false,
			barCount: 1,
			tempo: 5,
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
                    <div className="controls right">
                        <button className="control metronome" onClick={this.toggleMetronome.bind(this)}>Metronome</button>
                        <button className="control bpm" onClick={this.toggleBPM.bind(this)}>BPM</button>
                    </div>
                    <div className="controls center">
                        <button className="control add_bar" onClick={this.addBar.bind(this)}>+</button>
                        <button className="control remove_bar" onClick={this.removeBar.bind(this)}>-</button>
                    </div>
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
			this.setState({isRecording: true});
		}
		else {
			for (let i = 0; i < controls.length; i++) {
				controls[i].classList.remove('playing');
			}
			button.classList.remove('active');
			this.setState({isRecording: false});
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

			this.setState({isPlaying: true});

		}
		else {
			for (let i = 0; i < controls.length; i++) {
				controls[i].classList.remove('playing');
			}
			button.classList.remove('active');
			this.setState({isPlaying: false})
		}
	}

	toggleMetronome() {


	}

	toggleBPM() {

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
		window.addEventListener("keydown", this.onKeyDown.bind(this));
	}

	componentWillUnmount() {
        window.removeEventListener("keydown", this.onKeyDown.bind(this));
  	}

  	onKeyDown(e) {
  	    if (this.state.isRecording) {
  	        console.log(this.state.tempo);
  	    	var event = this.clock.setTimeout(function() { console.log('wow!') }, 0.001).repeat(this.state.tempo);
  	    }
        //var event = this.clock.callbackAtTime(function() { console.log('wow!') }, this.context.currentTime).repeat(5);
        //var event = this.clock.setTimeout(console.log('play'), this.context.currentTime).repeat(this.state.tempo);
  	}
}

export default Controls;