import { UPDATE_QUERY, GET_USER_ID, GET_BENTO_ID } from '../actions/actionTypes.js'

const stateDefault = {
  update_query: '',
  get_user_id: '',
  get_bento_id: ''
};

const handleQuery = (state, action) => {
  return {
    ...state,
    update_query: action.update_query
  };
};

const handleUserId = (state, action) => {
  return {
    ...state,
    get_user_id: action.get_user_id
  };
};

const handleBentoId = (state, action) => {
  return {
    ...state,
    get_bento_id: action.get_bento_id
  };
};

export default (state = stateDefault, action) => {
  // Identical: state = state || stateDefault;
  switch (action.type) {
    case UPDATE_QUERY: 
      return handleQuery(state, action);
    case GET_USER_ID: 
      return handleUserId(state, action);
    case GET_BENTO_ID: 
      return handleBentoId(state, action);      
  }
  return state;
};