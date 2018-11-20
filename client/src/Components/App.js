import React, { Component } from 'react';
import AppNavbar from './AppNavbar.js';
import KeyBoard from './KeyBoard.js';
import Controls from './Controls.js';
import Metronome from './Metronome.js';

import '../Styles/App.css';
import '../Styles/keyboard.css';
import '../Styles/controls.css';
import '../Styles/looper.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// This class is a wrapper of all the components
class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar />
        <KeyBoard />
        <Controls />
        <Metronome />
      </div>
    );
  }
}

export default App;
