import React, {Component} from 'react';

class AdditionalInfo extends Component {
  render() {
    const { logo, gameover } = this.props;

    if (gameover) {
      return (
        <div>
          <h1 style={{color: 'red'}}>GAMEOVER!</h1>
          <h2>The logo was from <a href={logo.url} rel="noopener noreferrer" target='_blank'>{logo.name}</a></h2>
        </div>
      );
    } else {
      return (
        <div>
          <h1 style={{color: 'green'}}>Congrats!</h1>
          <h2>Checkout <a href={logo.url} rel="noopener noreferrer" target='_blank'>{logo.name}</a></h2>
        </div>
      );
    }
  }
}

export default AdditionalInfo;