import { FETCH_USER_BENTOS, FETCH_FAVORITE_BENTOS, FETCH_POPULAR_BENTOS } from '../actions/actionTypes.js';

const handleFetchUserBentos = (state, action) => ({
  ...state, data: action.payload;
})

const handleFetchFavoriteBentos = (state, action) => ({
  ...state, data: action.payload;
})

const handleFetchPopularBentos = (state, action) => ({
  ...state, data: action.payload;
})

export default function(state = null, action) {
    switch (action.type) {
      case FETCH_USER_BENTOS:
        return handleFetchUserBentos(state, action);
        break;
      case FETCH_FAVORITE_BENTOS:
        return handleFetchFavoriteBentos(state, action);
        break;
      case FETCH_POPULAR_BENTOS:
        return handleFetchPopularBentos(state, action);
        break;
    }
    return state;
}