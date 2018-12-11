import React from 'react';

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

	dragElement(element) {
	    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	    
	}
}

export default Hit;