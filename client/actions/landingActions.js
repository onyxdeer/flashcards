import {HANDLE_GET_ALOT_BENTOS} from '../actions/actionTypes.js'
import axios from 'axios';

export function handleGetAlotBentos() {
  return function(dispatch){
    axios.get('/api/popular')
    .then((response) => {
      dispatch({type: HANDLE_GET_ALOT_BENTOS, payload: response.data})
    })
  }
}