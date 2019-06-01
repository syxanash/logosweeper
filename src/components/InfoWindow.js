import React, {Component} from 'react';
import { ThemeProvider } from "styled-components";
import { Anchor, Window, themes, WindowHeader, WindowContent, Button } from "react95";

import './InfoWindow.css';

import octocatLogo from '../resources/images/octocat.png';
import twitterLogo from '../resources/images/twitter.svg';

class InfoWindow extends Component {
  render() {
    const { isOpen, onClick } = this.props;

    const displayProp = isOpen ? 'block' : 'none';

    return (
      <div className='info_window_container' style={{display: displayProp}}>
        <ThemeProvider theme={themes.default}>
          <Window className='info_window'>
            <WindowHeader>
              <span role='img' aria-label='logo'>🎯</span> About
            </WindowHeader>
            <WindowContent className='window_content'>
              <p style={{textAlign: 'left'}}>hello world</p>
              <div className='action_buttons_container'>
                <Button size='lg' square style={{margin: '5px'}}>
                  <Anchor href='https://github.com/syxanash/guesslogo' target='_blank'>
                    <img src={octocatLogo} style={{height: '30px'}} alt="octocat"/>
                  </Anchor>
                </Button>
                <Button size='lg' square style={{margin: '5px'}}>
                  <Anchor href='https://twitter.com' target='_blank'>
                    <img src={twitterLogo} style={{height: '30px'}} alt="twitter"/>
                  </Anchor>
                </Button>
                <Button
                  style={{margin: '5px'}}
                  size='lg'
                  onClick={() => onClick()}>OK</Button>
              </div>
            </WindowContent>
          </Window>
        </ThemeProvider>
      </div>
    );
  }
}

export default InfoWindow;