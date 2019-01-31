import React from 'react';

class BPMSlider extends React.Component {
  render() {
    return (
      <input className="bpm-slider range" type="range" value={this.props.bpm}
      min="60" max="150" onChange={this.onChange.bind(this)} />
    );
  }

  onChange = (e) => {
    this.props.onChange(e.target.value);
  }
}

export default BPMSlider;