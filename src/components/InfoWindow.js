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
              <p style={{textAlign: 'left'}}>Test how wise and knowledgeable you are about new technologies by guessing as many logos as you can in a row.</p>
              <div className='action_buttons_container'>
                <Button size='lg' square style={{margin: '5px'}}>
                  <Anchor href='https://github.com/syxanash/quizlogo' target='_blank'>
                    <img src={octocatLogo} style={{height: '30px'}} alt="octocat"/>
                  </Anchor>
                </Button>
                <Button size='lg' square style={{margin: '5px'}}>
                  <Anchor href='https://twitter.com/intent/tweet?text=Test%20how%20wise%20and%20knowledgeable%20you%20are%20about%20new%20technologies%20by%20guessing%20as%20many%20logos%20as%20you%20can%20in%20a%20row%20%F0%9F%8E%AF%20https%3A%2F%2Fquizlogo.surge.sh' target='_blank'>
                    <img src={twitterLogo} style={{height: '30px'}} alt="twitter"/>
                  </Anchor>
                </Button>
                <Button
                  style={{margin: '5px', width: '80px'}}
                  size='lg'
                  onClick={() => onClick()}>Ok</Button>
              </div>
            </WindowContent>
          </Window>
        </ThemeProvider>
      </div>
    );
  }
}

export default InfoWindow;