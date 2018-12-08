import React from 'react';
import ReactDOM from 'react-dom';
import Bar from './Bars.js';

class Looper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bars: [[]],
			current: 0,
			active: this.props.active
		};
	}

	createHit(left, keycode) {
		var hitInfo = {
			left: left,
			current: null,
			keycode: keycode,
		};
		return hitInfo;
	}

	addHit(left, keycode) {
		let hit = this.createHit(left, keycode);
		var temp = this.state.bars;
		temp[this.state.current].push(hit);
		this.setState({bars: temp});
	}

    selectBar(barId) {
        this.setState({current: barId});
    }

	renderBars() {
		let bars = [];
		for (let i = 0; i < this.props.barCount; i++) {
		    bars.push(<Bar key={i} barId={i} hits={this.state.bars[i]} selectBar={this.selectBar.bind(this)}/>);
		}
		return bars;
	}

	render() {
	/*
	    const lineStyle = {
            left: "0%"
        };
        const bgStyle = {
            width: "0%"
        };
	    return (
	        <div className="looper">
                <div className="progress bg" style={bgStyle}></div>
                <div className="progress line" ref="line" style={lineStyle}></div>
                {this.renderBars()}
            </div>
	    );
*/
	    if (this.state.active) {
	        let duration = (60 / this.props.animateSpeed) * 16;
	        const speed = {
	            animationDuration: `${duration}s`,
	        };
            return (
                <div className="looper">
                    <div className="progress bg playing" style={speed}></div>
                    <div className="progress line playing" ref="line" style={speed}></div>
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
                    <div className="progress line" ref="line" style={lineStyle}></div>
                    {this.renderBars()}
                </div>
            );
	    }

	}

	componentDidUpdate(prevProps) {
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
	    if (nextProps.active !== this.state.active) {
	        this.setState({
                active: nextProps.active
            });
	    }
	}

    shouldComponentUpdate() {

    }


	componentWillMount() {
		window.addEventListener("keydown", this.onKeyDown.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener("keydown", this.onKeyDown.bind(this));
	}

	onKeyDown(e) {
		const key = document.querySelector(`[data-keycode="${e.keyCode}"]`);

		if (this.props.active && key && key.getAttribute("data-show") === "true") {
			const keyValue = key.getAttribute("data-key");
			let left = window.getComputedStyle(ReactDOM.findDOMNode(this.refs.line)).getPropertyValue("left");
			this.addHit(left, keyValue);
		}
	}
}

export default Looper;