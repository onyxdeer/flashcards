import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';

// NOTES: THIS FILE IS where we combine all of the reducers we wrote
// SO you can import them in here, and add the reducer inside the combineReducer function below
import sampleReducer from './sampleReducer.js'
import editBentoReducer from './editBentoReducer.js'
import navReducer from './navReducer.jsx'
import appReducer from './appReducer.jsx'
import personalReducer from './personalReducer.jsx';
import searchReducer from './searchReducer.jsx';
// import bentoReducer from './bentoReducer.jsx';
// import personalReducer from './personalReducer.jsx';

const combinedReducer = combineReducers({
  // routing: routeReducer,
  // test: testReducer
  // sampleReducer : sampleReducer which can be written just as sampleReducer
  sampleReducer,
  editBentoReducer,
  navReducer,
  searchReducer,
  appReducer,
  personalReducer
});

export default combinedReducer;