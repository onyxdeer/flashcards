'use strict';
// import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';


const createStoreWithMiddleWare = applyMiddleware(
  thunk,
  createLogger(),
  
)(createStore)


const store = createStoreWithMiddleWare(reducers);
// middleware.listenForReplays(store);


ReactDOM.render( 
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app'));

console.log('Hello World in console!')