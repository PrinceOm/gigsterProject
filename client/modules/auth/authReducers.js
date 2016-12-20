import * as types from './constants';

const initialState = {
  message: null,
  token: null,
  _id: null,
  username: null,
  accountType: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.AUTH_SUCCESS:
      return {
        ...state,
        ...action.response,
      };
    case types.AUTH_FAILURE:
      return {
        ...state,
        message: action.message,
      };
    case types.LOG_OFF:
      return {
        ...state,
        message: null,
        token: null,
        _id: null,
        username: null,
        accountType: null,
      };
    default:
      return state;
  }
}
