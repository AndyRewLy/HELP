import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavPage from './NavPage';
import { getUserPreferences } from '../../utils/user-api';


class Preferences extends Component {

  constructor() {
    super();
    this.state = { username: sessionStorage.getItem('currentUser'), activityLikes: [], foodLikes: [] };
  }

  getPreferences() {
    getUserPreferences(this.state.username).then((data) => {
      this.setState({username: this.state.username, activityLikes: data.activityLikes, foodLikes: data.foodLikes});
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
                  <div className="panel-body">
                    <p> { activity } </p>
                  </div>
                </div>
              </div>
          ))}

        <hr/>
        </div>

      </div>
    );
  }
}

export default Preferences;