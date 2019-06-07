import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import { Cutout, Hourglass } from 'react95';

import './Logo.css';

class Logo extends Component {
  renderHourGlass = () => <Hourglass size={ 125 } />;

  applyBlurFilter = (svg) => {
    const { blurred } = this.props;
    const svgWidth = parseInt(svg.attributes.width.nodeValue, 10);
    const svgHeight = parseInt(svg.attributes.height.nodeValue, 10);

    if (blurred) {
      svg.setAttribute('style', 'filter: blur(8px)');
    }

    if (svgWidth > 256) {
      // if width is more than 256px most likely the logo is composed
      // of a written text so increase the blur filter
      if (blurred) {
        svg.setAttribute('style', 'filter: blur(10px)');
      }

      svg.setAttribute('width', '256px');
    }

    if (svgHeight > 256) {
      svg.setAttribute('height', '256px');
    }
  }

  render() {
    const { url, score, fallbackError } = this.props;

    let cssClasses = 'logo ';

    if (score >= 30) {
      cssClasses += 'rotate_level_3';
    } else if (score >= 20) {
      cssClasses += 'rotate_level_2';
    } else if (score >= 10) {
      cssClasses += 'rotate_level_1';
    }

    return (
      <Cutout className='logo_container'>
        <ReactSVG
          className={ cssClasses }
          src={ url }
          loading={ this.renderHourGlass }
          fallback={ fallbackError }
          beforeInjection={ this.applyBlurFilter }
        />
      </Cutout>
    );
  }
}

export default Logo;
