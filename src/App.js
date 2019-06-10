import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import {
  Window, themes, WindowHeader, WindowContent, Button,
} from 'react95';

import MainControls from './components/MainControls';
import InfoWindow from './components/InfoWindow';
import SoundEffects from './components/SoundEffects';

import './App.css';

import noteIcon from './resources/images/note.svg';
import bgList from './resources/backgrounds-list.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showInfo: false,
      bgWallpaper: bgList[Math.floor(Math.random() * bgList.length)],
      soundEnabled: false,
    };
  }

  render() {
    const { showInfo, bgWallpaper, soundEnabled } = this.state;

    return (
      <div className="game">
        <Helmet>
          <style>
            {
              `body { background-image: url("/backgrounds/${bgWallpaper}"); }`
            }
          </style>
        </Helmet>
        <InfoWindow isOpen={ showInfo } onClick={ () => this.setState({ showInfo: false }) }/>
        <ThemeProvider theme={ themes.default }>
          <Window style={ { width: '360px' } }>
            <WindowHeader>
              <div className='window_header'>
                <span><span role='img' aria-label='logo'>🎯</span> Logosweeper</span>
                <span className='window_title_buttons'>
                  <Button
                    size='sm'
                    square
                    onClick={ () => { this.setState({ soundEnabled: !soundEnabled }); } }
                    active={ soundEnabled }
                    style={ { marginRight: '5px' } }
                  >
                    <img src={ noteIcon } style={ { height: '25px' } } alt='mute'/>
                  </Button>
                  <Button
                    size='sm'
                    square
                    onClick={ () => this.setState({ showInfo: true }) }
                    active={ showInfo }
                  >
                    <span style={ { fontWeight: 'bold', transform: 'translateY(-1px)' } }>?</span>
                  </Button>
                </span>
              </div>
            </WindowHeader>
            <WindowContent className='window_content'>
              <SoundEffects muted={ !soundEnabled } />
              <MainControls />
            </WindowContent>
          </Window>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
