import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';

import Logo from './Logo';
import Choices from './Choices';
import AdditionalInfo from './AdditionalInfo';

const LOGOS_REPO = 'https://raw.githubusercontent.com/gilbarbara/logos/master/logos.json';

class MainControls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
    };
  }

  makeRequest(url) {
    axios.get(url)
      .then(res => {
        const logos_structure = _.shuffle(res.data).slice(0,4);
        const all_choices = logos_structure.map(item => item.name);
        const random_logo = _.shuffle(logos_structure)[0];
        const logo_img_url = `https://raw.githubusercontent.com/gilbarbara/logos/master/logos/${random_logo.files[0]}`

        this.setState({
            all_choices,
            random_logo,
            logo_img_url,
            guessed: false
        });
      });
  }

  componentDidMount() {
    this.makeRequest(LOGOS_REPO);
  }

  onClick(item) {
    const { random_logo, score } = this.state;

    if (random_logo.name === item) {
      this.setState({
        guessed: true,
        score: score + 1
      });
    } else {
      this.setState({
        guessed: false,
        score: 0
      });
      alert('GAMEOVER!');
      this.makeRequest(LOGOS_REPO);
    }
  }

  onContinue() {
    this.setState({
      guessed: false,
    });
    this.makeRequest(LOGOS_REPO);
  }

  renderControls() {
    const {guessed, logo_img_url, all_choices, random_logo, score} = this.state;

    return (
      <span>
        <Logo blurred={!guessed} url={logo_img_url} />
        {
          guessed
            ? <span>
                <AdditionalInfo logo={random_logo} />
                <button onClick={this.onContinue.bind(this)}>CONTINUE</button>
              </span>
            : <Choices values={all_choices} onClick={this.onClick.bind(this)}/>
        }
        <h2>SCORE {score}</h2>
      </span>
    );
  }

  render() {
    const {logo_img_url} = this.state;

    const logo_downloaded = !!logo_img_url;

    return (
      logo_downloaded
        ? this.renderControls()
        : <h1>Loading...</h1>
    )
  }
}

export default MainControls;