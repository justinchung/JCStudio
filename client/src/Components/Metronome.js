import React from 'react';
import {
	RadioButtonChecked,
  RadioButtonUnchecked
} from '@material-ui/icons';

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