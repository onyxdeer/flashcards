import axios from 'axios';
import { HANDLE_GET_ALOT_BENTOS, HANDLE_FETCH_LANDING_BENTO_IMAGES, HANDLE_RENDER_CREATE_PAGE } from '../actions/actionTypes';

export function handleFetchLandingBentoImages(bentoIds) {
  return function (dispatch) {
    axios.get('/api/thumbnails', { params: { bento_id: bentoIds } })
    .then((response) => {
      dispatch({ type: HANDLE_FETCH_LANDING_BENTO_IMAGES, payload: response.data });
    });
  };
}

export function handleGetAlotBentos() {
  return (dispatch) => {
    axios.get('/api/popular')
    .then((response) => {
      dispatch({ type: HANDLE_GET_ALOT_BENTOS, payload: response.data });
    });
  };
}

export function handleRenderCreatePage() {
  return (dispatch) => {
    dispatch({ type: HANDLE_RENDER_CREATE_PAGE, payload: null });
  };
}
