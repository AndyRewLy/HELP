import React, { Component } from 'react';

import './HomePage.css';
import Button from './Button.js';
import LoginForm from '../Forms/LoginForm.js'
import Callout from './Callout.js';
import axios from 'axios';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.handleData = this.handleData.bind(this);
    this.state = {
      user: {},
      username: '',
      isCalloutVisible: false,
      recommendedActivities: [],
      recommendedFood: []
    };

    this.showCallout = this.showCallout.bind(this);
    this.hideCallout = this.hideCallout.bind(this);
    this.handleData = this.handleData.bind(this);

    this.getUser = this.getUser.bind(this);
    this.getFoodRecommendations = this.getFoodRecommendations.bind(this);
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

  handleData(data) {

    this.getUser(data);
  }

  render() {
    return (
      <div className = "HomePage">
        <Button
      	    	onClick={this.showCallout}
      		    content="Get Started"
      	/>
      	{this.state.isCalloutVisible &&
      		<Callout class="login-callout"
      			isVisible={true}
      			content={<LoginForm handlerFromHomePage={this.handleData} onDismiss = {this.hideCallout} />}
      		/>
      	}
        <p>Logged in as: {this.state.username}</p>
        <p>All user activity likes: {this.state.user.activityLikes}</p>
        <p>All user food likes: {this.state.user.foodLikes}</p>

        <button className="btn btn-large btn-success" onClick={this.getFoodRecommendations}>Get Food Recommendations</button>
        <p>Recommended Food Likes: {this.state.recommendedFood}</p>
      </div>
    );
  }

  getUser(userText) {
    axios.get('http://localhost:5000/User/' + userText)
       .then(data => {
           this.setState({user: data["data"]["data"], username: userText});
           console.log(data["data"]["data"]);
           console.log("user state is: " + this.state.user);
       });
  }

  getFoodRecommendations() {
    axios.get('http://localhost:5000/User/' + this.state.user.username + "/recommend/food/category")
       .then(data => {
           this.setState({user: this.state.user,
                          username: this.state.username,
                          recommendedActivities: [],
                          recommendedFood: data["data"]});
           console.log(data["data"]);
           console.log("user food recommendations is: " + this.state.recommendedFood);
       });
  }


}


export default HomePage;