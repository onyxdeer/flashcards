import { MODAL_ON, MODAL_OFF } from '../actions/actionTypes';


const stateDefault = {
  noris: [],
  isOpen: false
};

// const handleSearchBentos = (state, action) => ({
//   ...state,
//   bentos: action.payload,
// });

const handleOn = (state, action) => ({
  ...state,
  isOpen: true
})

const handleOff = (state, action) => ({
  ...state,
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
