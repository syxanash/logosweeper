import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';

import Logo from './Logo';
import Choices from './Choices';
import AdditionalInfo from './AdditionalInfo';

import gameoverLogo from '../resources/images/gameover.svg';
import thinkingLogo from '../resources/images/thinking.svg';

import './MainControls.css';

const LOGOS_REPO = 'https://raw.githubusercontent.com/gilbarbara/logos/master/logos.json';

class MainControls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      gameover: false
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
        gameover: true
      });
    }
  }

  onRestart() {
    this.setState({
      guessed: false,
      gameover: false,
      score: 0
    });
    this.makeRequest(LOGOS_REPO);
  }

  onContinue() {
    this.setState({
      guessed: false,
    });
    this.makeRequest(LOGOS_REPO);
  }

  renderGameover() {
    return (
      <div>
        <img src={gameoverLogo} style={{height: '300px'}} alt="gameover"/>
        <br />
        <button onClick={this.onRestart.bind(this)}>RESTART</button>
        <h1>GAMEOVER!!!</h1>
      </div>
    );
  }

  renderChoices() {
    const {
      guessed,
      logo_img_url,
      all_choices,
      random_logo,
      score
    } = this.state;

    return (
      <div>
        <Logo blurred={!guessed} url={logo_img_url} score={score} />
        <div className="choices">
          {
            guessed
              ? <span>
                  <button onClick={this.onContinue.bind(this)}>CONTINUE</button>
                  <AdditionalInfo logo={random_logo} />
                </span>
              : <span>
                  <img src={thinkingLogo} style={{height: '50px'}} alt="thinking"/>
                  <Choices values={all_choices} onClick={this.onClick.bind(this)}/>
                </span>
          }
        </div>
      </div>
    );
  }

  renderControls() {
    const {
      score,
      gameover
    } = this.state;

    return (
      <span>
        {
          gameover
            ? this.renderGameover()
            : this.renderChoices()
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