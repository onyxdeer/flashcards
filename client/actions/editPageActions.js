import {HANDLE_EDIT_BENTO_INFO, HANDLE_IMAGE_DELETION, HANDLE_SAVE_BENTO, HANDLE_NORI_CHANGE, HANDLE_ADD_NEW_NORI, HANDLE_DELETE_NORI, HANDLE_IMAGE_UPLOAD} from '../actions/actionTypes.js';
import axios from 'axios';
import RichTextEditor from 'react-rte'
import {convertToRaw} from 'draft-js'
var notifySave = function () {
  var notify = $.notify( '<strong>Success</strong> Your bento has been saved!', {
  type: 'success',
	allow_dismiss: false,
	showProgressbar: false,
  delay: 1250,
  animate: {
    enter: 'animated lightSpeedIn',
    exit: 'animated lightSpeedOut'
  }
});
}

var notifyUpdate = function (bentoName) {
  var notify = $.notify('<strong>Updated '+bentoName +': </strong>' + bentoName, {
  type: 'success',
	allow_dismiss: false,
	showProgressbar: false,
  delay: 1250,
  animate: {
    enter: 'animated lightSpeedIn',
    exit: 'animated lightSpeedOut'
  }
});
}

var notifyWarning = function() {
  var notify = $.notify({
      icon: 'glyphicon glyphicon-warning-sign',
      title : '<strong>Warning: </strong>',
      message: "Please give your new Bento a name and make sure it's longer than 5 characters",
    }, {
      type: 'warning', 
      allow_dismiss: true,
      newest_on_top: true,
      delay: 3000,
      animate: {
        enter: 'animated pulse',
        exit: 'animated flipOutX'
      },
      placement: {
        from: 'top',
        align: 'left'
      }
    })
}

const empty = JSON.stringify(convertToRaw(RichTextEditor.createEmptyValue()._editorState.getCurrentContent()));

//this handle deletes images
export function handleImageDeletion(bento, index) {
  if(index === "cover"){
    bento.cover.url = null;
    bento.cover.id = null;
  } else {
    bento.noris[index]["Front"]["image"] = null;
  }
  return function(dispatch) {
    dispatch({type: HANDLE_IMAGE_DELETION, payload: bento})
  }
}


//this handle function is used for image uploads

export function handleImageUpload(bento, link, index) {
  if(!index && index != 0){
    bento.cover.url = link;
  } else if (index || index == 0){
    bento.noris[index]["Front"]['image'] = link;
  }
  return function(dispatch) {
    dispatch({type: HANDLE_IMAGE_UPLOAD, payload: bento})
  }
}

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
  var newNori = {Front: {image: null, text:empty, soundFile: null}, Back: {image: null, text:empty, soundFile: null}}
  noris.splice(index+1, 0, newNori)
  var norisAfterAddition = noris;
  console.log(norisAfterAddition)
  return function(dispatch){
    dispatch({type: HANDLE_ADD_NEW_NORI, payload:norisAfterAddition})
  }
}

export function handleDeleteNori (bento ,index) {
  var noris = bento.noris;
  if(noris.length > 1) {
    noris.splice(index, 1);
    var norisAfterDelete = noris;
    return function(dispatch){
      dispatch({type: HANDLE_DELETE_NORI, payload: norisAfterDelete})
    }
  } else if (noris.length == 1) {
    noris = [{Front: {image: null, text:empty, soundFile: null}, Back: {image: null, text:empty, soundFile: null}}]
      return function(dispatch) {
          dispatch({type: HANDLE_DELETE_NORI, payload: noris})
      }
  }
}
//++++++++++++++++++++++++++++++++++++++++++++++++++

//this handle function is for the save button from the edit page++++++++++++++++++++++++++++++++++++++++++++++++
export function handleSaveBento(bento) {
  //Check to see if the bento name is at least 5 characters long
  if(bento.name.replace(/\s/g,'').length < 5) {
    return function () {
        notifyWarning()
  }
} else {
  //send a request to /api/bentos, saving the bento if it's new and assign it a new bento_id or just updates it.
  return function(dispatch) {
    axios.post('/api/bentos', bento)
    .then((response) => {
    if(bento.bento_id) {
      notifyUpdate(bento.name);
    } else {
      notifySave();
    }
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