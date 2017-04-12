import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';

import navReducer from './navReducer.jsx';
import personalReducer from './personalReducer.js';
import displayReducer from './displayReducer.js';
import searchReducer from './searchReducer.js';
import editBentoReducer from './editBentoReducer.js'

// NOTES: THIS FILE IS where we combine all of the reducers we wrote
// SO you can import them in here, and add the reducer inside the combineReducer function below
import sampleReducer from './sampleReducer.js';

const combinedReducer = combineReducers({
  // routing: routeReducer,
  // test: testReducer
  // sampleReducer : sampleReducer which can be written just as sampleReducer
  sampleReducer,
  editBentoInfo: editBentoReducer,
  navReducer,
  personalReducer,
  displayReducer,
  searchReducer
});

export default combinedReducer;