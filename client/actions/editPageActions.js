import {HANDLE_EDIT_BENTO_INFO, HANDLE_SAVE_BENTO, HANDLE_NORI_CHANGE, HANDLE_ADD_NEW_NORI, HANDLE_DELETE_NORI} from '../actions/actionTypes.js'
import axios from 'axios';
//this handle function is used to fetch the bento data(including noris) after a user has clicked an Edit+++++++++++++++++++++++++++++++++++++++++++++ HAS BEEN MOVED TO PERSONALACTIONS
// export function handleFetchBentoForEdit (bento, bentoId, userId) {
//   console.log("This function has fired")
//   return function(dispatch) {
//     axios.get('/api/bentos', {params: {id: bentoId, user_id: userId}})
//     .then((response)=>{
//       var data = response.data[0];
//       bento.name = data.name;
//       bento.description = data.description;
//       bento.bento_id = bentoId;
//       bento.user_id = userId;
//     })
//     .then(() => {
//       axios.get('/api/bentos_noris', {params: {bento_id: bentoId}})
//       .then((response) => {
//         return response.data.map((data) => {data.nori_id})
//       })
//       .then((arrayNorisId) => {
//         axios.get('/api/noris', {params: {id: arrayNorisId}})
//         .then((response) => {
//           var savedNorisArray = response.data.map(function(nori){
//             var newNori = {Front: {image: null, text:null, soundFile: null}, Back: {image: null, text:null, soundFile: null}}
//             newNori.Front.text = nori.text_front;
//             newNori.Back.text = nori.text_back;
//             newNori.Front.soundFile = nori.audio_url_front;
//             newNori.Back.soundFile = nori.audio_url_back;
//             return newNori
//           })
//           bento.noris = savedNorisArray;
//         })
//         .then(() => {
//             dispatch({type: HANDLE_FETCH_BENTO_FOR_EDIT, payload: bento});
//             dispatch(push('/edit'))
//         })
//       })
//     })
//   }
// }
//+++++++++++++++++++++++++++++++++++++++++++++




//this handle function can be used to change the state of any input/textarea field++++++++++++++++++++++++++++++++++++
export function handleChange(event) {
  return function(dispatch) {
        dispatch({ type: HANDLE_EDIT_BENTO_INFO, payload: event });
  }
}
//+++++++++++++++++++++++++++++++++++++++++++++++++


//this handle function is used for the changes of state in each nori with rich text in the RTE+++++++++++++++++++++++++
export function handleNoriChange(noris, rawValue, side, index) {
  noris[index][side]['text'] = rawValue;
  // noris[index][side]['rawValue'] = rawValue;
  return function(dispatch) {
    dispatch({type: HANDLE_NORI_CHANGE, payload: noris})
  }
}
//+++++++++++++++++++++++++++++++++++++++++++++++++


//these handle functions adds/deletes noris +++++++++++++++++++
export function handleAddNewNori (bento, index) {
  console.log("Does this fire", bento, index)
  var noris = bento.noris;
  var newNori = {Front: {image: null, text:null, soundFile: null}, Back: {image: null, text:null, soundFile: null}, id: null}
  noris.splice(index+1, 0, newNori)
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