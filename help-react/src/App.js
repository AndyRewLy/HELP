import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
       user: {},
       userInput: 'Input User'
    };

    this.getUser = this.getUser.bind(this);
    this.setUserName = this.setUserName.bind(this);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="text"
               name="userInput"
               value={this.state.userInput}
               onChange={this.setUserName}/>
        <button class="buttons" onClick={this.getUser}>Get User</button>
        <p>{this.state.user.username}</p>
        <p>{this.state.user.activityLikes}</p>
        <p>{this.state.user.foodLikes}</p>
      </div>
    );
  }

  getUser() {
    axios.get('http://localhost:5000/User/' + this.state.userInput)
       .then(data => {
           this.setState({user: data["data"], userInput: this.state.userInput});
           console.log(data["data"]);
           console.log(this.state.user);
       });     
  }

  setUserName(e) {
    this.setState({user: this.state.user, userInput: e.target.value});
    console.log(this.state.userInput)
  }
}

export default App;
