import React, {Component} from 'react';
import logo from './resources/images/logo.svg';

import MainControls from './components/MainControls'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="game">
        <h1 className='title'>
          <img src={logo} style={{height: '30px'}} alt="logo"/> Guess Tech Logo
        </h1>
        <MainControls />
      </div>
    );
  }
}

export default App;