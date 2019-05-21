import React, {Component} from 'react';
import axios from 'axios';
// import _ from 'lodash';

import Logo from './Logo';

class MainControls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    const logo_structure_url = 'https://raw.githubusercontent.com/gilbarbara/logos/master/logos.json';

    axios.get(logo_structure_url)
      .then(res => {
        const getRandomInt = (max) => {
          return Math.floor(Math.random() * Math.floor(max));
        }

        const logos_structure = res.data;

        //const three_choices = _.shuffle(logos_structure).slice(0,5);

        debugger;

        const random_logo = logos_structure[Object.keys(logos_structure)[getRandomInt(Object.keys(logos_structure).length)]];
        const logo_img_url = `https://raw.githubusercontent.com/gilbarbara/logos/master/logos/${random_logo.files[0]}`

        this.setState({
            logo_img_url,
            blurred: true
        });
      });
  }

  render() {
    const {blurred, logo_img_url} = this.state;
    const logo_downloaded = !!logo_img_url;

    return (
      logo_downloaded
        ? <Logo blurred={blurred} url={logo_img_url} />
        : <h1>Loading...</h1>
    )
  }
}

export default MainControls;