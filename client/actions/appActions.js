import axios from 'axios';
import { browserHistory } from 'react-router';

import { UPDATE_QUERY, GET_USERID, GET_BENTOID, CHANGE_SEARCHACTIVE, CHANGE_INPUT } from './actionTypes.js'

export function handleNavSubmit(event, input) {
  event.preventDefault();
  return function(dispatch, getState) {
    dispatch({
      type: UPDATE_QUERY,
      query: input
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
  }
}

export function setUserId(id) {
  return function(dispatch, getState) {
    dispatch({ type: GET_USERID, userId: id });
  }  
}