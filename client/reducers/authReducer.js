import { LOG_IN, LOG_OUT, SIGN_UP, HANDLE_EMAIL_INPUT, HANDLE_PASSWORD_INPUT, CLEAR_AUTH_INPUTS } from '../actions/actionTypes';

const stateDefault = {
  emailAddress: '',
  password: '',
};

const reduceEmailInput = (state, action) => ({
  ...state,
  emailAddress: action.payload,
});

const reducePasswordInput = (state, action) => ({
  ...state,
  password: action.payload,
});

const reduceClearAuthInputs = (state, action) => ({
  emailAddress: action.emailAddress,
  password: action.password,
});

const reduceLogin = (state, action) => ({
  emailAddress: action.emailAddress,
  password: action.password,
});

const reduceLogout = (state, action) => ({
  emailAddress: action.emailAddress,
  password: action.password,
});

const reduceSignup = (state, action) => ({
  emailAddress: action.emailAddress,
  password: action.password,
});

export default (state = stateDefault, action) => {
  switch (action.type) {
    case HANDLE_EMAIL_INPUT:
      return reduceEmailInput(state, action);
    case HANDLE_PASSWORD_INPUT:
      return reducePasswordInput(state, action);
    case LOG_IN:
      return reduceLogin(state, action);
    case LOG_OUT:
      return reduceLogout(state, action);
    case SIGN_UP:
      return reduceSignup(state, action);
    case CLEAR_AUTH_INPUTS:
      return reduceClearAuthInputs(state, action);
    default:
      return state;
  }
};
