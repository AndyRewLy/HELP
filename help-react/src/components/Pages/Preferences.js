import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavPage from './NavPage';
import { getUserPreferences } from '../../utils/user-api';


class Preferences extends Component {

  constructor() {
    super()
    this.state = { username: 'hi', activityLikes: [], foodLikes: [] };
  }

  getPreferences() {
    getUserPreferences('broccoli').then((data) => {
      this.setState({username: data.username, activityLikes: data.activityLikes, foodLikes: data.foodLikes});
    });
  }

  componentDidMount() {
    this.getPreferences();
  }

  render() {

    const { userData }  = this.state;

    return (
      <div>
        <NavPage />
        <div className="row">
        <h3 className="text-center">Food Preferences</h3>
        <hr/>

        { (this.state.foodLikes).map((food) => (
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
        <h3 className="text-center">Activity Preferences</h3>
        <hr/>

        { (this.state.activityLikes).map((activity) => (
              <div className="col-sm-4" key={activity}>
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title"> <span className="btn">{ activity }</span></h3>
                  </div>
                  <div className="panel-body">
                    <p> whyyy </p>
                  </div>
                </div>
              </div>
          ))}

        <hr/>
        </div>

        <div className="col-sm-12">
          <div className="jumbotron text-center">
            <h2>you cant update this cuz no </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Preferences;