import React, { Component } from 'react';

import './CardsList.css';
import Card from './Card.js';

class CardsList extends Component {

  render() {
    const Cards = this.props.listFromParent.map((title, i) => <Card key={i} title={title}/>);

    console.log(this.props.listFromParent);
    //console.log(Cards);

    return (
      <div class="CardsList">
        {Cards}
        
      </div>
    );
  }
}

export default CardsList;