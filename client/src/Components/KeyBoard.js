import React from 'react';
import ModeSelector from './ModeSelector.js';
import {Default, Piano} from './Modes.js';

// This class holds the keyboard and the mode selector (determines the type of keyboard to display)
class KeyBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: "Default",
			fired_keys: {},
			alert: true,
		};
	}

    // Set the mode of keyboard, passed to child component ModeSelector
    onSelectMode(selectedMode) {
        this.setState({mode: selectedMode});
    }

	render() {
	    // Display default keyboard
		if (this.state.mode === "Default") {
			return (
			    <div id="keyboard-wrapper">
                    <ModeSelector onSelectMode={this.onSelectMode.bind(this)}/>
                    {Default()}
                </div>
			);
		}
		// Display piano keyboard
		else if (this.state.mode === "Piano") {
			return (
                <div id="keyboard-wrapper">
                    <ModeSelector onSelectMode={this.onSelectMode.bind(this)}/>
                    {Piano()}
                </div>
            );
		}
		// Display other keyboards (not yet implemented)
		else {
		    return (
		        <div id="keyboard-wrapper">
                    <ModeSelector onSelectMode={this.onSelectMode.bind(this)}/>
                    Coming soon!
                </div>
		    );
		}
	}

	componentDidMount() {
    	window.addEventListener("keydown", this.onKeyDown.bind(this));
    	window.addEventListener("keyup", this.onKeyUp.bind(this));
    	document.addEventListener("mousedown", this.onMouseDown.bind(this));
    	document.addEventListener("mouseup", this.onMouseUp.bind(this));
  	}

  	componentWillUnmount() {
        window.removeEventListener("keydown", this.onKeyDown.bind(this));
        window.removeEventListener("keyup", this.onKeyUp.bind(this));
        document.removeEventListener("mousedown", this.onMouseDown.bind(this));
    	document.removeEventListener("mouseup", this.onMouseUp.bind(this));
  	}

    // When a key is pressed, add 'playing' to individual key's class list to trigger animation
  	onKeyDown(e) {
    	const keyCode = e.keyCode;
   		const key = document.querySelector(`[data-keycode="${keyCode}"]`);

	    if (key && key.getAttribute("data-show") === "true") {
    		if (!this.state.fired_keys[keyCode]) {

        		this.setState({fired_keys: {keyCode: true}});
      		}
      		key.classList.add('playing');
    	}
 	}

    // When key is lifted, remove 'playing' from individual key's class list to end animation
  	onKeyUp(e) {
    	const keyCode = e.keyCode;
    	const key = document.querySelector(`[data-keycode="${e.keyCode}"]`);

    	if (key && key.getAttribute("data-show") === "true") {
      		if (this.state.fired_keys[keyCode]) {
        		delete this.state.fired_keys[keyCode];
      		}
      		key.classList.remove('playing');
    	}
  	}

    // When a key is pressed, add 'playing' to individual key's class list to trigger animation
  	onMouseDown(e) {
  		const key = e.target;
  		const keyCode = key.getAttribute("data-keycode");

  		if (key && key.getAttribute("data-show") === "true") {
  			if (this.state.fired_keys[keyCode]) {
  				this.setState({fired_keys: {keyCode: true}});
  			}
  			key.classList.add('playing');
  		}
  	}

    // When key is lifted, remove 'playing' from individual key's class list to end animation
  	onMouseUp(e) {
  		const key = e.target;
  		const keyCode = key.getAttribute("data-keycode");

  		if (key && key.getAttribute("data-show") === "true") {
      		if (this.state.fired_keys[keyCode]) {
        		delete this.state.fired_keys[keyCode];
      		}
      		key.classList.remove('playing');

      		if (this.state.alert === true) {
      			window.alert("You don't have to use your mouse. Just use your keyboard!");
      			this.setState({alert: false});
      		}
    	}
  	}
}

export default KeyBoard;