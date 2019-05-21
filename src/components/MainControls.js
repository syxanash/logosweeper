import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';

import Logo from './Logo';
import Choices from './Choices';

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
        const logos_structure = _.shuffle(res.data).slice(0,4);
        const all_choices = logos_structure.map(item => item.name);
        const random_logo = _.shuffle(logos_structure)[0];
        const logo_img_url = `https://raw.githubusercontent.com/gilbarbara/logos/master/logos/${random_logo.files[0]}`

        console.log('real one: ' + random_logo.name)

        this.setState({
            all_choices,
            logo_img_url,
            blurred: true
        });
      });
  }

  renderControls() {
    const {blurred, logo_img_url, all_choices} = this.state;
    return (
      <span>
        <Logo blurred={blurred} url={logo_img_url} />
        <Choices values={all_choices} />
      </span>
    );
  }

  render() {
    const {logo_img_url} = this.state;

    const logo_downloaded = !!logo_img_url;

    return (
      logo_downloaded
        ? this.renderControls()
        : <h1>Loading...</h1>
    )
  }
}

export default MainControls;