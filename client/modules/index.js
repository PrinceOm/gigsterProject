import { combineReducers } from 'redux';
import { reducers as auth } from './auth';
import { reducers as user } from './user';


export default combineReducers({
  auth,
  user,
});
