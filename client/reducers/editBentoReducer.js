import {HANDLE_EDIT_BENTO_INFO, HANDLE_SAVE_BENTO, HANDLE_NORI_CHANGE, HANDLE_ADD_NEW_NORI, HANDLE_DELETE_NORI, HANDLE_FETCH_BENTO_FOR_EDIT, HANDLE_RENDER_CREATE_PAGE,
HANDLE_IMAGE_UPLOAD} from '../actions/actionTypes.js'

//This is the default state y
const DEFAULT_STATE =  {
  name: '',
  description: '',
  category: '',
  visit_count: 0,
  bento_id: null,
  user_id: 1 || 'guest',

  noris: [{Front: {image: null, text:null, soundFile: null}, Back: {image: null, text:null, soundFile: null}}, {Front: {image: null, text:null, soundFile: null}, Back: {image: null, text:null, soundFile: null}}]

}

//this handler resets the create page back to default whenever a user clicks create

function handleRenderCreatePage(state, action) {
  var def = {
  name: '',
  description: '',
  category: '',
  visit_count: 0,
  bento_id: null,
  user_id: 1 || 'guest',
  noris: [{Front: {image: null, text:null, soundFile: null}, Back: {image: null, text:null, soundFile: null}},{Front: {image: null, text:null, soundFile: null}, Back: {image: null, text:null, soundFile: null}}]
}
  return {...state, ...def}
}


//---------------------------------------------------------------


function handleImageUpload(state, action) {
  return{...state, noris: action.payload}
}


//---------------------------------------------------------------


function handleFetchBentoForEdit(state, action) {
  console.log('helloo?? line 16 of editBentoReducer', action.payload)
  return {...state, ...action.payload}
}

//-------------------------------------------------------------

function handleUpdateRTEState(state, action) {
  return {...state, value: action.payload}
} 

function handleNoriChange(state, action) {
  return {...state, noris: action.payload}
}
//-------------------------------------------------------------

function handleEditBentoInfo(state, action) {
  let val = action.payload.target.value
  return {...state, [action.payload.target.name] : val}
}

function handleSaveBento (state, action) {
  return {...state, bento_id: action.payload}
}

function handleAddNewNori (state, action) {
  return {...state, noris: action.payload}
}

function handleDeleteNori (state, action) {
  return {...state, noris: action.payload}
}

export default function(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case HANDLE_EDIT_BENTO_INFO:
    return handleEditBentoInfo(state, action)

    case HANDLE_SAVE_BENTO:
    return handleSaveBento(state, action)

    case HANDLE_ADD_NEW_NORI:
    return handleAddNewNori(state, action)

    case HANDLE_DELETE_NORI:
    return handleDeleteNori(state,action)

    case HANDLE_NORI_CHANGE:
    return handleNoriChange(state, action)

    case HANDLE_FETCH_BENTO_FOR_EDIT:
    return handleFetchBentoForEdit(state, action)

    case HANDLE_RENDER_CREATE_PAGE:
    return handleRenderCreatePage(state, action)

    case HANDLE_IMAGE_UPLOAD:
    return handleImageUpload(state, action)
  }


  return state
}