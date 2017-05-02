import { MODAL_ON, MODAL_OFF, TERMINATE_VOICE } from '../actions/actionTypes';


const stateDefault = {
  noris: [],
  isOpen: false,
  terminate: false,
};


const handleOn = (state, action) => ({
  ...state,
  isOpen: true
})

const handleOff = (state, action) => ({
  ...state,
  isOpen: false
})

const terminateVoice = (state, action) => ({
  ...state,
  terminate: true
})

export default (state = stateDefault, action) => {
  switch (action.type) {
    case MODAL_ON:
      return handleOn(state, action);
    case MODAL_OFF:
      return handleOff(state, action);
    case TERMINATE_VOICE:
      return terminateVoice(state, action);
    default:
      return state;
  }
};
