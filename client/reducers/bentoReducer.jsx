import {BENTOS_FOUND, USER_BENTOS_FETCHED, FAVORITE_BENTOS_FETCHED, POPULAR_BENTOS_FETCHED} from '../actions/actionTypes.js'

const DEFAULT_STATE = { data: [] }

const handleBentosFound = (state, action) => ({
  ...state, data: action.payload;
})

const handleUserBentosFetched = (state, action) => ({
  ...state, data: action.payload;
})

const handleFavoriteBentosFetched = (state, action) => ({
  ...state, data: action.payload;
})

const handlePopularBentosFetched = (state, action) => ({
  ...state, data: action.payload;
})

export default function(state = DEFAULT_STATE, action) {
    switch (action.type) {
      case BENTOS_FOUND:
        return handleBentosFound(state, action);
        break;
      case USER_BENTOS_FETCHED:
        return handleUserBentosFetched(state, action);
        break;
      case FAVORITE_BENTOS_FETCHED:
        return handleFavoriteBentosFetched(state, action);
        break;
      case POPULAR_BENTOS_FETCHED:
        return handlePopularBentosFetched(state, action);
    }
    return state;
}