import { MODAL_ON, MODAL_OFF } from './actionTypes';





export function modalOn(){
  return (dispatch) => {
    dispatch({
      type: MODAL_ON,
      isOpen: true
    })
  }
}

export function modalOff(){
  return (dispatch) => {
    dispatch({
      type: MODAL_OFF,
      isOpen: false
    })
  }
}