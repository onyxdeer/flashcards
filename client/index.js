'use strict';
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

<<<<<<< HEAD
// import {routerMiddleware, browserHistory, syncHistoryWithStore} from 'react-router-redux'

const createStoreWithMiddleWare = applyMiddleware(
  thunk,
  createLogger()
)(createStore)

=======
const createStoreWithMiddleWare = applyMiddleware(
  thunk,
  createLogger(),

)(createStore);
>>>>>>> eb0e272311568fa0dc05b153b38e6f14086e6462

const store = createStoreWithMiddleWare(reducers);
// middleware.listenForReplays(store);

ReactDOM.render( 
  <Provider store={store}>
      <App />
  </Provider>, document.getElementById('app'));

console.log('Hello World in console!');