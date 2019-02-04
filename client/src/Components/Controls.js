import React from 'react';
import Looper from './Looper.js';
import Metronome from './Metronome.js';
import BPMSlider from './TempoControl.js';

import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { 
  PlayCircleFilled,
  PauseCircleFilled,
  AddCircle,
  RemoveCircle,
} from '@material-ui/icons';

class Controls extends React.Component {
  state = {
    context: this.props.context,

    isPlaying: false,
    isRecording: false,
    metronomeSound: true,
    bpm: 120,
    barCount: 1,

    nextNoteTime: 0.0,
    noteLength: 0.05,
    scheduleAheadTime: .1,
    quarterNote: 1,

    unlocked: false,

    animateDuration: 8                          // Initially set it to 8, matches default 120 BPM
	}

  render() {
    const { classes } = this.props;
    const duration = (60 / this.state.bpm) * 16;
		return (
			<Grid container className={classes.controller}>
        <Grid item xs={8} className={classes.left}>
          { this.state.isPlaying ? <PauseCircleFilled className={classes.button} onClick={this.togglePlay}/> : <PlayCircleFilled className={classes.button} onClick={this.togglePlay}/> }
          <AddCircle className={classes.button} onClick={this.addBar}/>
          <RemoveCircle className={classes.button} onClick={this.removeBar}/>
        </Grid>
        <Grid item xs={4} className={classes.right}>
          <Metronome toggleMetronome={ this.toggleMetronome } context={this.state.context} isPlaying={this.state.isPlaying}/>
          <BPMSlider onChange={ this.tempoOnChange }/>
        </Grid>
        <Grid item xs={12}>
    			<Looper context={ this.props.context} barCount={this.state.barCount} bpm={ this.state.bpm }
    			active={ this.state.isPlaying } animateDuration={ duration } isRecording={ this.state.isRecording}/>
        </Grid>
			</Grid>
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

    if (this.state.metronomeSound) {
      osc.start(time);
      osc.stop(time + this.state.noteLength);
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

  // Toggle play, triggers CSS animation
	togglePlay = () => {
    this.setState( { isPlaying: !this.state.isPlaying } );
    this.playMetronome();
	}

  // Add a bar to the bottom
	addBar = () => {
    this.setState( { barCount: ++this.state.barCount } );
	}

  // Remove a bar from the bottom
	removeBar = () => {
    if (this.state.barCount > 0) {
      this.setState({ barCount: --this.state.barCount }); 
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

const styles = {
  controller: {
    padding: '12px 0px'
  },
  left: {
    textAlign: 'left',
    paddingLeft: 64
  },
  right: {
    textAlign: 'right',
    paddingRight: 64
  },
  button: {
    fontSize: 32
  }
}

export default withStyles(styles)(Controls);