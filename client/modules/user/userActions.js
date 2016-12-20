import { types } from './';

export function setUser(response) {
  return {
    type: types.SET_USER,
    response,
  };
}

export function unsetUser() {
  return { type: types.UNSET_USER };
}
