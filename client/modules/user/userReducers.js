import * as types from './constants';

const initialState = {
  _id: null,
  username: null,
  accountType: null,
  expenses: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...initialState,
        ...action.response,
      };
    case types.UNSET_USER:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
