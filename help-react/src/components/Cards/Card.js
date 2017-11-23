import React, { Component } from 'react';

import './Card.css';

class Card extends Component {
  render() {
    const { title } = this.props;

    return (
      <div className="Card">
        <p>{title}</p>
      </div>
    );
  }
}

export default Card;