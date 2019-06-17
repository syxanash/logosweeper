import React, { Component } from 'react';
import { Fieldset, Anchor, Button } from 'react95';
import 'animate.css';

import twitterLogo from '../resources/images/twitter.svg';

class AdditionalInfo extends Component {
  renderShareButton = () => {
    const { score, timeCount } = this.props;
    return (
      <Button size='lg' className='animated rubberBand'>
        <Anchor style={ { textDecoration: 'none' } } href={ `https://twitter.com/intent/tweet?text=I%20just%20guessed%20${score}%20logos%20in%20${timeCount}%20seconds%20on%20https%3A%2F%2Flogosweeper.netlify.com%20%F0%9F%8E%AF` } target='_blank'>
          <span style={ { display: 'flex' } }>Share score on&nbsp;<img src={ twitterLogo } style={ { height: '25px' } } alt="twitter"/></span>
        </Anchor>
      </Button>
    );
  }

  render() {
    const {
      logo, gameover, score,
    } = this.props;

    if (gameover) {
      return (
        <Fieldset>
          <h1 style={ { color: 'red' } }>GAMEOVER!</h1>
          <h2>The logo was from <Anchor href={ logo.url } target='_blank'>{logo.name}</Anchor></h2>
          { score > 0 ? this.renderShareButton() : '' }
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
