import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Button } from "react95";

import Logo from './Logo';
import Choices from './Choices';
import AdditionalInfo from './AdditionalInfo';

import gameoverLogo from '../resources/images/gameover.svg';
import thinkingLogo from '../resources/images/thinking.svg';
import guessedLogo from '../resources/images/guessed.svg';

import './MainControls.css';

const LOGOS_REPO = 'https://raw.githubusercontent.com/gilbarbara/logos/master/logos.json';

const STATUS_GAMEOVER = '😵';
const STATUS_THINKING = '🤔';
const STATUS_GUESSED = '🥳';

class MainControls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      gameStatus: STATUS_THINKING
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
        score: score + 1,
        gameStatus: STATUS_GUESSED
      });
    } else {
      this.setState({
        gameStatus: STATUS_GAMEOVER,
      });
    }
  }

  onRestart() {
    this.setState({
      score: 0,
      gameStatus: STATUS_THINKING
    });
    this.makeRequest(LOGOS_REPO);
  }

  onContinue() {
    this.setState({
      gameStatus: STATUS_THINKING
    });
    this.makeRequest(LOGOS_REPO);
  }

  renderChoices() {
    const {
      gameStatus,
      all_choices,
      random_logo
    } = this.state;
    
    return (
      <div style={{paddingTop: '20px'}}>
        {
          (gameStatus === STATUS_GUESSED || gameStatus === STATUS_GAMEOVER)
            ? <span>
                <AdditionalInfo logo={random_logo} gameover={gameStatus === STATUS_GAMEOVER} />
              </span>
            : <div className='choiceButtons'>
                <Choices values={all_choices} onClick={this.onClick.bind(this)}/>
              </div>
        }
      </div>
    );
  }

  renderControls() {
    const {
      score,
      gameStatus,
      logo_img_url
    } = this.state;

    let stateLogo = undefined;
    let actionButtonProps = {};

    if (gameStatus === STATUS_GAMEOVER) {
      stateLogo = gameoverLogo;
      actionButtonProps = {
        ...actionButtonProps,
        onClick: this.onRestart.bind(this)
      }
    } else if (gameStatus === STATUS_GUESSED) {
      stateLogo = guessedLogo;
      actionButtonProps = {
        ...actionButtonProps,
        onClick: this.onContinue.bind(this)
      }
    } else {
      stateLogo = thinkingLogo;
      actionButtonProps = {
        ...actionButtonProps,
        active: true
      }
    }

    const actionButton = <Button {...actionButtonProps} size='lg' square>
      <img src={stateLogo} style={{height: '40px'}} alt={gameStatus}/>
    </Button>

    return (
      <span>
        <div className='actionButtons'>
          {actionButton}
        </div>
        <Logo blurred={gameStatus === STATUS_THINKING} url={logo_img_url} score={score} />
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