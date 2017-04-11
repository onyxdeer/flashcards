import axios from 'axios';
import { browserHistory } from 'react-router';

import { CHANGE_INPUT } from './actionTypes.js'

//an example of a asynchronous redux thunk action.
export function nav(somedata, someMoreData) {
  return function(dispatch, getState) {
    console.log('getstate inside nav action', getState());
    dispatch({ type: CHANGE_INPUT, input: somedata });
  }
}

function handleError(error){
  return {
    type: SAMPLE_REQUEST_ERROR,
    payload: error
  }
}