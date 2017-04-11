//reason why we have these types as capitalized constants is mainly for convention
// this also acts as a hub in case we need to change the action type names
// make new action types and put it in here and export them

//also you want to make sure you are using these CONST variables instead of just strings when you specify action types
//because if you misspell a string it'll be impossible to find out
//but if you misspell a variable it'll throw an error which you can then debug
export const GET_HELLO = 'GET_HELLO';
export const POST_HELLO = 'POST_HELLO';
export const WAVE_HELLO = 'WAVE_HELLO';
export const SAMPLE_REQUEST_ERROR = 'SAMPLE_REQUEST_ERROR';
export const HANDLE_EDIT_BENTO_INFO = 'HANDLE_EDIT_BENTO_INFO';
export const HANDLE_SAVE_BENTO = 'HANDLE_SAVE_BENTO' ;