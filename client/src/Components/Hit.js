import React from 'react';

class Hit extends React.Component {
    constructor(props) {
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);

        this.state = {
            dragging: false,
            x: this.props.left
        };
    }

	render() {
		const hitStyle = {
		    left: `${this.round(this.state.x)}%`
		};
		return (
			<div className="hit" style={hitStyle} data-id={this.props.dataId} onMouseDown={ this.onMouseDown }>
                {this.props.keycode}
			</div>
		);
	}

	round(x) {
	    return (Math.ceil(((parseFloat(x) / window.innerWidth) * 100) * 1.28) / 1.28 ) - 0.78125;
	}

    onMouseDown(e) {
        e.stopPropagation();
        e.preventDefault();
        if (e.button !== 0) return;
        this.setState({
            dragging: true
        });
    }

    onMouseUp(e) {
        e.stopPropagation();
        e.preventDefault();
        this.setState({
            dragging: false
        });

    }

    onMouseMove(e) {
        e.stopPropagation();
        e.preventDefault();
        if (!this.state.dragging) return;
        this.setState({
            x: e.pageX
        });
    }

    componentDidMount() {
        window.addEventListener('mouseup', this.onMouseUp);
        window.addEventListener('mousemove', this.onMouseMove);
    }

    componentWillUnmount() {
        window.removeEventListener('mouseup', this.onMouseUp);
        window.removeEventListener('mousemove', this.onMouseMove);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.dragging !== nextState.dragging || this.state.x !== nextState.x) {
            return true;
        }
        return false;
    }
}

export default Hit;