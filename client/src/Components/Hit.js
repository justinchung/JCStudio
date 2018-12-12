import React from 'react';
import ReactDOM from 'react-dom';

class Hit extends React.Component {
    constructor(props) {
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);

        this.state = {
            dragging: false
        };
    }

	render() {
		const hitStyle = {
			left: `${this.props.left}%`,
		};
		const {left, keycode} = this.props;
		return (
			<div className="hit" style={{left: this.props.left}} data-id={this.props.dataId}
			onMouseDown={ this.onMouseDown } onMouseUp={ this.onMouseUp } onMouseMove={ this.onMouseMove }
			>
			    {this.props.keycode}
			</div>
		);
	}

    onMouseDown(e) {
        console.log('mouse down');
        if (e.button !== 0) return;
        console.log(e.pageX, e.pageY);
        this.setState({
            x: e.pageX,
            dragging: true
        })

        e.stopPropagation();
        e.preventDefault();
    }

    onMouseUp(e) {
        console.log('mouse up');
        this.setState({
            dragging: false
        });
        e.stopPropagation();
        e.preventDefault();
    }

    onMouseMove(e) {
        console.log('mouse move');
        if (!this.state.dragging) return;
        this.setState({
            x: e.pageX
        });
    }

    componentDidMount() {
        window.addEventListener('onMouseUp', this.onMouseUp);
        window.addEventListener('onMouseMove', this.onMouseMove);
    }

    componentWillUnmount() {
        window.removeEventListener('onMouseUp', this.onMouseUp);
        window.removeEventListener('onMouseMove', this.onMouseMove);
    }


}

export default Hit;