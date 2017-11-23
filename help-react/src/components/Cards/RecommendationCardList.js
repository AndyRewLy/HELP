import React, { Component } from 'react';

import './CardsList.css';
import RecommendationCard from './RecommendationCard.js';

class RecommendationCardList extends Component {

  render() {
    const Cards = this.props.listFromParent.map((title, i) => <RecommendationCard key={i} title={title}/>);

    console.log(this.props.listFromParent);

    return (
      <div class="CardsList">
        {Cards}
        
      </div>
    );
  }
}

export default RecommendationCardList;