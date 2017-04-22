/*import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import App from './components/App.jsx';
import reducers from './reducers';

const store = applyMiddleware(thunk, createLogger())(createStore)(reducers)

ReactDOM.render( 
  <Provider store={store}>
      <App />
  </Provider>, document.getElementById('app'));*/

'use strict';
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import App from './components/App.jsx';

import { Provider} from 'react-redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
const store = applyMiddleware(thunk, createLogger())(createStore)(reducers)

ReactDOM.render( 
  <Provider store={store}>
      <App />
  </Provider>, document.getElementById('app'));  