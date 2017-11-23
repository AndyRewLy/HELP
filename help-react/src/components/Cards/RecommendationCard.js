import React, { Component } from 'react';

import './Card.css';

class RecommendationCard extends Component {
  render() {
    const { title } = this.props;

    return (
      <div className="Card">
        <p>{title}</p>
          <p id="yes"><span class="glyphicon glyphicon-ok"></span></p>
          <p id="no"><span class="glyphicon glyphicon-remove"></span></p>
      </div>
    );
  }
}

export default RecommendationCard;