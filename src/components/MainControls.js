import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Button, Tooltip } from "react95";
import RetroHitCounter from 'react-retro-hit-counter';

import Logo from './Logo';
import Choices from './Choices';
import AdditionalInfo from './AdditionalInfo';

import gameoverLogo from '../resources/images/gameover.svg';
import thinkingLogo from '../resources/images/thinking.svg';
import guessedLogo from '../resources/images/guessed.svg';
import sleepingLogo from '../resources/images/sleeping.svg';

import './MainControls.css';

const LOGOS_REPO = 'https://raw.githubusercontent.com/gilbarbara/logos/master/logos.json';

const STATUS_GAMEOVER = '😵';
const STATUS_THINKING = '🤔';
const STATUS_GUESSED = '🥳';
const STATUS_SLEEPING = '😴';

class MainControls extends Component {
  constructor(props) {
    super(props);

    this.sleepingTimeout = undefined;

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
    
    this.sleepingTimeout = setTimeout(function() {
      this.setState({ gameStatus: STATUS_SLEEPING });
    }.bind(this), (Math.random() * (13 - 8) + 8) * 1000);
  }

  componentDidMount() {
    this.makeRequest(LOGOS_REPO);
  }

  onClick(item) {
    clearTimeout(this.sleepingTimeout);

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
    let tooltipText = '';

    if (gameStatus === STATUS_GAMEOVER) {
      stateLogo = gameoverLogo;
      actionButtonProps = {
        ...actionButtonProps,
        onClick: this.onRestart.bind(this)
      }
      tooltipText = 'Restart game';
    } else if (gameStatus === STATUS_GUESSED) {
      stateLogo = guessedLogo;
      actionButtonProps = {
        ...actionButtonProps,
        onClick: this.onContinue.bind(this)
      }
      tooltipText = 'Next logo';
    } else if (gameStatus === STATUS_SLEEPING) {
      stateLogo = sleepingLogo;
      actionButtonProps = {
        ...actionButtonProps,
        active: true
      }
      tooltipText = 'zzZZ';
    } else {
      stateLogo = thinkingLogo;
      actionButtonProps = {
        ...actionButtonProps,
        active: true
      }
      tooltipText = 'Choose an item below!';
    }

    const actionButton = <Tooltip text={tooltipText}>
      <Button {...actionButtonProps} size='lg' square>
        <img src={stateLogo} style={{height: '40px'}} alt={gameStatus}/>
      </Button>
    </Tooltip>;

    return (
      <span>
        <span className='headerContainer'>
          {/* empty div to make space even and put action button on the center */}
          <div style={{width: '100px'}}></div>
          {actionButton}
          <RetroHitCounter
            hits={score}
            borderThickness={1}
            segmentActiveColor="#fb3700"
            segmentInactiveColor="#521900"
          />
        </span>
        <Logo
          blurred={gameStatus === STATUS_THINKING || gameStatus === STATUS_SLEEPING}
          url={logo_img_url}
          score={score}
        />
        {this.renderChoices()}
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