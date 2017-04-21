import { FETCH_USER_BENTOS, FETCH_FAVORITE_BENTOS, FETCH_POPULAR_BENTOS } from '../actions/actionTypes';

const stateDefault = [];

const handleFetchUserBentos = (state, action) => ({
  bentos: action.payload,
  category: 'Personal',
});

const handleFetchFavoriteBentos = (state, action) => ({
  bentos: action.payload,
  category: 'Favorite',
});

const handleFetchPopularBentos = (state, action) => ({
  bentos: action.payload,
  category: 'Popular',
});

export default (state = stateDefault, action) => {
  switch (action.type) {
    case FETCH_USER_BENTOS:
      return handleFetchUserBentos(state, action);
    case FETCH_FAVORITE_BENTOS:
      return handleFetchFavoriteBentos(state, action);
    case FETCH_POPULAR_BENTOS:
      return handleFetchPopularBentos(state, action);
    default:
      return state;
  }
};

