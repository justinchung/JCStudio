import React from 'react';
import { Slider } from '@material-ui/lab';

class BPMSlider extends React.Component {
  render() {
    return (
      <input className="bpm-slider range" type="range" value={this.props.bpm}
      min="60" max="150" onChange={this.onChange} />
    );
  }

  onChange = (e) => {
    this.props.onChange(e.target.value);
  }
}

export default BPMSlider;