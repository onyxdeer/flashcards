import { MODAL_ON, MODAL_OFF } from '../actions/actionTypes';


const stateDefault = {
  bentos: null,
};

const handleSearchBentos = (state, action) => ({
  ...state,
  bentos: action.payload,
});

export default (state = stateDefault, action) => {
  switch (action.type) {
    case FIND_BENTOS:
      return handleSearchBentos(state, action);
    default:
      return state;
  }
};
