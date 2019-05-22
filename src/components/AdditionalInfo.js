import React, {Component} from 'react';

class Logo extends Component {
  render() {
    const { logo } = this.props

    return (
      <div>
        <h1>Congrats!</h1>
        <h2>Checkout <a href={logo.url}>{logo.name}</a></h2>
      </div>
    );
  }
}

export default Logo;