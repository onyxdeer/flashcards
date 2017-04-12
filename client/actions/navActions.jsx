import axios from 'axios';
import { browserHistory } from 'react-router';

import { CHANGE_INPUT } from './actionTypes.js'
import { handleNavSubmit } from './appActions.jsx'

//an example of a asynchronous redux thunk action.
// export function nav(somedata, someMoreData) {
//   return function(dispatch, getState) {
//     console.log('getstate inside nav action', getState());
//     dispatch({ type: CHANGE_INPUT, input: somedata });
//   }    
// };

// detects changes to input in navbar searchbar
export function handleNavSearch(event) {
  return function(dispatch, getState) {
    dispatch({ type: CHANGE_INPUT, input: event.target.value });
  }
}

// clears text on the search box when it is clicked
export function clearText() {
  return function(dispatch, getState) {
    dispatch({ type: CHANGE_INPUT, input: '' });
  }
}

// brings up the 'input' to App and will assign to 'query'
export function bringUpInput(event, input) {
  // return function() {
    // console.log('Event:', event);
    return handleNavSubmit(event, input);
  // }
}