import React, {Component} from 'react';

class Choices extends Component {
  handleClick(item) {
    console.log('you clicked ' + item);
  }
  
  render() {
    const radio_buttons = this.props.values.map((item, index) => {
      return (
        <input
          key={`${item}_${index}`}
          type="button"
          value={item}
          onClick={() => this.handleClick(item)}/>
      );
    });

    return radio_buttons;
  }
}

export default Choices;