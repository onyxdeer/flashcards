<<<<<<< HEAD
import {HANDLE_GET_ALOT_BENTOS, HANDLE_FETCH_LANDING_BENTO_IMAGES} from '../actions/actionTypes.js'

const DEFAULT_STATE = {
  bentos: [],
  images: {}
}

function handleFetchLandingBentoImages(state, action) {
  var images = {};
  action.payload.forEach(function(image){
    images[image.bento_id] ? images[image.bento_id].push(image.url) : images[image.bento_id] = [image.url]
  })
  return {...state, images: images}
}

function handleGetAlotBentos(state, action) {
  return {...state, bentos: action.payload}
}
=======
import { HANDLE_GET_ALOT_BENTOS } from '../actions/actionTypes';

const stateDefault = {
  bentos: [],
};

const handleGetAlotBentos = (state, action) => ({ bentos: action.payload });
>>>>>>> d15dabfe4c1c5faef670de8cc86f0150ec412dd4

export default (state = stateDefault, action) => {
  switch (action.type) {
    case HANDLE_GET_ALOT_BENTOS:
<<<<<<< HEAD
    return handleGetAlotBentos(state, action)

    case HANDLE_FETCH_LANDING_BENTO_IMAGES:
    return handleFetchLandingBentoImages(state, action)
=======
      return handleGetAlotBentos(state, action);
    default:
      return state;
>>>>>>> d15dabfe4c1c5faef670de8cc86f0150ec412dd4
  }
};
