import React, {Component} from 'react';

import MainControls from './components/MainControls'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="game">
        <h1 className='title'>
          <span role="img" aria-label="bullseye">🎯</span> Guess Tech Logo 1.0
        </h1>
        <MainControls />
      </div>
    );
  }
}

export default App;