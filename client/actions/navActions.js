import axios from 'axios';
import { browserHistory } from 'react-router';

<<<<<<< HEAD
import { CHANGE_INPUT, HANDLE_RENDER_CREATE_PAGE } from './actionTypes.js'
=======
import { CHANGE_INPUT } from './actionTypes.js'
import { handleNavSubmit } from './appActions.js'
>>>>>>> e60b7d34bf8a80ab726a5bd4c3cf19fbc4b356aa

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

<<<<<<< HEAD
export function handleRenderCreatePage() {
  return function(dispatch) {
    dispatch({type: HANDLE_RENDER_CREATE_PAGE, payload: null})
    browserHistory.push('/edit')
  }
}

function handleError(error){
  return {
    type: SAMPLE_REQUEST_ERROR,
    payload: error
=======
// clears text on the search box when it is clicked
export function clearText() {
  return function(dispatch, getState) {
    dispatch({ type: CHANGE_INPUT, input: '' });
>>>>>>> e60b7d34bf8a80ab726a5bd4c3cf19fbc4b356aa
  }
}

// brings up the 'input' to App and will assign to 'query'
export function bringUpInput(event, input) {
  // return function() {
    // console.log('Event:', event);
    return handleNavSubmit(event, input);
  // }
}