import React, { Component } from 'react';
import RetroHitCounter from 'react-retro-hit-counter';
import 'animate.css';

class ScoreCounter extends Component {
  render() {
    const { score, oldScore, animated } = this.props;

    return (
      <span className={
        animated
        && score === 0
        && oldScore !== 0 ? 'animated swing' : ''
      }
      >
        <RetroHitCounter
          hits={ score }
          minLength={ 3 }
          borderThickness={ 1 }
          segmentActiveColor="#fb3700"
          segmentInactiveColor="#521900"
        />
      </span>
    );
  }
}

export default ScoreCounter;
