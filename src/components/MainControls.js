import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';

import Logo from './Logo';
import Choices from './Choices';
import AdditionalInfo from './AdditionalInfo';

import gameoverLogo from '../resources/images/gameover.svg';
import thinkingLogo from '../resources/images/thinking.svg';
import guessedLogo from '../resources/images/guessed.svg';

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
            showLogo: false
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
        showLogo: true,
        score: score + 1
      });
    } else {
      this.setState({
        gameover: true,
        showLogo: true
      });
    }
  }

  onRestart() {
    this.setState({
      showLogo: false,
      gameover: false,
      score: 0
    });
    this.makeRequest(LOGOS_REPO);
  }

  onContinue() {
    this.setState({
      showLogo: false,
    });
    this.makeRequest(LOGOS_REPO);
  }

  renderChoices() {
    const {
      showLogo,
      all_choices,
      random_logo,
      gameover
    } = this.state;

    const actionButton = gameover
      ? <button onClick={this.onRestart.bind(this)}>RESTART</button>
      : <button onClick={this.onContinue.bind(this)}>CONTINUE</button>
    
    return (
      <div className='actionButtons'>
        {
          showLogo
            ? <span>
                {actionButton}
                <AdditionalInfo logo={random_logo} gameover={gameover} />
              </span>
            : <Choices values={all_choices} onClick={this.onClick.bind(this)}/>
        }
      </div>
    );
  }

  renderControls() {
    const {
      score,
      gameover,
      showLogo,
      logo_img_url
    } = this.state;

    let stateLogo = undefined;

    if (gameover) {
      stateLogo = gameoverLogo;
    } else if (showLogo) {
      stateLogo = guessedLogo;
    } else {
      stateLogo = thinkingLogo;
    }

    return (
      <span>
        <div className='rowC'>
          <Logo blurred={!showLogo} url={logo_img_url} score={score} />
          <img src={stateLogo} style={{marginLeft: '30px', height: '50px'}} alt="status"/>
        </div>
        {this.renderChoices()}
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