import React, {Component} from 'react';

class Choices extends Component {
  render() {
    const radio_buttons = this.props.values.map((item, index) => {
      return (
        <input
          key={`${item}_${index}`}
          type="button"
          value={item}
          onClick={() => this.props.onClick(item)}/>
      );
    });

    return radio_buttons;
  }
}

export default Choices;