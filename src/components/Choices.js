import React, {Component} from 'react';
import { Button } from 'react95';

class Choices extends Component {
  render() {
    const { values, onClick } = this.props;

    const radioButtons = values.map((item, index) => {
      return (
        <Button
          size="lg"
          style={ {fontSize: '20px', margin: '5px'} }
          key={ `${item}_${index}` }
          value={ item }
          onClick={ () => onClick(item) }
        >
          {item}
        </Button>
      );
    });

    return radioButtons;
  }
}

export default Choices;