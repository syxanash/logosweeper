import React, {Component} from 'react';
import { Button } from 'react95';

class Choices extends Component {
  render() {
    const { values, onClick } = this.props;

    const radio_buttons = values.map((item, index) => {
      return (
        <Button
          style={{margin: '5px'}}
          key={`${item}_${index}`}
          value={item}
          onClick={() => onClick(item)}>
          {item}
        </Button>
      );
    });

    return radio_buttons;
  }
}

export default Choices;