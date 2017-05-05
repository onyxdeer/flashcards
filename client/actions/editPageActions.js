import axios from 'axios';
import RichTextEditor from 'react-rte';
import { convertToRaw } from 'draft-js';
import { HANDLE_EDIT_BENTO_INFO, HANDLE_IMAGE_DELETION, HANDLE_SAVE_BENTO, HANDLE_NORI_CHANGE, HANDLE_ADD_NEW_NORI, HANDLE_DELETE_NORI, HANDLE_IMAGE_UPLOAD } from '../actions/actionTypes';

const notifySave = function () {
  $.notify({
    icon: 'glyphicon glyphicon-ok',
    title: '<strong>Success! </strong>',
    message: 'Bento saved.',
  }, {
    type: 'success',
    allow_dismiss: true,
    showProgressbar: false,
    newest_on_top: true,
    delay: 1000,
    animate: {
      enter: 'animated fadeIn',
      exit: 'animated fadeOut',
    },
    placement: {
      from: 'top',
      align: 'right',
    },
  });
};

const notifyUpdate = function () {
  $.notify({
    icon: 'glyphicon glyphicon-ok',
    title: '<strong>Success! </strong>',
    message: 'Bento updated.',
  }, {
    type: 'success',
    allow_dismiss: false,
    showProgressbar: false,
    newest_on_top: true,
    delay: 1000,
    animate: {
      enter: 'animated fadeIn',
      exit: 'animated fadeOut',
    },
    placement: {
      from: 'top',
      align: 'right',
    },
  });
};

const notifyWarning = function (type) {
  let msg = null;
  if (type === 'nori') {
    msg = 'Fill out at least one Nori.';
  }
  $.notify({
    icon: 'glyphicon glyphicon-warning-sign',
    title: '<strong>Warning! </strong>',
    message: msg || 'Bento name needs to be 5 characters or longer.',
  }, {
    type: 'warning',
    allow_dismiss: true,
    newest_on_top: true,
    delay: 1000,
    animate: {
      enter: 'animated fadeIn',
      exit: 'animated fadeOut',
    },
    placement: {
      from: 'top',
      align: 'right',
    },
  });
};

const empty = JSON.stringify(convertToRaw(RichTextEditor.createEmptyValue()._editorState.getCurrentContent()));

// This handle deletes images
export function handleImageDeletion(bento, index) {
  if (index === 'cover') {
    bento.cover.url = null;
    bento.cover.id = null;
  } else {
    bento.noris[index].Front.image = null;
  }
  return function (dispatch) {
    dispatch({ type: HANDLE_IMAGE_DELETION, payload: bento });
  };
}

// This handle function is used for image uploads
export function handleImageUpload(bento, link, index) {
  if (!index && index !== 0) {
    bento.cover.url = link;
  } else if (index || index === 0) {
    bento.noris[index].Front.image = link;
  }
  return function (dispatch) {
    dispatch({ type: HANDLE_IMAGE_UPLOAD, payload: bento });
  };
}

// This handle function can be used to change the state of any input/textarea field
export function handleChange(event) {
  return function (dispatch) {
    dispatch({ type: HANDLE_EDIT_BENTO_INFO, payload: event });
  };
}

// This handle function is used for the changes of state in each nori with rich text in the RTE
export function handleNoriChange(noris, rawValue, side, index) {
  noris[index][side].text = rawValue;
  // noris[index][side]['rawValue'] = rawValue;
  return function (dispatch) {
    dispatch({ type: HANDLE_NORI_CHANGE, payload: noris });
  };
}

// These handle functions adds/deletes noris
export function handleAddNewNori(bento, index) {
  const noris = bento.noris;
  const newNori = { Front: { image: null, text: empty, soundFile: null }, Back: { image: null, text: empty, soundFile: null } };
  noris.splice(index + 1, 0, newNori);
  const norisAfterAddition = noris;
  return function (dispatch) {
    dispatch({ type: HANDLE_ADD_NEW_NORI, payload: norisAfterAddition });
  };
}

export function handleDeleteNori(bento, index) {
  let noris = bento.noris;
  if (noris.length > 1) {
    noris.splice(index, 1);
    const norisAfterDelete = noris;
    return function (dispatch) {
      dispatch({ type: HANDLE_DELETE_NORI, payload: norisAfterDelete });
    };
  } else if (noris.length === 1) {
    noris = [{ Front: { image: null, text: empty, soundFile: null }, Back: { image: null, text: empty, soundFile: null } }];
    return function (dispatch) {
      dispatch({ type: HANDLE_DELETE_NORI, payload: noris });
    };
  }
}

// This handle function is for the save button from the edit page
export function handleSaveBento(bento) {
  // Check to see if the bento name is at least 5 characters long
  if (bento.name.replace(/\s/g, '').length < 5) {
    return function () {
      notifyWarning();
    };
  }
  let oneCompletedNori = false;
  bento.noris.forEach((nori) => {
    if (!oneCompletedNori) {
      if ((nori.Front.image || JSON.parse(nori.Front.text).blocks[0].text.length > 0) && JSON.parse(nori.Back.text).blocks[0].text.length > 0) {
        oneCompletedNori = true;
      }
    }
  });
  if (!oneCompletedNori) {
    return function () {
      notifyWarning('nori');
    };
  }


  // Send a request to /api/bentos, saving the bento if it's new and assign it a new bento_id or just updates it.
  return function (dispatch) {
    axios.post('/api/bentos', bento)
    .then((response) => {
      if (bento.bento_id) {
        notifyUpdate(bento.name);
      } else {
        notifySave();
      }
      dispatch({ type: HANDLE_SAVE_BENTO, payload: response.data });
    })
    .catch((res) => {
      if (!res.response) return dispatch(handleError('Could not connect to server'))
      dispatch(handleError('Bad Login Info'));
    });
  };
}
