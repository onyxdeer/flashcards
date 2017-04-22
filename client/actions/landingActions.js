import axios from 'axios';
import { HANDLE_GET_ALOT_BENTOS } from '../actions/actionTypes';

export function handleGetAlotBentos() {
  return (dispatch) => {
    axios.get('/api/popular')
    .then((response) => {
      dispatch({ type: HANDLE_GET_ALOT_BENTOS, payload: response.data });
    });
  };
}
