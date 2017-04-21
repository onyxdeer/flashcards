import { HANDLE_GET_ALOT_BENTOS } from '../actions/actionTypes';

const stateDefault = {
  bentos: [],
};

const handleGetAlotBentos = (state, action) => ({ bentos: action.payload });

export default (state = stateDefault, action) => {
  switch (action.type) {
    case HANDLE_GET_ALOT_BENTOS:
      return handleGetAlotBentos(state, action);
    default:
      return state;
  }
};
