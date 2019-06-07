import React, { Component } from 'react';
import { Fieldset, Anchor, Button } from 'react95';

import twitterLogo from '../resources/images/twitter.svg';

class AdditionalInfo extends Component {
  render() {
    const { logo, gameover, score } = this.props;

    if (gameover) {
      return (
        <Fieldset>
          <h1 style={ { color: 'red' } }>GAMEOVER!</h1>
          <h2>The logo was from <Anchor href={ logo.url } target='_blank'>{logo.name}</Anchor></h2>
          <Button size='lg'>
            <Anchor style={ { textDecoration: 'none' } } href={ `https://twitter.com/intent/tweet?text=I%20just%20guessed%20${score}%20logos%20in%20a%20row%20on%20https%3A%2F%2Flogosweeper.surge.sh%20%F0%9F%8E%AF` } target='_blank'>
              <span style={ { display: 'flex' } }>Share score on&nbsp;<img src={ twitterLogo } style={ { height: '25px' } } alt="twitter"/></span>
            </Anchor>
          </Button>
        </Fieldset>
      );
    }

    return (
      <Fieldset>
        <h1 style={ { color: 'green' } }>Congrats!</h1>
        <h2>Checkout <Anchor href={ logo.url } target='_blank'>{logo.name}</Anchor></h2>
      </Fieldset>
    );
  }
}

export default AdditionalInfo;
