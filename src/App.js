import React, {Component} from 'react';

import MainControls from './components/MainControls'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="game">
        <h1><span role="img" aria-label="bullseye">🎯</span> Guess Nerd Logo 1.0</h1>
        <MainControls />
      </div>
    );
  }
}

export default App;