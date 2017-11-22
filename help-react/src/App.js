import React, { Component } from 'react';
import './App.css';
import './index.css';
import axios from 'axios';

import NavPage from './components/Pages/NavPage.js';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
       user: {},
       userInput: 'Input User',
       recommendedActivities: [],
       recommendedFood: []
    };

    this.getUser = this.getUser.bind(this);
    this.setUserName = this.setUserName.bind(this);
    this.getFoodRecommendations = this.getFoodRecommendations.bind(this);
  }

  render() {
    return (
      <div className="App">
        <div className="app-content">
        </div>
        <input type="text"
               name="userInput"
               value={this.state.userInput}
               onChange={this.setUserName}/>
        <button className="btn btn-large btn-success" onClick={this.getUser}>Get User</button>
        <p>Current User: {this.state.user.username}</p>
        <p>All user activity likes: {this.state.user.activityLikes}</p>
        <p>All user food likes: {this.state.user.foodLikes}</p>

        <button className="btn btn-large btn-success" onClick={this.getFoodRecommendations}>Get Food Recommendations</button>
        <p>Recommended Food Likes: {this.state.recommendedFood}</p>
      </div>
    );
  }

  getUser() {
    axios.get('http://localhost:5000/User/' + this.state.userInput)
       .then(data => {
           this.setState({user: data["data"]["data"], userInput: this.state.userInput});
           console.log(data["data"]["data"]);
           console.log("user state is: " + this.state.user);
       });     
  }

  getFoodRecommendations() {
    axios.get('http://localhost:5000/User/' + this.state.user.username + "/recommend/food/category")
       .then(data => {
           this.setState({user: this.state.user, 
                          userInput: this.state.userInput,
                          recommendedActivities: [],
                          recommendedFood: data["data"]});
           console.log(data["data"]);
           console.log("user food recommendations is: " + this.state.recommendedFood);
       });     
  }

  setUserName(e) {
    this.setState({user: this.state.user, userInput: e.target.value});
    console.log(this.state.userInput)
  }
}

export default App;
