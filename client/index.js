import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import App from './components/App.jsx';
import reducers from './reducers';


const store = applyMiddleware(thunk, createLogger())(createStore)(reducers);

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>, document.getElementById('app'));
