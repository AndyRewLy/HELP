import React from 'react';
import ReactDOM from 'react-dom';
import Preferences from './components/Pages/Preferences';
import Recommendations from './components/Pages/Recommendations';
import HomePage from './components/Pages/HomePage';
import { Switch, Router, Route, BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

const Main = () => {
  return (
    <div className="container">
    <Switch>
      <Route exact path='/' component={HomePage}/>
      <Route exact path='/preferences' component={Preferences}/>
      <Route path='/recommendations' component={Recommendations}/>
    </Switch>
    </div>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <Route path='/' component={Main} />
  </BrowserRouter>,
  document.getElementById('root')
);