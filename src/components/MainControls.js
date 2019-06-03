import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Button, Tooltip } from "react95";
import RetroHitCounter from 'react-retro-hit-counter';
import 'animate.css';

import Logo from './Logo';
import Choices from './Choices';
import AdditionalInfo from './AdditionalInfo';
import SoundEffects from './SoundEffects';

import './MainControls.css';

import gameoverLogo from '../resources/images/gameover.svg';
import thinkingLogo from '../resources/images/thinking.svg';
import guessedLogo from '../resources/images/guessed.svg';
import sleepingLogo from '../resources/images/sleeping.svg';
import mutedIcon from '../resources/images/muted.svg';

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
      gameStatus: STATUS_THINKING,
      soundMuted: false,
    };
  }

  shuffleLogoList() {
    const {all_logos} = this.state;

    const logos_structure = _.shuffle(all_logos).slice(0,4);
    const all_choices = logos_structure.map(item => item.name);
    const random_logo = _.shuffle(logos_structure)[0];
    const logo_img_url = `https://raw.githubusercontent.com/gilbarbara/logos/master/logos/${random_logo.files[0]}`

    this.setState({
      all_choices,
      random_logo,
      logo_img_url,
    });

    this.sleepingTimeout = setTimeout(function() {
      this.setState({ gameStatus: STATUS_SLEEPING });
    }.bind(this), (Math.random() * (14 - 8) + 8) * 1000);
  }

  componentDidMount() {
    axios.get(LOGOS_REPO)
      .then(res => {
        this.setState({
          all_logos: res.data
        });

        this.shuffleLogoList();
      });
  }

  onClick(item) {
    clearTimeout(this.sleepingTimeout);

    const { random_logo, score } = this.state;

    if (random_logo.name === item) {
      document.getElementById('guessedSound').play();

      this.setState({
        score: score + 1,
        gameStatus: STATUS_GUESSED
      });
    } else {
      document.getElementById('gameoverSound').play();

      this.setState({
        gameStatus: STATUS_GAMEOVER,
      });
    }
  }

  onRestart() {
    document.getElementById('buttonClickSound').play();

    this.setState({
      score: 0,
      gameStatus: STATUS_THINKING
    });
    this.shuffleLogoList();
  }

  onContinue() {
    document.getElementById('buttonClickSound').play();

    this.setState({
      gameStatus: STATUS_THINKING
    });
    this.shuffleLogoList();
  }

  renderChoices() {
    const {
      gameStatus,
      all_choices,
      random_logo
    } = this.state;
    
    return (
      <div className='footerContainer'>
        {
          (gameStatus === STATUS_GUESSED || gameStatus === STATUS_GAMEOVER)
            ? <AdditionalInfo logo={random_logo} gameover={gameStatus === STATUS_GAMEOVER} />
            : <div className='choiceButtons'>
                <Choices values={all_choices} onClick={this.onClick.bind(this)}/>
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
        className: 'animated heartBeat delay-3s'
      }
      tooltipText = 'Restart game';
    } else if (gameStatus === STATUS_GUESSED) {
      stateLogo = guessedLogo;
      actionButtonProps = {
        ...actionButtonProps,
        onClick: this.onContinue.bind(this),
        className: 'animated heartBeat delay-3s'
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

    return (<Tooltip text={tooltipText}>
        <Button {...actionButtonProps} size='lg' style={{width: '45px', height: '45px'}} square>
          <img src={stateLogo} style={{height: '40px'}} alt={gameStatus}/>
        </Button>
      </Tooltip>
    );
  }

  renderControls() {
    const {
      score,
      gameStatus,
      logo_img_url,
      soundMuted
    } = this.state;

    return (
      <span>
        <SoundEffects muted={soundMuted} />
        <span className='headerContainer'>
          <div style={{width: '100px'}}>
            <Tooltip text='Mute sound effects'>
              <Button
                size='lg'
                style={{width: '45px', height: '45px'}}
                square
                onClick={() => {
                  this.setState({soundMuted: !soundMuted});
                }}
                active={soundMuted}
                >
                <img src={mutedIcon} style={{height: '40px'}} alt='mute'/>
              </Button>
            </Tooltip>
          </div>
          {this.renderActionButton()}
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
        : <h1>Loading game...</h1>
    )
  }
}

export default MainControls;