import React, {Component} from 'react';

import { Fieldset, Anchor } from 'react95';

class AdditionalInfo extends Component {
  render() {
    const { logo, gameover } = this.props;

    if (gameover) {
      return (
        <Fieldset>
          <h1 style={{color: 'red'}}>GAMEOVER!</h1>
          <h2>The logo was from <Anchor href={logo.url} target='_blank'>{logo.name}</Anchor></h2>
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