import React, { Component } from 'react';

import buttonClickSound from '../resources/sounds/buttonClick.mp3';
import gameoverSound from '../resources/sounds/gameover.mp3';
import guessedSound from '../resources/sounds/guessed.mp3';

class SoundEffects extends Component {
  render() {
    const { muted } = this.props;
    return (
      <span>
        <audio id='buttonClickSound' src={ buttonClickSound } type="audio/mpeg" muted={ muted }/>
        <audio id='guessedSound' src={ guessedSound } type="audio/mpeg" muted={ muted }/>
        <audio id='gameoverSound' src={ gameoverSound } type="audio/mpeg" muted={ muted }/>
      </span>
    );
  }
}

export default SoundEffects;
