import React, {Component} from 'react';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from "styled-components";
import { Window, themes, WindowHeader, WindowContent } from "react95";

import MainControls from './components/MainControls'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="game">
        <Helmet>
          <style>{'body { background-color: #00807F; }'}</style>
        </Helmet>
        <ThemeProvider theme={themes.default}>
          <Window>
            <WindowHeader><span role='img' aria-label='logo'>🎯</span> Guess Tech Logo</WindowHeader>
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