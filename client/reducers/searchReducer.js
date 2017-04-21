import { FIND_BENTOS } from '../actions/actionTypes';

const stateDefault = [];

const handleSearchBentos = (state, action) => action.payload;

export default (state = stateDefault, action) => {
  switch (action.type) {
    case FIND_BENTOS:
      return handleSearchBentos(state, action);
    default:
      return state;
  }
};
