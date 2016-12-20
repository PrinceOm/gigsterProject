import { combineReducers } from 'redux';
import { reducers as auth } from './auth';
import { reducers as expense } from './expense';
import { reducers as user } from './user';


export default combineReducers({
  auth,
  user,
  expense,
});
