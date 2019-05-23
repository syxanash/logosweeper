import React, {Component} from 'react';
import ReactSVG from 'react-svg';
import './Logo.css';

class Logo extends Component {
  render() {
    const {blurred, url} = this.props
    
    const svgStyle = svg => {
      if (blurred) {
        svg.setAttribute('style', 'filter: blur(15px)');
      } else {
        svg.setAttribute('style', 'filter: blur(0px)');
      }
    }

    return (
      <ReactSVG
        className={"logo"} 
        src={url}
        beforeInjection={svgStyle}
      />
    );
  }
}

export default Logo;