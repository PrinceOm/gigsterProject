import * as types from './constants';

const initialState = {
  message: null,
  token: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.AUTH_SUCCESS:
      return {
        ...state,
        message: null,
        token: action.token,
      };
    case types.AUTH_FAILURE:
      return {
        ...state,
        message: action.message,
        token: null,
      };
    case types.LOG_OUT:
      return {
        ...state,
        message: action.message,
        token: null,
      };
    default:
      return state;
  }
}
