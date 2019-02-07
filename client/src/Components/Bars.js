import React from 'react';
import Hit from './Hit.js';

class Bar extends React.Component {
  state = {
    active: true,
    hits: this.props.hits
  };

  render() {
    return (
      <div className="bar" data-id={this.props.barId} onChange={this.finishRecording} onClick={this.onClickBar}>
        {this.renderHits()}
      </div>
    );
  }

  onClickBar = () => {
    this.props.selectBar(this.props.barId);
  }

  renderHits = () => {
    var hits = [];
    if (this.props.hits != null) {
      for (var i = 0; i < this.props.hits.length; i++) {
        hits.push(<Hit key={i} dataId={i} left={this.props.hits[i].left} keycode={this.props.hits[i].keycode} />);
      }
    }
    return hits;
  }

  onMouseDown = (e) => {
    e.preventDefault();
    console.log(e.target);
  }
}

export default Bar;

// TODO: IMPLEMENT A SEQUENCER
// IDEA #1 Drum Machine: use a variable to keep track of the current note: currentNote
//      - This kind of limits the different types of timing the user can do
//      - Can allow user to have better precision on how they want to time sounds