import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavPage from './NavPage';
import './FindBusinesses.css';
import { getFoodBusinessRecommendations, getActivityRecommendations, getUserPreferences } from '../../utils/user-api';

class FindBusinesses extends Component {

  constructor() {
    super()
    this.state = {
      username: sessionStorage.getItem('currentUser'),
      zip_code: '', chosen_category: '',
      recs: [],
      activityLikes: [],
      foodLikes: []};
    this.setZipCode = this.setZipCode.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.getFoodRecommendations = this.getFoodRecommendations.bind(this);
    this.getPreferences = this.getPreferences.bind(this);
  }


  setZipCode(input) {
    this.setState({username: this.state.username, zip_code: input.target.value, chosen_category: this.state.chosen_category});
        console.log('zip code is ' + this.state.zip_code);
  }

  setCategory(input) {
    this.setState({username: this.state.username, zip_code: this.state.zip_code, chosen_category: input.target.value});
    console.log('category is ' + this.state.chosen_category);
  }

  getFoodRecommendations() {
  //start here
    console.log('rec user is ' + this.state.username);
    console.log('rec zip is ' + this.state.zip_code);
    console.log('rec category is ' + this.state.chosen_category);
    getFoodBusinessRecommendations(this.state.username, this.state.zip_code, this.state.chosen_category).then((data) => {
      var businesses = data.businesses;
      var new_recs = [];
      businesses.forEach(function(biz) {
         new_recs.push(JSON.parse(biz));
         console.log(JSON.parse(biz));
      });
      this.setState({recs: new_recs});
    });
  }

  getPreferences() {
    getUserPreferences(this.state.username).then((data) => {
      this.setState({username: this.state.username, activityLikes: data.activityLikes, foodLikes: data.foodLikes});
    });
  }

  componentDidMount() {
    this.getPreferences();
    //new Selectr(document.getElementById('mySelect'));
  }



  render() {

    const { userData }  = this.state;

    return (
      <div>
        <NavPage />

        <div className="row">
        <h3 className="text-center">Enter Location and Category </h3>


        <select id="mySelect" onChange={this.setCategory}>
          <optgroup label="Foods">
          {(this.state.foodLikes).map((food) => (
            <option value={food}>{food}</option>
          ))}
          </optgroup>
          <optgroup label="Activities">
           {(this.state.activityLikes).map((activity) => (
            <option value={activity}>{activity}</option>
          ))}
          </optgroup>
        </select>


        <br/><br/>

         <input type="text"
               name="zip_input"
               onChange={this.setZipCode}/>
        <button className="btn btn-large btn-success" onClick={this.getFoodRecommendations} >Enter Zip Code</button>

        <br/><br/>


        <hr/>
        </div>



        <div className="row">
        <h3 className="text-center">Recommendations</h3>
        <hr/>

        { (this.state.recs).map((rec) => (
            <div className="col-sm-4" key={rec}>
                <div className="panel panel-primary">
                  <div className="card">
                    <img className="card-img-top" src={rec["image_url"]} alt=""/>
                    <div className="card-body">
                      <h4 className="card-title">{rec["name"]}</h4>
                      <div className="card-text">
                        <p>address: { rec["location"] }</p>
                        <p>rating: { rec["rating"] }</p>
                      </div>
                    </div>
                    <div className="card-footer">
                      <center><a href={rec["url"]} className="btn btn-primary">Find Out More!</a></center>
                    </div>
                  </div>
                </div>
            </div>
          ))}

        </div>

      </div>
    );
  }
}

export default FindBusinesses;