import React, { Component } from 'react';

import './HomePage.css';
import Button from './Button.js';
import LoginForm from '../Forms/LoginForm.js'
import Callout from './Callout.js';
import axios from 'axios';
import '../../index.css';

import CardsList from '../Cards/CardsList.js';
import RecommendationCardList from '../Cards/RecommendationCardList.js';


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.handleData = this.handleData.bind(this);
    sessionStorage.setItem('currentUser', '');
    this.state = {
      user: {},
      username: '',
      isLoggedIn: false,
      isCalloutVisible: false,
      recommendedActivities: [],
      recommendedFood: [],
      foodLikes: [],
      activityLikes: []
    };

    this.showCallout = this.showCallout.bind(this);
    this.hideCallout = this.hideCallout.bind(this);
    this.handleData = this.handleData.bind(this);

    this.getUser = this.getUser.bind(this);
    this.getFoodRecommendations = this.getFoodRecommendations.bind(this);

    this.updateFoodLikes = this.updateFoodLikes.bind(this);
    this.updateState = this.updateState.bind(this);

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
    console.log("updateFoodLikes is" + this.updateFoodLikes);

    return (
      <div className = "HomePage">
    <div class="container-narrow">
      <div id="nav"></div>
      <div class="jumbotron">
        <h1>HALP</h1>
        <p class="lead">Find restaurants and businesses that suit your tastes!</p>
      <div id="root"></div>
      </div>

    </div>

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

        <div id="activityLikes">
          <p>All user activity likes:</p>
          <CardsList listFromParent={this.state.activityLikes}/>
        </div>

        <div id="foodLikes">
          <p>All user foodLikes likes:</p>
          <CardsList listFromParent={this.state.foodLikes}/>
        </div>

        <button className="btn btn-large btn-success" onClick={this.getFoodRecommendations}>Get Food Recommendations</button>
        <div id="recommendedFood">
          <p>Recommended Foods:</p>
          <RecommendationCardList listFromParent={this.state.recommendedFood} updateFoodLikes={this.updateFoodLikes}/>
        </div>
      </div>
    );
  }

  getUser(userText) {
    axios.get('http://localhost:5000/User/' + userText)
       .then(data => {
           this.setState({user: data["data"]["data"], 
                          username: userText, 
                          activityLikes: data["data"]["data"]["activityLikes"],
                          foodLikes: data["data"]["data"]["foodLikes"],
                          isLoggedIn: true});
           console.log("Current User: " + this.state.user.username +
                       "Current Food Likes: " + this.state.user.foodLikes);
           this.updateState();
       })
       .catch((error) => {
            this.setState({user: {},
                          username: "Invalid username.",
                          activityLikes: [],
                          foodLikes: []});
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
           this.updateState();
       });
  }

 updateFoodLikes(foodTitle) {
    this.state.user["foodLikes"].push(foodTitle);
    console.log(this.state.user["foodLikes"]);

    axios.put('http://localhost:5000/User/' + this.state.user.username + '/', this.state.user, {headers:{'Content-Type': 'application/json'}})
       .then(r => {
                console.log(r.status);
                this.getUser(this.state.username);
                this.getFoodRecommendations();
            });
  }

  updateState() {
    this.setState({user: this.state.user,
                   username: this.state.username,
                   isLoggedIn: this.state.isLoggedIn,
                   isCalloutVisible: this.state.isCalloutVisible,
                   recommendedActivities: this.state.recommendedActivities,
                   recommendedFood: this.state.recommendedFood,
                   foodLikes: this.state.foodLikes,
                   activityLikes: this.state.activityLikes});
    sessionStorage.setItem('currentUser', this.state.username);
    //window.location.replace("http://localhost:3000/preferences");
  }



}


export default HomePage;