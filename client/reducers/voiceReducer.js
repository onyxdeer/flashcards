import { MODAL_ON, MODAL_OFF } from '../actions/actionTypes';


const stateDefault = {
  isOpen: false
};

// const handleSearchBentos = (state, action) => ({
//   ...state,
//   bentos: action.payload,
// });

const handleOn = (state, action) => ({
  isOpen: true
})

const handleOff = (state, action) => ({
  isOpen: false
})

export default (state = stateDefault, action) => {
  switch (action.type) {
    case MODAL_ON:
      return handleOn(state, action);
    case MODAL_OFF:
      return handleOff(state, action);
    default:
      return state;
  }
};
