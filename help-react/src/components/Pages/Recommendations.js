import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavPage from './NavPage';
import { getFoodRecommendations, getActivityRecommendations } from '../../utils/user-api';


class Recommendations extends Component {

  constructor() {
    super()
    this.state = { username: '', activityRecs: [], foodRecs: [] };
  }

  getFoodRecommendations() {
    getFoodRecommendations('broccoli').then((data) => {
      this.setState({username: this.state.username, activityRecs: this.state.activityRecs, foodRecs: data});
    });
  }

  getActivityRecommendations() {
    getActivityRecommendations('broccoli').then((data) => {
      this.setState({username: this.state.username, activityRecs: data, foodRecs: this.state.foodRecs});
    });
  }

  componentDidMount() {
    this.getFoodRecommendations();
    this.getActivityRecommendations();
  }

  render() {

    const { userData }  = this.state;

    return (
      <div>
        <NavPage />
        <div className="row">
        <h3 className="text-center">Food Recommendations</h3>
        <hr/>

        { (this.state.foodRecs).map((food) => (
              <div className="col-sm-4" key={food}>
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title"> <span className="btn">{ food }</span></h3>
                  </div>
                  <div className="panel-body">
                    <p>{ food }</p>
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
                    <p> kill me </p>
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