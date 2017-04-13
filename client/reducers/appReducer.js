import { UPDATE_QUERY, GET_USERID, GET_BENTOID, CHANGE_SEARCHACTIVE } from '../actions/actionTypes.js'

const stateDefault = {
  query: '',
  userId: '',
  bentoId: '',
  searchActive: false
};

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
    case UPDATE_QUERY: 
      return handleQuery(state, action);
    case GET_USERID: 
      return handleUserId(state, action);
    case GET_BENTOID: 
      return handleBentoId(state, action);
    case CHANGE_SEARCHACTIVE: 
      return handleSearchActive(state, action);      
  }
  return state;
};