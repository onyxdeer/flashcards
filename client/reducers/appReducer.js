import { GET_SHORTENER_ID, UPDATE_QUERY, GET_USERID, GET_BENTOID, CHANGE_SEARCHACTIVE, CLEAR_SHORTENER_ID } from '../actions/actionTypes';

const stateDefault = {
  query: '',
  userId: 'guest',
  bentoId: null,
  searchActive: false,
  shortenerId: null,
};

const handleShortenerId = (state, action) => ({
  ...state,
  shortenerId: action.shortenerId,
  gotShortenerId: action.gotShortenerId,
});

const handleQuery = (state, action) => ({
  ...state,
  query: action.query,
});

const handleClearShortenerId = (state, action) => ({
  ...state,
  gotShortenerId: action.gotShortenerId,
});

const handleUserId = (state, action) => ({
  ...state,
  userId: action.userId,
});

const handleBentoId = (state, action) => ({
  ...state,
  bentoId: action.bentoId,
});

const handleSearchActive = (state, action) => ({
  ...state,
  searchActive: action.searchActive,
});

export default (state = stateDefault, action) => {
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
