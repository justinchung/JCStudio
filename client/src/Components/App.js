import React, { Component } from 'react';
import AppNavbar from './AppNavbar.js';
import KeyBoard from './KeyBoard.js';
import Controls from './Controls.js';

import '../Styles/App.css';
import '../Styles/Keyboard.css';
import '../Styles/Controls.css';
import '../Styles/Looper.css';
import '../Styles/Tempo.css';
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
                <React.StrictMode>
                    <KeyBoard context={this.state.context} />
                    <Controls context={this.state.context} />
                </React.StrictMode>
            </div>
        );
    }
}

export default App;
