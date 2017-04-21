import axios from 'axios';
import { browserHistory } from 'react-router';

import { GET_SHORTENER_ID, UPDATE_QUERY, GET_USERID, GET_BENTOID, CHANGE_SEARCHACTIVE, CHANGE_INPUT, CLEAR_SHORTENER_ID } from './actionTypes';

export function getShortenerId(hash, cb) {
  return function (dispatch) {
    return axios.get('/api/bentos', {
      params: { id_hash: hash },
    })
    .then((response) => {
      console.log('GOT RESPONSE BACK FROM GETSHORTENERID:', response);
      dispatch({
        type: GET_SHORTENER_ID,
        shortenerId: response.data[0].id,
        gotShortenerId: true,
      });
    });
  };
}

export function clearShortenerId() {
  return function (dispatch) {
    dispatch({
      type: CLEAR_SHORTENER_ID,
      gotShortenerId: false,
    });
  }
}

export function handleNavSubmit(event, input) {
  event.preventDefault();
  return function (dispatch) {
    dispatch({
      type: UPDATE_QUERY,
      query: input,
    });
    dispatch({
      type: CHANGE_SEARCHACTIVE,
      searchActive: true
    }); 
  }    
}

export function handleNavSearch(event) {
  return function(dispatch, getState) {
    dispatch({ type: CHANGE_INPUT, input: event.target.value });
  }
}

// ends the submit action
export function endNavSubmit() {  
  return function(dispatch, getState) {
    dispatch({ type: CHANGE_SEARCHACTIVE, searchActive: false });
  };
}

export function setBentoId(id) {
  return function(dispatch, getState) {
    dispatch({ type: GET_BENTOID, bentoId: id });
    dispatch({ type: GET_SHORTENER_ID, shortenerId: null });
  }
}

export function setUserId(id) {
  return function(dispatch, getState) {
    dispatch({ type: GET_USERID, userId: id });
  }  
}