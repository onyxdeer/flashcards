import { HANDLE_EMAIL_INPUT, HANDLE_PASSWORD_INPUT, CLEAR_AUTH_INPUTS } from './actionTypes';

export function handleEmailInput(input) {
  return function (dispatch) {
    dispatch({
      type: HANDLE_EMAIL_INPUT,
      payload: input.target.value,
    });
  };
}

export function handlePasswordInput(input) {
  return function (dispatch) {
    dispatch({
      type: HANDLE_PASSWORD_INPUT,
      payload: input.target.value,
    });
  };
}

export function clearAuthInputs() {
  return function (dispatch) {
    dispatch({
      type: CLEAR_AUTH_INPUTS,
      emailAddress: '',
      password: '',
    });
  };
}

export function checkLogin(email, password) {
  return function (dispatch) {
    // dispatch({
    //   type: LOG_IN,
    //   emailAddress: email,
    //   password: password,
    // });
  };
}

export function checkLogout() {
  return function (dispatch) {
    // dispatch({
    //   type: LOG_OUT,
    //   emailAddress: email,
    //   password: password,
    // });
  };
}

export function checkSignup(email, password) {
  return function (dispatch) {
    // dispatch({
    //   type: SIGN_UP,
    //   emailAddress: email,
    //   password: password,
    // });
  };
}


