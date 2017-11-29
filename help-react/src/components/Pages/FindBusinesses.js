import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavPage from './NavPage';
import { getFoodBusinessRecommendations, getActivityRecommendations } from '../../utils/user-api';


class FindBusinesses extends Component {

  constructor() {
    super()
    this.state = {
      username: sessionStorage.getItem('currentUser'),
      zip_code: '', chosen_category: '',
      recs: ['hello'] };
    this.setZipCode = this.setZipCode.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.getFoodRecommendations = this.getFoodRecommendations.bind(this);
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

  componentDidMount() {
    //this.getFoodRecommendations();
  }

  render() {

    const { userData }  = this.state;

    return (
      <div>
        <NavPage />

        <div className="row">
        <h3 className="text-center">Enter Location and Category </h3>

         <input type="text"
               name="zip_input"
               value={this.state.zip_code}
               onChange={this.setZipCode}/>
        <button className="btn btn-large btn-success">Enter Zip Code</button>

        <br/><br/>

         <input type="text"
               name="category_input"
               value={this.state.chosen_category}
               onChange={this.setCategory}/>
        <button className="btn btn-large btn-success" onClick={this.getFoodRecommendations}>Enter Category</button>


        <hr/>
        </div>


        <div className="row">
        <h3 className="text-center">Recommendations</h3>
        <hr/>

        { (this.state.recs).map((rec) => (
              <div className="col-sm-4" key={rec}>
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title"> <span className="btn">{ rec["name"] }</span></h3>
                  </div>
                  <div className="panel-body">
                    <p>address: { rec["location"] }</p>
                    <p>rating: { rec["rating"] }</p>
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