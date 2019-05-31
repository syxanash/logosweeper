import React, {Component} from 'react';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from "styled-components";
import { Window, themes, WindowHeader, WindowContent } from "react95";

import MainControls from './components/MainControls';
import './App.css'

import bgList from './resources/backgrounds-list.json';

class App extends Component {
  render() {
    console.info(`
 _  _     / ___       _  _        _ ___   ___    __   
| \\/ \\|\\|    |    |  / \\/ \\|/    |_| |     | |_||_    
|_/\\_/| |    |    |__\\_/\\_/|\\    | | |     | | ||__   
    _____    _  _       ___ _  _           _ ___ __ 
|\\||_  | | |/ \\|_)|/     | |_||_)      |V||_| | |_  
| ||__ | |^|\\_/| \\|\\     | | ||_) /    | || | | |__
                                                       
                                              - syx
    ` );

    return (
      <div className="game">
        <Helmet>
          <style>
          {
            `body { background-image: url("/backgrounds/${bgList[Math.floor(Math.random()*bgList.length)]}"); }`
          }
          </style>
        </Helmet>
        <ThemeProvider theme={themes.default}>
          <Window>
            <WindowHeader>
              <span role='img' aria-label='logo'>🎯</span> Guess Tech Logo
            </WindowHeader>
            <WindowContent className='window_content'>
              <MainControls />
            </WindowContent>
          </Window>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;