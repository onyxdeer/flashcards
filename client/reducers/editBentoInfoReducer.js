import { HANDLE_EDIT_BENTO_INFO } from '../actions/actionTypes.js'
//This is the default state y
const DEFAULT_STATE =  {
  name: 'Test Name Default Redux',
  description:'Testing Default Redux',
  category: '',
  visit_count: 0,
  bento_id: null,
  user_id: 'guest',
  noris: [{Front: {image: null, text:null, soundFile: null}, Back: {image: null, text:null, soundFile: null}}, {Front: {image: null, text:null, soundFile: null}, Back: {image: null, text:null, soundFile: null}}]
}

function handleEditBentoInfo(state, action) {
  let val = action.payload.target.value
  return {
    ...state, 
    [action.payload.target.name] : val
  }
}

export default function(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case HANDLE_EDIT_BENTO_INFO:
    return handleEditBentoInfo(state, action)
  }
  return state
}