import React, {Component} from 'react';
import ReactSVG from 'react-svg';
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
      <ReactSVG
        className={cssClasses} 
        src={url}
        loading={() => <h1>Loading logo...</h1>}
        beforeInjection={svg => {
          const svgWidth = parseInt(svg.attributes.width.nodeValue);
          const svgHeight = parseInt(svg.attributes.height.nodeValue);

          if (svgWidth > 256) {
            svg.setAttribute('width', '256px');
          }

          if (svgHeight > 256) {
            svg.setAttribute('height', '256px');
          }

          if (blurred) {
            svg.setAttribute('style', 'filter: blur(10px)')
          }
        }}
      />
    );
  }
}

export default Logo;