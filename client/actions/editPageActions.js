import {HANDLE_EDIT_BENTO_INFO, HANDLE_SAVE_BENTO} from '../actions/actionTypes.js'


export function handleChange(event) {
  return function(dispatch) {
        dispatch({ type: HANDLE_EDIT_BENTO_INFO, payload: event });
  }
}

export

