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


export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case HANDLE_GET_ALOT_BENTOS:
    return handleGetAlotBentos(state, action)

    case HANDLE_FETCH_LANDING_BENTO_IMAGES:
    return handleFetchLandingBentoImages(state, action)

  }

  return state;

};
