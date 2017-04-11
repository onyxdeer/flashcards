import { CHANGE_INPUT } from '../actions/actionTypes.js'

const stateDefault = {
  input: ''
};

let handleInput = (state, action) => {
  return {
    ...state,
    input: action.input
  };
};

export default (state = stateDefault, action) => {
  // Identical: state = state || stateDefault;
  switch (action.type) {
    case 'CHANGE_INPUT': 
      return handleInput(state, action);  
  }
  return state;
};
