import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import {
  Anchor, Window, themes, WindowHeader, WindowContent, Button,
} from 'react95';
import Draggable from 'react-draggable';
import 'animate.css';

import './InfoWindow.css';

import octocatLogo from '../resources/images/octocat.png';
import twitterLogo from '../resources/images/twitter.svg';
import productHuntLogo from '../resources/images/product-hunt.png';

class InfoWindow extends Component {
  render() {
    const { isOpen, onClick } = this.props;

    const displayProp = isOpen ? 'block' : 'none';

    return (
      <Draggable handle='.handle'>
        <div className='info_window_container' style={ { display: displayProp } }>
          <ThemeProvider theme={ themes.default }>
            <Window className='info_window'>
              <WindowHeader className="handle">
                <span role='img' aria-label='logo'>🎯</span> About
              </WindowHeader>
              <WindowContent className='window_content'>
                <div style={ { textAlign: 'left', paddingBottom: '20px' } }>Test your wisdom and readiness to adopt the next big bloated tech stack by guessing as many logos as you can in a row.<br /><br /><i>All logos appearing on this app are property of their respective owners.</i><br /><br />Made with <div className='animated heartBeat delay-5s' style={ { display: 'inline-block' } }><span role='img' aria-label='love'>❤️</span></div> and <span role="img" aria-label="beer">🍺</span> by <b>syx</b></div>
                <div className='action_buttons_container'>
                  <Button size='lg' square style={ { margin: '5px' } }>
                    <Anchor href='https://github.com/syxanash/logosweeper' target='_blank'>
                      <img src={ octocatLogo } style={ { height: '30px' } } alt="octocat"/>
                    </Anchor>
                  </Button>
                  <Button size='lg' square style={ { margin: '5px' } }>
                    <Anchor href='https://www.producthunt.com/posts/logosweeper' target='_blank'>
                      <img src={ productHuntLogo } style={ { height: '30px' } } alt="product-hunt"/>
                    </Anchor>
                  </Button>
                  <Button size='lg' square style={ { margin: '5px' } }>
                    <Anchor href='https://twitter.com/intent/tweet?text=Test%20your%20wisdom%20and%20readiness%20to%20adopt%20the%20next%20big%20bloated%20tech%20stack%20by%20guessing%20as%20many%20logos%20as%20you%20can%20in%20a%20row%20%F0%9F%8E%AF%20https%3A%2F%2Flogosweeper.surge.sh' target='_blank'>
                      <img src={ twitterLogo } style={ { height: '30px' } } alt="twitter"/>
                    </Anchor>
                  </Button>
                  <Button
                    style={ { margin: '5px', width: '80px' } }
                    size='lg'
                    onClick={ onClick }
                  >Ok</Button>
                </div>
              </WindowContent>
            </Window>
          </ThemeProvider>
        </div>
      </Draggable>
    );
  }
}

export default InfoWindow;
