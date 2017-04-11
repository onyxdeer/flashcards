import { combineReducers } from 'redux';
// import { routeReducer } from 'react-router-redux';

// import bentoReducer from './bentoReducer.jsx';
import searchReducer from './searchReducer.jsx';
import personalReducer from './personalReducer.jsx';
import categoryReducer from './categoryReducer.jsx';

// NOTES: THIS FILE IS where we combine all of the reducers we wrote
// SO you can import them in here, and add the reducer inside the combineReducer function below
import sampleReducer from './sampleReducer.js';
import navReducer from './navReducer.jsx';

const combinedReducer = combineReducers({
  // routing: routeReducer
  // test: testReducer
  // sampleReducer : sampleReducer which can be written just as sampleReducer
  sampleReducer,
  navReducer,
  searchReducer,
  personalReducer,
  categoryReducer
});

export default combinedReducer;