import { CHANGE_INPUT } from '../actions/actionTypes';

const stateDefault = {
  input: '',
};

const handleInput = (state, action) => ({
  ...state,
  input: action.input,
});

export default (state = stateDefault, action) => {
  switch (action.type) {
    case CHANGE_INPUT:
      return handleInput(state, action);
    default:
      return state;
  }
};
