import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn, login, logout } from '../../utils/login-utils';
import './NavPage.css';

class NavPage extends Component {

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">HALP</Link>
        </div>
        <ul className="nav navbar-nav">
          <li>
            <Link to="/preferences/">Preferences</Link>
          </li>
          <li>
           <Link to="/recommendations/">Recommendations</Link>
          </li>
          <li>
           <Link to="/findbusinesses/">Find Businesses</Link>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li>
           {
             (isLoggedIn()) ? ( <button className="btn btn-danger log" onClick={() => logout()}>Log out </button> ) : ( <button className="btn btn-info log" onClick={() => login()}>Log In</button> )
           }
          </li>
         </ul>
      </nav>
    );
  }
}
export default NavPage;