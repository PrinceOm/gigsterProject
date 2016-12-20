import { combineReducers } from 'redux';
import { reducers as auth } from './auth';

export default combineReducers({
  auth,
});
