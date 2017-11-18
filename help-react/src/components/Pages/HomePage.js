import React, { Component } from 'react';

import './HomePage.css';
import Button from './Button.js';

class HomePage extends Component {
	constructor(props) {
    super(props);
    this.state = {isCalloutVisible: false};

    // This binding is necessary to make `this` work in the callback
  }

  showCallout() {
    this.setState(prevState => ({
      isCalloutVisible: true
    }));
  }

  hideCallout() {
    this.setState(prevState => ({
      isCalloutVisible: false
    }));
  }

  render() {
    return (
      <div className="HomePage">
      	<h1>Dashboard</h1>
      	<h2>Captures</h2>
      	<Button 
      		onClick={this.showCallout}
      		content="Add Capture"
      	/>
      	<h2>Replays</h2>
      	<Button 
      		onClick={this.showCallout}
      		content="Add Replay"
      	/>
      </div>
    );
  }
}

export default HomePage;