import React, {Component} from 'react';
import wonLogo from '../resources/images/won.svg';

class Logo extends Component {
  render() {
    const { logo } = this.props

    return (
      <div>
        <h1><img src={wonLogo} style={{height: '50px'}} alt="logo"/> Congrats!</h1>
        <h2>Checkout <a href={logo.url} rel="noopener noreferrer" target='_blank'>{logo.name}</a></h2>
      </div>
    );
  }
}

export default Logo;