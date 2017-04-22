// Import corresponding actions types
import { GET_HELLO, WAVE_HELLO, POST_HELLO } from '../actions/actionTypes';

// NOTES: ES6 - ({}) after fat arrow implicitly puts return in front of object
const handleGetHello = (state, action) => ({
  ...state, data: `${action.payload} hello world`,
});

// NOTES: Normal function version
function handlePostHello(state, action) {
  // Babel ...state syntax allows you to put rest of state inside object you're returning
  // Just like spread operator in arrays
  return {
    ...state,
    data: action.payload,
  };
}

const DEFAULT_STATE = { data: [] };

// we're exporting this function essentially as default, so when we import from another function using syntax 
// import x from './sampleReducers.js'
// the x is the alias variable you want to name it as
// ES6 feature state = DEFAULT_STATE means if state isn't a variable, it'll default to variable DEFAULT_STATE which we defined above, the reason we want to have a default state is because state has initial state and when state changes it's just a different snap shot of the state. so essentially react components are syncd to the state(whcih can change over time), and in order to sync this we need to also handle the case where the state is at the beginning when it hasn't been updated.
export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_HELLO:
      // Call handler function so we can decouple logic from reducer for cleaner code
      // Make sure you pass state and action to handler function, or else you can't access these 2 critical variables
      return handleGetHello(state, action);
    case WAVE_HELLO:
      // Can also directly write logic in here, but not good practice
      return { ...state, data: `${action.payload} I waved hello` };
    case POST_HELLO:
      return handlePostHello(state, action);
    default:
      return state;
  }
};
