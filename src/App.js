import React, {Component} from 'react';
import axios from 'axios';
import ReactSVG from 'react-svg';

import './App.css'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    const logo_structure_url = 'https://logos-c87b5.firebaseio.com/items.json';

    axios.get(logo_structure_url)
      .then(res => {
        const getRandomInt = (max) => {
          return Math.floor(Math.random() * Math.floor(max));
        }

        const logos_structure = res.data;
        const random_logo = logos_structure[Object.keys(logos_structure)[getRandomInt(Object.keys(logos_structure).length)]];
        const logo_img_url = `https://cdn.svgporn.com/logos/${random_logo.files[0]}`

        this.setState({
            logo_img_url,
            blurred: true
        });
      });
  }

  renderLogo() {
    const {blurred, logo_img_url} = this.state

    if (!!logo_img_url) {
      return (
        <ReactSVG
          src={logo_img_url}
          beforeInjection={svg => {
            if (blurred) {
              svg.setAttribute('style', 'filter: blur(15px)');
            } else {
              svg.setAttribute('style', 'filter: blur(0px)');
            }
          }}
          onClick={() => {
            this.setState({
              blurred: false
            });
          }}
        />
      );
    }

    return <h1>Loading...</h1>
  }

  render() {
    return (
      <div className="game">
        <h1><span role="img" aria-label="bullseye">🎯</span> Guess Nerd Logo 1.0</h1>
        {this.renderLogo()}
      </div>
    );
  }
}

export default App;