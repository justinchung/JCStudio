import React from 'react';
import Looper from './Looper.js';
import Metronome from './Metronome.js';
import BPMSlider from './TempoControl.js';

class Controls extends React.Component {
  state = {
    context: this.props.context,                // Audio Context

    isPlaying: false,                           // Flag - line and metronome active
    isRecording: false,                         // Flag - ine, metronome, and recording active
    metronomeSound: true,                       // Flag - metronome produces sound
    bpm: 120,                                   // Tempo
    barCount: 1,                                // How many bars present

    nextNoteTime: 0.0,
    noteLength: 0.05,
    scheduleAheadTime: .1,
    quarterNote: 1,

    unlocked: false,

    animateDuration: 8                          // Initially set it to 8, matches default 120 BPM
	}

  render() {
    const duration = (60 / this.state.bpm) * 16;
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
				<Looper context={ this.props.context} barCount={this.state.barCount} bpm={ this.state.bpm }
				active={ this.state.isPlaying } animateDuration={ duration } isRecording={ this.state.isRecording}/>
			</div>
		);
	}


  // Callback used in setInterval, schedules notes using lookahead and overlap
  scheduler = () => {
    while (this.state.nextNoteTime < this.state.context.currentTime + this.state.scheduleAheadTime) {
      this.scheduleNote(this.state.quarterNote, this.state.nextNoteTime);
      this.nextNote();
    }
  }

  // Advances to the next Metronome note and schedules it. Advances to the next quarter note
  nextNote = () => {
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
  scheduleNote = (beatNumber, time) => {
    var osc = this.state.context.createOscillator();
    osc.connect(this.state.context.destination);
    osc.frequency.value = 440;
    if (beatNumber % 4 === 1) {
      osc.frequency.value = 880;
    }

<<<<<<< Updated upstream
    if (this.state.metronomeSound) {
      osc.start(time);
      osc.stop(time + this.state.noteLength);
      //console.log('note');
=======
    // Plays certain frequency given the value of quarter note
    scheduleNote(beatNumber, time) {
        var osc = this.state.context.createOscillator();
        osc.connect(this.state.context.destination);
        osc.frequency.value = 440;
        if (beatNumber % 4 === 1) {
            osc.frequency.value = 880;
        }

        if (this.state.metronomeSound) {
            osc.start(time);
            osc.stop(time + this.state.noteLength);
        }
>>>>>>> Stashed changes
    }
  }


  playMetronome = () => {
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
      this.setState({
        quarterNote: 0,
        nextNoteTime: this.state.context.currentTime,
      });
      var intervalId = window.setInterval(this.scheduler, 25.0)
      this.setState({
        intervalId: intervalId,
      });
    }
    else {
      window.clearInterval(this.state.intervalId);
      this.setState({
        unlocked: false,
        intervalId: null
      });
    }
  }

  // Callback from Metronome, toggle sound
  toggleMetronome = () => {
    this.setState((prevState) => ({
      metronomeSound: !prevState.metronomeSound
    }));
  }

  // Toggle recording, calls togglePlay
  toggleRecord = () => {
    this.setState((prevState) => ({
      isRecording: !prevState.isRecording
    }));
    this.togglePlay();
	}

    // Toggle play, triggers CSS animation
	togglePlay = () => {
    this.setState((prevState) => ({
      isPlaying: !prevState.isPlaying
    }));
    this.playMetronome();
	}

  // Add a bar to the bottom
	addBar = () => {
    this.setState((prevState) => ({
      barCount: prevState.barCount + 1
    }));
	}

  // Remove a bar from the bottom
	removeBar = () => {
    if (this.state.barCount > 0) {
      this.setState((prevState) => ({
        barCount: prevState.barCount - 1
      }));
    }
	}

  // Callback from BPMSlider, change the tempo of the Metronome
	tempoOnChange = (bpm) => {
    this.setState({
      bpm: bpm,
      isPlaying: false,
      isRecording: false
    });
    if (this.state.intervalId) {
      window.clearInterval(this.state.intervalId);
      this.setState({
        intervalId: null
      });
    }
	}
}

export default Controls;