import { FETCH_USER_BENTOS, FETCH_FAVORITE_BENTOS, FETCH_POPULAR_BENTOS } from '../actions/actionTypes.js';

const stateDefault = [];

const handleFetchUserBentos = (state, action) => {
  return { bentos: action.payload, category: 'Personal' };
}

const handleFetchFavoriteBentos = (state, action) => {
  return { bentos: action.payload, category: 'Favorite' };
}

const handleFetchPopularBentos = (state, action) => {
  return { bentos: action.payload, category: 'Popular' };
}

export default function(state = stateDefault, action) {
    switch (action.type) {
      case FETCH_USER_BENTOS:
      console.log('Calling FETCH_USER_BENTOS with new state:', state);
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