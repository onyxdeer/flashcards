//reason why we have these types as capitalized constants is mainly for convention
// this also acts as a hub in case we need to change the action type names
// make new action types and put it in here and export them

//also you want to make sure you are using these CONST variables instead of just strings when you specify action types
//because if you misspell a string it'll be impossible to find out
//but if you misspell a variable it'll throw an error which you can then debug
export const GET_HELLO = 'GET_HELLO';
export const POST_HELLO = 'POST_HELLO';
export const CHANGE_INPUT = 'CHANGE_INPUT';
export const WAVE_HELLO = 'WAVE_HELLO';
export const SAMPLE_REQUEST_ERROR = 'SAMPLE_REQUEST_ERROR';
export const SEARCH_BENTOS = 'SEARCH_KEYWORD_BENTOS';
export const FETCH_USER_BENTOS = 'FETCH_USER_BENTOS';
export const FETCH_FAVORITE_BENTOS = 'FETCH_FAVORITE_BENTOS';
export const FETCH_POPULAR_BENTOS = 'FETCH_POPULAR_BENTOS';
export const FIND_BENTOS = 'FIND_BENTOS';
export const USER_BENTOS_FETCHED = 'USER_BENTOS_FETCHED'
export const FAVORITE_BENTOS_FETCHED = 'FAVORITE_BENTOS_FETCHED';
export const POPULAR_BENTOS_FETCHED = 'POPULAR_BENTOS_FETCHED';
export const UPDATE_QUERY = 'UPDATE_QUERY';
export const GET_USERID = 'GET_USERID';
export const GET_BENTOID = 'GET_BENTOID';
export const CHANGE_SEARCHACTIVE = 'CHANGE_SEARCHACTIVE';
