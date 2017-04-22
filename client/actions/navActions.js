import { CHANGE_INPUT, HANDLE_RENDER_CREATE_PAGE } from './actionTypes';
import { handleNavSubmit } from './appActions';

// Detects changes to input in navbar searchbar
export function handleNavSearch(event) {
  return (dispatch) => {
    dispatch({ type: CHANGE_INPUT, input: event.target.value });
  };
}

export function handleRenderCreatePage() {
  return (dispatch) => {
    dispatch({ type: HANDLE_RENDER_CREATE_PAGE, payload: null });
  };
}

// Clears text on searchbar when clicked
export function clearText() {
  return (dispatch) => {
    dispatch({ type: CHANGE_INPUT, input: '' });
  };
}

// Brings up 'input' to App and assigns to 'query'
export function bringUpInput(event, input) {
  return handleNavSubmit(event, input);
}
