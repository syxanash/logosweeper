import React, {Component} from 'react';

class Logo extends Component {
  render() {
    const { logo } = this.props

    return (
      <div>
        <h1>Congrats!</h1>
        <h2>Checkout {logo.name} at: {logo.url}</h2>
      </div>
    );
  }
}

export default Logo;