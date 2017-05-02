import { HANDLE_GET_ALOT_BENTOS, HANDLE_FETCH_LANDING_BENTO_IMAGES } from '../actions/actionTypes';

const stateDefault = {
  bentos: [],
  images: {},
};

function handleFetchLandingBentoImages(state, action) {
  const images = {};
  action.payload.forEach((image) => {
    if (image.nori_id === null) {
      images[image.bento_id] = [image.url];
      // images[image.bento_id] ? images[image.bento_id].push(image.url) : images[image.bento_id] = [image.url];
    }
  });
  return {
    ...state,
    images: images,
  };
}

const handleGetAlotBentos = (state, action) => ({
  ...state,
  bentos: action.payload,
});

export default (state = stateDefault, action) => {
  switch (action.type) {
    case HANDLE_GET_ALOT_BENTOS:
      return handleGetAlotBentos(state, action);
    case HANDLE_FETCH_LANDING_BENTO_IMAGES:
      return handleFetchLandingBentoImages(state, action);
    default:
      return state;
  }
};
