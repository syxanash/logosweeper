import React, {Component} from 'react';
import './App.css'
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    const logo_structure_url = 'https://logos-c87b5.firebaseio.com/items.json';

    fetch(logo_structure_url)
      .then(response => {
        return response.json()
      })
      .then(data => {
        const getRandomInt = (max) => {
            return Math.floor(Math.random() * Math.floor(max));
        }

        const logos_structure = data;
        const random_logo = logos_structure[Object.keys(logos_structure)[getRandomInt(Object.keys(logos_structure).length)]];
        const logo_img_base_url = `https://cdn.svgporn.com/logos/${random_logo.files[0]}`

        this.setState({ data: logo_img_base_url });
      })
      .catch(err => {
        console.err(`There was an error: ${err}`);
      })
  }

  render() {
    const { data } = this.state;

    return (
      <div className="game">
        <h1>Guess-nerd-logo 1.0</h1>
        <img src={data} alt="loading logo..."/>
      </div>
    );
  }
}

export default App;