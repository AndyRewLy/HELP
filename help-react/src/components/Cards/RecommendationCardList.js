import React, { Component } from 'react';

import './CardsList.css';
import RecommendationCard from './RecommendationCard.js';

class RecommendationCardList extends Component {

  constructor (props) {
      super(props);
      this.state = {updateFunc: this.props.updateFoodLikes,
                    cardsList: this.props.listFromParent,
                    cards: this.props.listFromParent.map((title, i) => <RecommendationCard key={i} title={title} updateFunc={this.state.updateFunc}/>)} 
  }

  componentWillReceiveProps(nextProps) {
    console.log("Made it here i guess");
    this.setState({updateFunc: nextProps.updateFoodLikes,
                   cardsList: nextProps.listFromParent,
                   cards: nextProps.listFromParent.map((title, i) => <RecommendationCard key={i} title={title} updateFunc={this.state.updateFunc}/>)});
                   this.forceUpdate();  
  }

  render() {
  	//const UpdateFunc = this.props.updateFoodLikes;
    //const Cards = this.state.cardsList.map((title, i) => <RecommendationCard key={i} title={title} updateFunc={UpdateFunc}/>);

    console.log(this.props.listFromParent);

    return (
      <div class="CardsList">
        {this.state.cards}
        
      </div>
    );
  }
}

export default RecommendationCardList;