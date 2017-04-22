import RichTextEditor from 'react-rte';
import { convertToRaw } from 'draft-js';
import { HANDLE_EDIT_BENTO_INFO, HANDLE_SAVE_BENTO, HANDLE_NORI_CHANGE, HANDLE_ADD_NEW_NORI, HANDLE_DELETE_NORI, HANDLE_FETCH_BENTO_FOR_EDIT, HANDLE_RENDER_CREATE_PAGE, HANDLE_IMAGE_UPLOAD } from '../actions/actionTypes';

// This is the default state y
const empty = JSON.stringify(convertToRaw(RichTextEditor.createEmptyValue()._editorState.getCurrentContent()));

const stateDefault = {
  name: '',
  description: '',
  category: '',
  visit_count: 0,
  bento_id: null,
  user_id: 1 || 'guest',
  noris: [{ Front: { image: null, text: empty, soundFile: null }, Back: { image: null, text: empty, soundFile: null } }, { Front: { image: null, text: empty, soundFile: null }, Back: { image: null, text: empty, soundFile: null } }],
};

<<<<<<< HEAD
function handleFetchBentoForEdit(state, action) {
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
=======
// This handler resets the create page back to default whenever a user clicks create
function handleRenderCreatePage(state, action) {
  const def = {
    name: '',
    description: '',
    category: '',
    visit_count: 0,
    bento_id: null,
    user_id: 1 || 'guest',
    noris: [{ Front: { image: null, text: empty, soundFile: null }, Back: { image: null, text: empty, soundFile: null } }, { Front: { image: null, text: empty, soundFile: null }, Back: { image: null, text: empty, soundFile: null } }],
  };
  return { ...state, ...def };
>>>>>>> d15dabfe4c1c5faef670de8cc86f0150ec412dd4
}

const handleImageUpload = (state, action) => ({
  ...state,
  noris: action.payload,
});

const handleFetchBentoForEdit = (state, action) => ({
  ...state,
  ...action.payload,
});

const handleNoriChange = (state, action) => ({
  ...state,
  noris: action.payload,
});

const handleEditBentoInfo = (state, action) => {
  const val = action.payload.target.value;
  return { ...state, [action.payload.target.name]: val };
};

const handleSaveBento = (state, action) => ({
  ...state,
  bento_id: action.payload,
});

const handleAddNewNori = (state, action) => ({
  ...state,
  noris: action.payload,
});

const handleDeleteNori = (state, action) => ({
  ...state,
  noris: action.payload,
});

export default (state = stateDefault, action) => {
  switch (action.type) {
    case HANDLE_EDIT_BENTO_INFO:
      return handleEditBentoInfo(state, action);
    case HANDLE_SAVE_BENTO:
      return handleSaveBento(state, action);
    case HANDLE_ADD_NEW_NORI:
      return handleAddNewNori(state, action);
    case HANDLE_DELETE_NORI:
      return handleDeleteNori(state, action);
    case HANDLE_NORI_CHANGE:
      return handleNoriChange(state, action);
    case HANDLE_FETCH_BENTO_FOR_EDIT:
      return handleFetchBentoForEdit(state, action);
    case HANDLE_RENDER_CREATE_PAGE:
      return handleRenderCreatePage(state, action);
    case HANDLE_IMAGE_UPLOAD:
      return handleImageUpload(state, action);
    default:
      return state;
  }
};
