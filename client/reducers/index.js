import { combineReducers } from 'redux';
// import { routeReducer } from 'react-router-redux';



// INSTRUCTIONS: create reducers in this folder and  export them
// SO you can import them in here, and add the reducer inside the combineReducer function below
import sampleReducer from './sampleReducer.js'

const combinedReducer = combineReducers({
  // routing: routeReducer
  // test: testReducer
  // sampleReducer : sampleReducer which can be written just as sampleReducer
  sampleReducer
});

export default combinedReducer;