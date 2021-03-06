import React from 'react';
import ReactDOM from 'react-dom';
import Bar from './Bars.js';

import { Kick } from '../Engines/Kick.js';


class Looper extends React.Component {
  state = {
    context: this.props.context,
    bars: [[]],
    current: 0,
    active: this.props.active,
    intervals: []
  };

  line = React.createRef();

  round = (x) => {
    return (Math.ceil(((parseFloat(x) / window.innerWidth) * 100) * 1.28) / 1.28 ) - 0.78125;
  }

  createHit = (left, keycode) => {
    var hitInfo = {
      //left: this.round(left),
      left: left,
      keycode: keycode,
      //index: this.round(left) * 1.28
    };
    return hitInfo;
  }

  addHit = (left, keycode) => {
    let hit = this.createHit(left, keycode);            // Data fields of hit
    var temp = this.state.bars;                         // Copy original set of hits
    console.log(temp);
    temp[this.state.current].push(hit);                 // Push new hit
    //temp[this.state.current][hit.index]
    this.setState({ bars: temp });                        // Update set
  }

  selectBar = (barId) => {
    this.setState({current: barId});
  }

  renderBars = () => {
    let bars = [];
    for (let i = 0; i < this.props.barCount; i++) {
      bars.push(<Bar key={i} barId={i} hits={this.state.bars[i]} selectBar={this.selectBar}/>);
    }
    return bars;
  }

  render() {
    if (this.state.active) {
      const speed = {
      animationDuration: `${this.props.animateDuration}s`,
      };
      return (
        <div className="looper">
          <div className="progress bg playing" style={speed}></div>
          <div className="progress line playing" ref={this.line} style={speed}></div>
          {this.renderBars()}
        </div>
      );
    }
    else {
      const lineStyle = {
        left: "0%"
      };
      const bgStyle = {
        width: "0%"
      };

      return (
        <div className="looper">
          <div className="progress bg" style={bgStyle}></div>
          <div className="progress line" ref={this.line} style={lineStyle}></div>
          {this.renderBars()}
        </div>
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.barCount !== prevProps.barCount) {
      if (this.props.barCount > prevProps.barCount) {
        this.state.bars.push([]);
      }
      else if (this.props.barCount < prevProps.barCount) {
        this.setState({bars: this.state.bars.slice(0 ,-1)});
      }
      this.setState({current: this.props.barCount - 1});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active === false) {
      for (var i = 0; i < this.state.intervals.length; i++) {
        window.clearInterval(this.state.intervals[i]);
      }
      this.setState({
        intervals: []
      })
    }
    if (nextProps.active !== this.state.active) {
      this.setState({
        active: nextProps.active
      });
    }
  }

  componentDidMount() {
    window.addEventListener("keydown", this.keydown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.keydown);
  }

  onKeyDown = (e) => {
    const key = document.querySelector(`[data-keycode="${e.keyCode}"]`);

    if (this.props.isRecording) {
      var loop = () => {
        var osc = this.state.context.createOscillator();
        osc.connect(this.state.context.destination);
        osc.frequency.value = 200;
        var time = this.state.context.currentTime + .1;
        if (this.state.active) {
          osc.start(time);
          osc.stop(time + 0.2);
        }
      }

      var loop1 = () => {
        console.log("hi");
        var kick = new Kick(this.state.context);
        kick.trigger(this.state.context.currentTime);
      }

      const interval = ((60 / this.props.bpm) * 16) * 1000;
      var id = window.setInterval(loop1, interval)
      let temp = this.state.intervals;
      temp.push(id);
      this.setState({
        intervals: temp
      })
    }

    if (this.props.isRecording && key && key.getAttribute("data-show") === "true") {
      const keyValue = key.getAttribute("data-key");
      let left = window.getComputedStyle(ReactDOM.findDOMNode(this.line.current)).getPropertyValue("left");
      this.addHit(left, keyValue);
    }
  }
}

export default Looper;