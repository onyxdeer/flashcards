import {HANDLE_EDIT_BENTO_INFO, HANDLE_SAVE_BENTO, HANDLE_NORI_CHANGE, HANDLE_ADD_NEW_NORI, HANDLE_DELETE_NORI} from '../actions/actionTypes.js'

//This is the default state y
const DEFAULT_STATE =  {
  name: 'Test Name Default Redux',
  description:'Testing Default Redux',
  category: '',
  visit_count: 0,
  bento_id: null,
  user_id: 1 || 'guest',
  noris: [{Front: {image: null, text:null, soundFile: null}, Back: {image: null, text:null, soundFile: null}}, {Front: {image: null, text:null, soundFile: null}, Back: {image: null, text:null, soundFile: null}}]
}

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
  }


  return state
}