'use strict';
// import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/reducers';
import thunk from 'redux-thunk';

ReactDOM.render( <App />, document.getElementById('app'));

console.log('Hello World in console!')