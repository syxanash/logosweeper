import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Button, Tooltip } from 'react95';
import 'animate.css';

import Logo from './Logo';
import Choices from './Choices';
import AdditionalInfo from './AdditionalInfo';
import ScoreCounter from './ScoreCounter';

import './MainControls.css';

import gameoverLogo from '../resources/images/gameover.svg';
import thinkingLogo from '../resources/images/thinking.svg';
import guessedLogo from '../resources/images/guessed.svg';
import sleepingLogo from '../resources/images/sleeping.svg';

const LOGOS_REPO = 'https://raw.githubusercontent.com/gilbarbara/logos/master/logos.json';

const STATUS_GAMEOVER = '😵';
const STATUS_THINKING = '🤔';
const STATUS_GUESSED = '🥳';
const STATUS_SLEEPING = '😴';

class MainControls extends Component {
  constructor(props) {
    super(props);

    this.sleepingTimeout = undefined;
    this.scoreTimer = undefined;

    this.state = {
      score: 0,
      oldScore: 0,
      gameStatus: STATUS_THINKING,
      timerCount: 0,
    };
  }

  shuffleLogoList() {
    const { logosList } = this.state;

    const randomChoices = _.shuffle(logosList).slice(0, 4);
    const allChoices = randomChoices.map(item => item.name);
    const randomLogo = _.shuffle(randomChoices)[0];

    _.remove(logosList, item => item.name === randomLogo.name);

    const logoImgUrl = `https://raw.githubusercontent.com/gilbarbara/logos/master/logos/${randomLogo.files[0]}`;

    this.setState({
      allChoices,
      randomLogo,
      logoImgUrl,
    });

    this.sleepingTimeout = setTimeout(() => {
      this.setState({ gameStatus: STATUS_SLEEPING });
    }, (Math.random() * (14 - 8) + 8) * 1000);
  }

  tick() {
    this.setState({ timerCount: (this.state.timerCount + 1) });
  }

  fetchAndShuffle() {
    axios.get(LOGOS_REPO)
      .then((res) => {
        this.setState({
          logosList: res.data,
        });

        this.shuffleLogoList();
      });

    this.scoreTimer = setInterval(() => this.tick(), 1000);
  }

  componentDidMount() {
    this.fetchAndShuffle();
  }

  onClick = (item) => {
    clearTimeout(this.sleepingTimeout);

    const { randomLogo, score } = this.state;

    if (randomLogo.name === item) {
      document.getElementById('guessedSound').play();

      this.setState({
        score: score + 1,
        gameStatus: STATUS_GUESSED,
      });
    } else {
      document.getElementById('gameoverSound').play();

      clearInterval(this.scoreTimer);

      this.setState({
        gameStatus: STATUS_GAMEOVER,
      });
    }
  }

  onRestart() {
    const { score } = this.state;

    document.getElementById('buttonClickSound').play();
    this.setState({
      oldScore: score,
      score: 0,
      timerCount: 0,
      gameStatus: STATUS_THINKING,
    });

    this.fetchAndShuffle();
  }

  onContinue = () => {
    document.getElementById('buttonClickSound').play();

    this.setState({
      gameStatus: STATUS_THINKING,
    });
    this.shuffleLogoList();
  }

  renderChoices() {
    const {
      gameStatus,
      allChoices,
      randomLogo,
      score,
      timerCount,
    } = this.state;

    return (
      <div className='footerContainer'>
        {
          (gameStatus === STATUS_GUESSED || gameStatus === STATUS_GAMEOVER)
            ? <AdditionalInfo
              score={ score }
              timeCount={ timerCount }
              logo={ randomLogo }
              gameover={ gameStatus === STATUS_GAMEOVER } />
            : <div className='choiceButtons'>
              <Choices values={ allChoices } onClick={ this.onClick }/>
            </div>
        }
      </div>
    );
  }

  renderActionButton() {
    const { gameStatus } = this.state;

    let stateLogo;
    let actionButtonProps = {};
    let tooltipText = '';

    if (gameStatus === STATUS_GAMEOVER) {
      stateLogo = gameoverLogo;
      actionButtonProps = {
        ...actionButtonProps,
        onClick: this.onRestart.bind(this),
        className: 'animated tada delay-2s infinite',
      };
      tooltipText = 'Restart game';
    } else if (gameStatus === STATUS_GUESSED) {
      stateLogo = guessedLogo;
      actionButtonProps = {
        ...actionButtonProps,
        onClick: this.onContinue.bind(this),
        className: 'animated heartBeat delay-2s infinite',
      };
      tooltipText = 'Next logo';
    } else if (gameStatus === STATUS_SLEEPING) {
      stateLogo = sleepingLogo;
      actionButtonProps = {
        ...actionButtonProps,
        active: true,
      };
      tooltipText = 'zzZZ';
    } else {
      stateLogo = thinkingLogo;
      actionButtonProps = {
        ...actionButtonProps,
        active: true,
      };
      tooltipText = 'Choose an item below!';
    }

    return (<Tooltip text={ tooltipText }>
      <Button { ...actionButtonProps } size='lg' style={ { width: '45px', height: '45px' } } square>
        <img src={ stateLogo } style={ { height: '40px' } } alt={ gameStatus }/>
      </Button>
    </Tooltip>
    );
  }

  renderControls() {
    const {
      score,
      gameStatus,
      logoImgUrl,
      logosList,
      oldScore,
      timerCount,
    } = this.state;

    if (logosList.length === 0) return <h1 style={ { color: 'green' } }>ABSOLUTE MADLAD YOU WON THE GAME!</h1>;

    return (
      <span>
        <span className='headerContainer'>
          <ScoreCounter score={ score } oldScore={ oldScore } animated={ true } />
          {this.renderActionButton()}
          <ScoreCounter score={ timerCount } animated={ false } />
        </span>
        <Logo
          blurred={ gameStatus === STATUS_THINKING || gameStatus === STATUS_SLEEPING }
          url={ logoImgUrl }
          score={ score }
          fallbackError={ () => (
            <span>
              <h1 style={ { color: 'red' } }>Error rendering logo...</h1>
              <Button onClick={ this.onContinue } size='md'>
                Retry
              </Button>
            </span>
          ) }
        />
        {this.renderChoices()}
      </span>
    );
  }

  render() {
    const { logoImgUrl } = this.state;

    const logoDownloaded = !!logoImgUrl;

    return (
      logoDownloaded
        ? this.renderControls()
        : <h1>Loading game...</h1>
    );
  }
}

export default MainControls;
