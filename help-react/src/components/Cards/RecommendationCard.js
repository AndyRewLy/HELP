import React, { Component } from 'react';

import './Card.css';

class RecommendationCard extends Component {
  
  click = () => {
    this.props.updateFunc(this.props.title);
  }

  render() {
    const Title = this.props.title;
    
    return (
      <div className="Card">
        <p>{Title}</p>
          <div class="btn-group">
            <button className="btn-success" onClick={this.click}><span class="glyphicon glyphicon-ok"></span></button>
            <button className="btn-danger"><span class="glyphicon glyphicon-remove"></span></button>
          </div>
      </div>
    );
  }
}

export default RecommendationCard;