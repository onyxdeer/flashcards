import { MODAL_ON, MODAL_OFF, TERMINATE_VOICE } from './actionTypes';


function handleData(){
  
}



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
    });
    dispatch({
      type: TERMINATE_VOICE
    })
  }
}