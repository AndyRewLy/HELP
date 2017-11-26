import React, { Component } from 'react';

import './CardsList.css';
import Card from './Card.js';

class CardsList extends Component {
  constructor (props) {
      super(props);
      this.state = {updateFunc: this.props.updateFoodLikes,
                    cardsList: this.props.listFromParent,
                    cards: this.props.listFromParent.map((title, i) => <Card key={i} title={title} updateFunc={this.state.updateFunc}/>)} 
  }

  componentWillReceiveProps(nextProps) {
    this.setState({updateFunc: nextProps.updateFoodLikes,
                   cardsList: nextProps.listFromParent,
                   cards: nextProps.listFromParent.map((title, i) => <Card key={i} title={title} updateFunc={this.state.updateFunc}/>)});
  }

  render() {
    //const Cards = this.props.listFromParent.map((title, i) => <Card key={i} title={title}/>);

    //console.log(this.props.listFromParent);
    //console.log(Cards);

    return (
      <div class="CardsList">
        {this.state.cards}
        
      </div>
    );
  }
}

export default CardsList;