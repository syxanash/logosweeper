import React, {Component} from 'react';
import RetroHitCounter from 'react-retro-hit-counter';
import 'animate.css';

class ScoreCounter extends Component {
  render() {
    const {score, oldScore} = this.props;

    return (
      <span className={score === 0 && oldScore !== 0 ? 'animated swing' : ''}>
        <RetroHitCounter
          hits={score}
          borderThickness={1}
          segmentActiveColor="#fb3700"
          segmentInactiveColor="#521900"
        />
      </span>
    );
  }
}

export default ScoreCounter;