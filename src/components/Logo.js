import React, { Component } from 'react';
import { Cutout, Hourglass } from 'react95';
import ImageLoader from 'react-load-image';

import './Logo.css';

class Logo extends Component {
  render() {
    const {
      url,
      score,
      blurred,
      startCounter,
      fallbackError: FallbackScreen,
    } = this.props;

    let cssClasses = 'logo ';

    if (score >= 30) {
      cssClasses += 'rotate_level_3';
    } else if (score >= 20) {
      cssClasses += 'rotate_level_2';
    } else if (score >= 10) {
      cssClasses += 'rotate_level_1';
    }

    const blurredFilter = blurred ? 'blur(8px)' : 'blur(0px)';

    return (
      <Cutout className='logo_container'>
        <ImageLoader
          src={ url }
          onLoad={ startCounter }
        >
          <img
            alt='main logo'
            className={ cssClasses }
            style={ { width: '256px', height: '256px', filter: blurredFilter } }
          />
          <FallbackScreen />
          <Hourglass size={ 125 } />
        </ImageLoader>
      </Cutout>
    );
  }
}

export default Logo;
