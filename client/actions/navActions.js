import axios from 'axios';
import { browserHistory } from 'react-router';

import { CHANGE_INPUT, HANDLE_RENDER_CREATE_PAGE } from './actionTypes.js'

//an example of a asynchronous redux thunk action.
export function nav(somedata, someMoreData) {
  return function(dispatch, getState) {
    console.log('getstate inside nav action', getState());
    dispatch({ type: CHANGE_INPUT, input: somedata });
  }
}

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
  }
}