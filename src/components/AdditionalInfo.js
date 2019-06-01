import React, {Component} from 'react';
import { Fieldset, Anchor, Button } from 'react95';

import twitterLogo from '../resources/images/twitter.svg';

class AdditionalInfo extends Component {
  render() {
    const { logo, gameover } = this.props;

    if (gameover) {
      return (
        <Fieldset>
          <h1 style={{color: 'red'}}>GAMEOVER!</h1>
          <h2>The logo was from <Anchor href={logo.url} target='_blank'>{logo.name}</Anchor></h2>
          <Anchor href='https://twitter.com' style={{textDecoration: 'none'}} target='_blank'>
            <Button size='lg' style={{margin: '5px'}}>
              <span>Share on</span>
              <img src={twitterLogo} style={{paddingLeft: '5px', height: '25px'}} alt="twitter"/>
            </Button>
          </Anchor>
        </Fieldset>
      );
    } else {
      return (
        <Fieldset>
          <h1 style={{color: 'green'}}>Congrats!</h1>
          <h2>Checkout <Anchor href={logo.url} target='_blank'>{logo.name}</Anchor></h2>
        </Fieldset>
      );
    }
  }
}

export default AdditionalInfo;