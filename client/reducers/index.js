import { combineReducers } from 'redux';
import editBentoReducer from './editBentoReducer';
import navReducer from './navReducer';
import authReducer from './authReducer';
import appReducer from './appReducer';
import personalReducer from './personalReducer';
import displayReducer from './displayReducer';
import searchReducer from './searchReducer';
import landingReducer from './landingReducer';
import voiceReducer from './voiceReducer';

const combinedReducer = combineReducers({
  editBentoInfo: editBentoReducer, // Wilton: Stick to one naming convention
  navReducer,
  searchReducer,
  appReducer,
  personalReducer,
  displayReducer,
  landingReducer,
  authReducer,
  voiceReducer
});

export default combinedReducer;
