import React, { Component } from 'react';
import AppNavbar from './AppNavbar.js';
import KeyBoard from './KeyBoard.js';
import Controls from './Controls.js';
import Metronome from './Metronome.js';
import TempoControl from './TempoControl.js';

import '../Styles/App.css';
import '../Styles/keyboard.css';
import '../Styles/controls.css';
import '../Styles/looper.css';
import '../Styles/tempo.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
    constructor(props) {
        super(props);
        var audioContext = new window.AudioContext();
        this.state = {
            context: audioContext
        };
    }

    render() {
        return (
            <div className="App">
                <AppNavbar />
                <KeyBoard context={this.state.context} />
                <Controls context={this.state.context} />
            </div>
        );
    }
}

export default App;
