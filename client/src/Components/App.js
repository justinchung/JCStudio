import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import KeyBoard from './KeyBoard';
import Controls from './Controls';
import Sequencer from './Sequencer';

import '../Styles/App.css';
import '../Styles/Keyboard.css';
import '../Styles/Controls.css';
import '../Styles/Looper.css';
import '../Styles/Bar.css';
import '../Styles/Hit.css';
import '../Styles/Tempo.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  audioContext = new window.AudioContext();
  state = {
    context: this.audioContext
  };

  render() {
    return (
      <Sequencer ctx={this.state.context} />
    );
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
