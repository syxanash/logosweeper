import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';

import Logo from './Logo';
import Choices from './Choices';
import AdditionalInfo from './AdditionalInfo';

const LOGOS_REPO = 'https://raw.githubusercontent.com/gilbarbara/logos/master/logos.json';

class MainControls extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  makeRequest(url) {
    axios.get(url)
      .then(res => {
        const logos_structure = _.shuffle(res.data).slice(0,4);
        const all_choices = logos_structure.map(item => item.name);
        const random_logo = _.shuffle(logos_structure)[0];
        const logo_img_url = `https://raw.githubusercontent.com/gilbarbara/logos/master/logos/${random_logo.files[0]}`

        this.setState({
            all_choices,
            random_logo,
            logo_img_url,
            guessed: false
        });
      });
  }

  componentDidMount() {
    this.makeRequest(LOGOS_REPO);
  }

  onClick(item) {
    const { random_logo } = this.state;

    if (random_logo.name === item) {
      this.setState({ guessed: true });
    } else {
      alert('Wrong choice!');
      this.makeRequest(LOGOS_REPO);
    }
  }

  renderControls() {
    const {guessed, logo_img_url, all_choices, random_logo} = this.state;
    return (
      <span>
        <Logo blurred={!guessed} url={logo_img_url} />
        {
          guessed
            ? <AdditionalInfo logo={random_logo} />
            : <Choices values={all_choices} onClick={this.onClick.bind(this)}/>
        }
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