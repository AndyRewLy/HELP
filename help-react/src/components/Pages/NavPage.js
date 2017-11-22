import React, { Component } from 'react';

import './NavPage.css';
import HomePage from './HomePage.js';

class NavPage extends Component {
  render() {
    return (
      <div className="NavPage">
      <div className="HomePage">
      <div class="container-narrow">
      <ul class="nav nav-pills pull-right">
        <li class="active"><a href="#">Home</a></li>
        <li><a href="#">Link?</a></li>
        <li><a href="#">LINK</a></li>
      </ul>
      <h3 class="text-muted">HALP</h3>
        <hr></hr>
      </div>
      </div>
      </div>
    );
  }
}

export default NavPage;