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
export const GET_SHORTENER_ID = 'GET_SHORTENER_ID';
export const HANDLE_EDIT_BENTO_INFO = 'HANDLE_EDIT_BENTO_INFO';
export const HANDLE_SAVE_BENTO = 'HANDLE_SAVE_BENTO' ;
export const HANDLE_ADD_NEW_NORI = 'HANDLE_ADD_NEW_NORI';
export const HANDLE_DELETE_NORI = 'HANDLE_DELETE_NORI';
export const HANDLE_NORI_CHANGE = 'HANDLE_NORI_CHANGE';
export const HANDLE_FETCH_BENTO_FOR_EDIT = 'HANDLE_FETCH_BENTO_FOR_EDIT';
export const HANDLE_RENDER_CREATE_PAGE = 'HANDLE_RENDER_CREATE_PAGE';


export const SEARCH_BENTOS = 'SEARCH_KEYWORD_BENTOS';
export const FETCH_USER_BENTOS = 'FETCH_USER_BENTOS';
export const FETCH_FAVORITE_BENTOS = 'FETCH_FAVORITE_BENTOS';
export const FETCH_POPULAR_BENTOS = 'FETCH_POPULAR_BENTOS';
export const FETCH_NORIS = 'FETCH_NORIS';
export const FETCH_FRONT_IMAGES = 'FETCH_FRONT_IMAGES';
export const FETCH_BACK_IMAGES = 'FETCH_BACK_IMAGES';
export const FETCH_BENTO_METADATA = 'FETCH_BENTO_METADATA';
export const GOTO_PREV_NORI = 'GOTO_PREV_NORI';
export const GOTO_NEXT_NORI = 'GOTO_NEXT_NORI';
export const SET_NORI_NUMBER = 'SET_NORI_NUMBER';
export const SHUFFLE_NORIS = 'SHUFFLE_NORIS';
export const FIND_BENTOS = 'FIND_BENTOS';
export const USER_BENTOS_FETCHED = 'USER_BENTOS_FETCHED'
export const FAVORITE_BENTOS_FETCHED = 'FAVORITE_BENTOS_FETCHED';
export const POPULAR_BENTOS_FETCHED = 'POPULAR_BENTOS_FETCHED';
export const UPDATE_QUERY = 'UPDATE_QUERY';
export const GET_USERID = 'GET_USERID';
export const GET_BENTOID = 'GET_BENTOID';
export const CHANGE_SEARCHACTIVE = 'CHANGE_SEARCHACTIVE';
export const FLIP_NORI_TO_FRONT = 'FLIP_NORI_TO_FRONT';
export const FLIP_NORI_TO_BACK = 'FLIP_NORI_TO_BACK';
export const HANDLE_VIEW_PAGE_INPUT = 'HANDLE_VIEW_PAGE_INPUT';
export const SEND_SMS = 'SEND_SMS';
export const HANDLE_PHONE_NUMBER_INPUT = 'HANDLE_PHONE_NUMBER_INPUT';
export const CLEAR_PHONE_NUMBER_INPUT = 'CLEAR_PHONE_NUMBER_INPUT';
export const ANIMATE_BENTO_TRAVERSAL = 'ANIMATE_BENTO_TRAVERSAL';
