import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavPage from './NavPage';
import { getFoodRecommendations, getActivityRecommendations } from '../../utils/user-api';


class Recommendations extends Component {

  constructor() {
    super()
    this.state = {
        user: {},
        username: sessionStorage.getItem('currentUser'),
        isLoggedIn: true,
        activityRecs: [],
        foodRecs: [],
        foodLikes: [],
        activityLikes: []};
    this.updateFoodLikes = this.updateFoodLikes.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  getFoodRecommendations() {
    getFoodRecommendations(this.state.username).then((data) => {
      this.setState({username: this.state.username, activityRecs: this.state.activityRecs, foodRecs: data});
    });
  }

  getActivityRecommendations() {
    getActivityRecommendations(this.state.username).then((data) => {
      this.setState({username: this.state.username, activityRecs: data, foodRecs: this.state.foodRecs});
    });
  }

  updateFoodLikes(foodTitle) {
    this.state.user["foodLikes"].push(foodTitle);
    //console.log(this.state.user["foodLikes"]);

    axios.put('http://localhost:5000/User/' + this.state.user.username + '/', this.state.user, {headers:{'Content-Type': 'application/json'}})
       .then(r => {
                console.log(r.status);
                this.getUser(this.state.username);
                this.getFoodRecommendations();
            });
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

   updateState() {
    this.setState({user: this.state.user,
                   username: this.state.username,
                   isLoggedIn: this.state.isLoggedIn,
                   activityRecs: this.state.activityRecs,
                   foodRecs: this.state.foodRecs,
                   foodLikes: this.state.foodLikes,
                   activityLikes: this.state.activityLikes});
    sessionStorage.setItem('currentUser', this.state.username);
    window.location.replace("http://localhost:3000/preferences");
  }

  componentDidMount() {
    this.getUser(this.state.username);
    this.getFoodRecommendations();
    this.getActivityRecommendations();
  }

  render() {

    const { userData }  = this.state;

    console.log("foodtitle aye: " + this.state.user["foodLikes"])
    return (
      <div>
        <NavPage />
        <div className="row">
        <h3 className="text-center">Food Recommendations</h3>
        <hr/>

        { (this.state.foodRecs).map((food) => (
              <div className="col-sm-4" key={food}>
                <div className="panel panel-primary">
                  <div className="panel-body">
                    <center><p>{food}</p></center>
                    <center><button className="btn-success" value={food} onClick={()=>{this.updateFoodLikes(food)}}><span class="glyphicon glyphicon-ok"></span></button></center>
                  </div>
                </div>
              </div>
          ))}

        <hr/>
        </div>

        <div className="row">
        <h3 className="text-center">Activity Recommendations</h3>
        <hr/>

        { (this.state.activityRecs).map((activity) => (
              <div className="col-sm-4" key={activity}>
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title"> <span className="btn">{ activity }</span></h3>
                  </div>
                  <div className="panel-body">
                    <p> stuff here </p>
                  </div>
                </div>
              </div>
          ))}

        <hr/>
        </div>

        <div className="col-sm-12">
          <div className="jumbotron text-center">
            <h2>you should be able to update this eventually </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Recommendations;