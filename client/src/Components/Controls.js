import React from 'react';
import Looper from './Looper.js';
import Metronome from './Metronome.js';
import BPMSlider from './TempoControl.js';

class Controls extends React.Component {
	constructor(props) {
		super(props);

        this.toggleRecord = this.toggleRecord.bind(this);
		this.togglePlay = this.togglePlay.bind(this);
		this.addBar = this.addBar.bind(this);
		this.removeBar = this.removeBar.bind(this);

        var audioContext = this.props.context;
        this.scheduler = this.scheduler.bind(this);
        this.playMetronome = this.playMetronome.bind(this);

        this.tempoOnChange = this.tempoOnChange.bind(this);
        this.toggleMetronome = this.toggleMetronome.bind(this);

        this.onKeyDown = this.onKeyDown.bind(this);

        this.state = {
            context: this.props.context,                // Audio Context

            isPlaying: false,                            // Flag - line and metronome active
            isRecording: false,                         // Flag - ine, metronome, and recording active
            metronome: true,                            // Flag - metronome produces sound
            bpm: 120,                                   // Tempo
            barCount: 1,                                // How many bars present

            sound: true,
            nextNoteTime: 0.0,
            noteLength: 0.05,
            scheduleAheadTime: .1,
            quarterNote: 1,

            unlocked: false
        };
	}

	render() {
		return (
			<div className="controller">
			    <div className="control_panel">
                    <div className="controls left">
                        <button className="control record" onClick={ this.toggleRecord }>Record</button>
                        <button className="control play" onClick={ this.togglePlay }>Play</button>
                    </div>
                    <div className="controls center">
                        <button className="control add_bar" onClick={ this.addBar }>+</button>
                        <button className="control remove_bar" onClick={ this.removeBar }>-</button>
                    </div>
                    <div className="controls right">
                        <Metronome toggleMetronome={ this.toggleMetronome } />
                        <BPMSlider onChange={ this.tempoOnChange }/>
                    </div>
                </div>
				<Looper active={this.state.isRecording} barCount={this.state.barCount} active={ this.state.isRecording || this.state.isPlaying } animateSpeed={ this.state.bpm }/>
			</div>
		);
	}


    // Callback used in setInterval, schedules notes using lookahead and overlap
	scheduler() {
        while (this.state.nextNoteTime < this.state.context.currentTime + this.state.scheduleAheadTime) {
            this.scheduleNote(this.state.quarterNote, this.state.nextNoteTime);
            this.nextNote();
        }
    }

    // Advances to the next Metronome note and schedules it. Advances to the next quarter note
    nextNote() {
        var secondsPerBeat = 60.0 / this.state.bpm;

        this.setState({
            nextNoteTime: this.state.nextNoteTime + secondsPerBeat,
            quarterNote: this.state.quarterNote + 1
        });

        if (this.state.quarterNote === 5) {
            this.setState({
                quarterNote: 1
            });
        }
    }

    // Plays certain frequency given the value of quarter note
    scheduleNote(beatNumber, time) {
        var osc = this.state.context.createOscillator();
        osc.connect(this.state.context.destination);
        osc.frequency.value = 440;
        if (beatNumber % 4 === 1) {
            osc.frequency.value = 880;
        }

        if (this.state.sound) {
            osc.start(time);
            osc.stop(time + this.state.noteLength);
        }
    }


    playMetronome() {
        // Debounce
        if (!this.state.unlocked) {
            var buffer = this.state.context.createBuffer(1, 1, 22050);
            var node = this.state.context.createBufferSource();
            node.buffer = buffer;
            node.start(0);
            this.setState({ unlocked: true });
        }

        // setInterval repeatedly calls the scheduler which simulates an overlap for precision
        if (!this.state.isPlaying) {
            console.log('metronome playing');
            this.setState({
                quarterNote: 0,
                nextNoteTime: this.state.context.currentTime,
                isPlaying: true,
            });
            var intervalId = window.setInterval(this.scheduler, 25.0)
            this.setState({
                intervalId: intervalId,
            });

        }
        else {
            console.log('metronome stopped');
            this.setState({
                unlocked: false,
                isPlaying: false
            });
            window.clearInterval(this.state.intervalId);
        }
    }

    // Callback from Metronome, toggle sound
    toggleMetronome() {
        this.setState({ sound: !this.state.sound });
    }

    // Toggle recording, calls togglePlay
    toggleRecord() {
        this.togglePlay();
        this.setState({ isRecording: !this.state.isRecording });
	}

    // Toggle play, triggers CSS animation
	togglePlay() {
	    this.playMetronome();

		var button = document.getElementsByClassName("control play")[0];
		var controls = document.getElementsByClassName("progress");
		if (this.state.isPlaying) {
			for (let i = 0; i < controls.length; i++) {
				controls[i].classList.add('playing');
			}
			button.classList.add('active');

		}
		else {
			for (let i = 0; i < controls.length; i++) {
				controls[i].classList.remove('playing');
			}
			button.classList.remove('active');

		}
	}

    // Add a bar to the bottom
	addBar() {
	    this.setState({ barCount: this.state.barCount + 1 });
	}

    // Remove a bar from the bottom
	removeBar() {
	    if (this.state.barCount > 0) {
	        this.setState({barCount: this.state.barCount - 1});
	    }
	}

    // Callback from BPMSlider, change the tempo of the Metronome
	tempoOnChange(bpm) {
	    this.setState({ bpm: bpm });
	    console.log(this.state.bpm);
	}

	componentDidMount() {
	    //window.addEventListener("keydown", this.onKeyDown);
	}

	componentWillUnmount() {
	    //window.removeEventListener("keydown", this.onKeyDown);
	}

    onKeyDown() {
        var loop = () => {
            var osc = this.state.context.createOscillator();
            osc.connect(this.state.context.destination);
            osc.frequency.value = 750;
            var time = this.state.context.currentTime + this.state.scheduleAheadTime
            osc.start(time);
            osc.stop(time + this.state.noteLength);
        }

        window.setInterval(loop, 5000);
    }
}

export default Controls;