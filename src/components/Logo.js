import React, {Component} from 'react';
import ReactSVG from 'react-svg';
import './Logo.css';

class Logo extends Component {
  render() {
    const {blurred, url, score} = this.props
    
    const svgStyle = svg => {
      // const logo_width = parseInt(svg.attributes.width.nodeValue.replace(/px/g,''));

      if (blurred) {
        svg.setAttribute('style', 'filter: blur(15px)');
      } else {
        svg.setAttribute('style', 'filter: blur(0px)');
      }
    }

    let cssClasses = 'logo ';

    if (score >= 30) {
      cssClasses += 'rotate_level_3';
    } else if (score >= 20) {
      cssClasses += 'rotate_level_2';
    } else if (score >= 10) {
      cssClasses += 'rotate_level_1';
    }

    return (
      <ReactSVG
        className={cssClasses} 
        src={url}
        beforeInjection={svgStyle}
      />
    );
  }
}

export default Logo;