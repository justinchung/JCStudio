import React from 'react';
import { Snare } from '../Engines/Snare.js';

class Sequencer extends React.Component {
  state = {
    context: this.props.ctx,
    playing: false,
    step: 0,
    steps: 8,
    hits: [
      [1, 1, 1, 1, 1, 1, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  }

  render() {
    console.log(this.state.playing);

    return (
      <div className='sequencer'>
        <button onClick={this.handleClickPlay}>SEQUENCER</button>
      </div>
    );
  }

  scheduleHit = (row, pos, keycode) => {
    const cloned = this.state.hits.slice(0);
    cloned[row][pos] = keycode;
    
    this.setState({ hits: cloned });
  }

  handleClickPlay = () => {
    this.setState(state => ({ playing: !state.playing }));
    
    if (this.state.playing) {
      this.interval = setInterval(() => {
        this.setState(state => ({ 
          step: state.step < state.steps - 1 ? state.step + 1 : 0 }),
        () => {
          const next = this.state.hits[0][this.state.step];
          if (next > 0) {
            var snare = new Snare(this.state.context);
            snare.trigger(this.state.context.currentTime);
            console.log(this.state.step);
          }
          
        })
      }, 1000)
    }
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    const keycode = event.keyCode;
    console.log(keycode);
    const row = 1;
    const pos = this.state.step++;

    this.scheduleHit(row, pos, keycode);
  }
}

export default Sequencer;