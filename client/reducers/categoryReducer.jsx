import { CHANGE_CATEGORY } from '../actions/actionTypes.js';

const stateDefault = '';

const handleChangeCategory = (state, action) => {
  return action.payload;
}

export default function(state = stateDefault, action) {
    switch (action.type) {
      case CHANGE_CATEGORY:
      console.log('CHANGE_CATEGORY CALLED WITH ACTION.PAYLOAD:', action.payload);
        return handleChangeCategory(state , action);
        break;
    }
    return state;
}