import axios from 'axios';
import { browserHistory } from 'react-router';



import { GET_HELLO, WAVE_HELLO, POST_HELLO, SAMPLE_REQUEST_ERROR } from '../actions/actionTypes.js'


//an example of a asynchronous redux thunk action.
export function sample(somedata, someMoreData) {
  return function(dispatch) {
    axios.post('/api/sample', { data: somedata, more: someMoreData })
      .then(response => {
        dispatch({ type: POST_HELLO, payload: 'we just got some coolshit' });
        browserHistory.push('/');
      })
      .catch((res) => {
        if (!res.response) return dispatch(handleError('Could not connect to server'))
        dispatch(handleError('Bad Login Info'));
      });
  }
}


function handleError(error){
  return {
    type: SAMPLE_REQUEST_ERROR,
    payload: error
  }
}