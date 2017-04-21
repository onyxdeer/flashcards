import axios from 'axios';
import { GET_SHORTENER_ID, UPDATE_QUERY, GET_USERID, GET_BENTOID, CHANGE_SEARCHACTIVE, CHANGE_INPUT } from './actionTypes';

export function getShortenerId(hash) {
  return (dispatch) => {
    axios.get('/api/bentos', {
      params: { id_hash: hash },
    })
    .then((response) => {
      dispatch({
        type: GET_SHORTENER_ID,
        shortenerId: response.data[0].id,
      });
    });
  };
}

export function handleNavSubmit(event, input) {
  event.preventDefault();
  return (dispatch) => {
    dispatch({
      type: UPDATE_QUERY,
      query: input,
    });
    dispatch({
      type: CHANGE_SEARCHACTIVE,
      searchActive: true,
    });
  };
}

export function handleNavSearch(event) {
  return (dispatch) => {
    dispatch({ type: CHANGE_INPUT, input: event.target.value });
  };
}

export function endNavSubmit() {
  return (dispatch) => {
    dispatch({ type: CHANGE_SEARCHACTIVE, searchActive: false });
  };
}

export function setBentoId(id) {
  return (dispatch) => {
    dispatch({ type: GET_BENTOID, bentoId: id });
    dispatch({ type: GET_SHORTENER_ID, shortenerId: null });
  };
}

export function setUserId(id) {
  return (dispatch) => {
    dispatch({ type: GET_USERID, userId: id });
  };
}
