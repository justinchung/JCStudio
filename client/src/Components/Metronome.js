import React from 'react';

class Metronome extends React.Component {
  render() {
    return (
      <button className="control metronome" onClick={this.toggle}>Metronome</button>
    );
  }

  toggle = () => {
    this.props.toggleMetronome();
  }
}

export default Metronome;