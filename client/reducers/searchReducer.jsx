import { FIND_BENTOS } from '../actions/actionTypes.js';

const stateDefault = []

const handleSearchBentos = (state, action) => {
    return action.payload
}

export default function(state = stateDefault, action) {
    switch (action.type) {
      case FIND_BENTOS:
        return handleSearchBentos(state, action);
        break;
      default:
        return state;
    }
}