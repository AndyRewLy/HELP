import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NavPage from './components/Pages/NavPage.js';
import HomePage from './components/Pages/HomePage.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<NavPage />, document.getElementById('nav'));
ReactDOM.render(<HomePage />, document.getElementById('root'));
registerServiceWorker();
