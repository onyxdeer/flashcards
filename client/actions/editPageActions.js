import {HANDLE_EDIT_BENTO_INFO, HANDLE_SAVE_BENTO, HANDLE_NORI_CHANGE, HANDLE_ADD_NEW_NORI, HANDLE_DELETE_NORI} from '../actions/actionTypes.js'
import axios from 'axios';

//this handle function can be used to change the state of any input/textarea field++++++++++++++++++++++++++++++++++++
export function handleChange(event) {
  return function(dispatch) {
        dispatch({ type: HANDLE_EDIT_BENTO_INFO, payload: event });
  }
}
//+++++++++++++++++++++++++++++++++++++++++++++++++


//this handle function is used for the changes of state in each nori with rich text in the RTE+++++++++++++++++++++++++
export function handleNoriChange() {

}
//+++++++++++++++++++++++++++++++++++++++++++++++++


//these handle functions adds/deletes noris +++++++++++++++++++
export function handleAddNewNori (bento, index) {
  console.log("Does this fire", bento, index)
  var noris = bento.noris;
  var newNori = {Front: {image: null, text:null, soundFile: null}, Back: {image: null, text:null, soundFile: null}, id: null}
  noris.splice(index, 0, newNori)
  var norisAfterAddition = noris;
  console.log(norisAfterAddition)
  return function(dispatch){
    dispatch({type: HANDLE_ADD_NEW_NORI, payload:norisAfterAddition})
  }
}

export function handleDeleteNori (bento ,index) {
  var noris = bento.noris;
  noris.splice(index, 1);
  var norisAfterDelete = noris;
  return function(dispatch){
    dispatch({type: HANDLE_DELETE_NORI, payload: norisAfterDelete})
  }
}
//++++++++++++++++++++++++++++++++++++++++++++++++++

//this handle function is for the save button from the edit page++++++++++++++++++++++++++++++++++++++++++++++++
export function handleSaveBento(bento) {
  //Check to see if the bento name is at least 5 characters long
  if(bento.name.replace(/\s/g,'').length < 5) {
  alert("Please give your new Bento a name and make sure it's longer than 5 characters")
} else {``
  //send a request to /api/bentos, saving the bento if it's new and assign it a new bento_id or just updates it.
  return function(dispatch) {
    axios.post('/api/bentos', bento)
    .then((response) => {
    console.log('Your bento has been saved!', response.data)
    dispatch({type: HANDLE_SAVE_BENTO, payload: response.data})
    })
    .catch((res) => {
      if (!res.response) return dispatch(handleError('Could not connect to server'))
      dispatch(handleError('Bad Login Info'));
    })
  }}
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++

//handle function for errors +++++++++++++++++++++++++++++++++
function handleError(error){
  return {
    type: SAMPLE_REQUEST_ERROR,
    payload: error
  }
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++