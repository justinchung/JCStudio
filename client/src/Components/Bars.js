import React from "react";

class Hit extends React.Component {
	render() {
		const hitStyle = {
			left: `${this.props.left}%`,
		};
		const {left, keycode} = this.props;
		return (
			<div className="hit" style={{left: left}}>{this.props.keycode}</div>
		);
	}
}

class Bar extends React.Component {
	render() {
		return (
			<div className="bar" onChange={this.finishRecording} onClick={this.onClickBar.bind(this)}>
                {this.renderHits()}
			</div>
		);
	}

	onClickBar() {
	    this.props.selectBar(this.props.barId);
	}

	renderHits() {
		var hits = [];
		if (this.props.hits != null) {
		    for (var i = 0; i < this.props.hits.length; i++) {
                hits.push(<Hit key={i} barId={i} left={this.props.hits[i].left} keycode={this.props.hits[i].keycode}/>);
            }
		}
		return hits;
	}
}

export default Bar;