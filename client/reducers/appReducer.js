import { GET_SHORTENER_ID, UPDATE_QUERY, GET_USERID, GET_BENTOID, CHANGE_SEARCHACTIVE, CLEAR_SHORTENER_ID } from '../actions/actionTypes.js'

const stateDefault = {
  query: '',
  userId: 'guest',
  bentoId: null,
  searchActive: false,
  shortenerId: null,
  gotShortenerId: false,
};

const handleShortenerId = (state, action) => {
  console.log('Calling handleShortenerId:', action.shortenerId);
  return {
    ...state,
    shortenerId: action.shortenerId,
    gotShortenerId: action.gotShortenerId,
  };
};

const handleClearShortenerId = (state, action) => {
  console.log('action.gotShortenerId:', action.gotShortenerId);
  return {
    ...state,
    gotShortenerId: action.gotShortenerId,
  };
}

const handleQuery = (state, action) => {
  return {
    ...state,
    query: action.query
  };
};

const handleUserId = (state, action) => {
  return {
    ...state,
    userId: action.userId
  };
};

const handleBentoId = (state, action) => {
  return {
    ...state,
    bentoId: action.bentoId
  };
};

const handleSearchActive = (state, action) => {
  return {
    ...state,
    searchActive: action.searchActive
  };
};

export default (state = stateDefault, action) => {
  // Identical: state = state || stateDefault;
  switch (action.type) {
    case GET_SHORTENER_ID:
      return handleShortenerId(state, action);
    case UPDATE_QUERY: 
      return handleQuery(state, action);
    case GET_USERID: 
      return handleUserId(state, action);
    case GET_BENTOID: 
      return handleBentoId(state, action);
    case CHANGE_SEARCHACTIVE: 
      return handleSearchActive(state, action);  
    case CLEAR_SHORTENER_ID:
      return handleClearShortenerId(state, action);
    default:
      return state;
  }
};
