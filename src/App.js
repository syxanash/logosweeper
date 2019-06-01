import React, {Component} from 'react';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from "styled-components";
import { Window, themes, WindowHeader, WindowContent, Button } from "react95";

import MainControls from './components/MainControls';
import InfoWindow from './components/InfoWindow';
import './App.css'

import bgList from './resources/backgrounds-list.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showInfo: false,
      bgWallpaper: bgList[Math.floor(Math.random()*bgList.length)]
    };
  }

  render() {
    const { showInfo, bgWallpaper } = this.state;

    return (
      <div className="game">
        <Helmet>
          <style>
          {
            `body { background-image: url("/backgrounds/${bgWallpaper}"); }`
          }
          </style>
        </Helmet>
        <InfoWindow isOpen={showInfo} onClick={() => this.setState({showInfo: false})}/>
        <ThemeProvider theme={themes.default}>
          <Window style={{width: '360px'}}>
            <WindowHeader>
              <div className='window_header'>
                <span><span role='img' aria-label='logo'>🎯</span> Guess Tech Logo</span>
                <Button
                  size='sm'
                  onClick={() => this.setState({showInfo: true})}
                  active={showInfo}
                >?</Button>
              </div>
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