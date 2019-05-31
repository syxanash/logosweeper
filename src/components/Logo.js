import React, {Component} from 'react';
import ReactSVG from 'react-svg';
import { Cutout, Hourglass } from 'react95'

import './Logo.css';

class Logo extends Component {
  render() {
    const {blurred, url, score} = this.props
    
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
          className={cssClasses} 
          src={url}
          loading={() => <Hourglass size={125} />}
          fallback={() => <h1 style={{color: 'red'}}>Error retrieving logo...</h1>}
          beforeInjection={svg => {
            const svgWidth = parseInt(svg.attributes.width.nodeValue);
            const svgHeight = parseInt(svg.attributes.height.nodeValue);

            if (blurred) {
              svg.setAttribute('style', 'filter: blur(8px)')
            }

            if (svgWidth > 256) {
              // if width is more than 256px most likely the logo is composed
              // of a written text so increase the blur filter
              if (blurred) {
                svg.setAttribute('style', 'filter: blur(10px)')
              }

              svg.setAttribute('width', '256px');
            }

            if (svgHeight > 256) {
              svg.setAttribute('height', '256px');
            }
          }}
        />
      </Cutout>
    );
  }
}

export default Logo;