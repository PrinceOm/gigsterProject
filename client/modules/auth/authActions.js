import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';
import { replace } from 'react-router-redux';
import { types } from './';

export function validateInput(data) {
  const errors = {};
  if (Validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  }
  if (!Validator.equals(data.passwordConfirmation, data.password)) {
    errors.passwordConfirmation = 'Passwords do not match';
  }
  if (Validator.isEmpty(data.accountType)) {
    errors.accountType = 'Please pick account type';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}

export function authSuccess(token) {
  console.log(token)
  return {
    type: types.AUTH_SUCCESS,
    token,
  };
}

export function authFailure(message) {
  console.log(message)
  return {
    type: types.AUTH_FAILURE,
    message,
  };
}

export function logOut(message) {
  return {
    type: types.LOG_OUT,
    message,
  };
}

const authRequestOptions = function authRequestOptions(userCredentials) {
  return {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userCredentials),
  };
};

const authPost = function authRequest(uri, credentials) {
  return fetch(uri, authRequestOptions(credentials))
    .then(response => response.json())
    .catch(e => console.log(e));
};

export function logout() {
  return (dispatch) => {
    dispatch({
      type: types.LOG_OUT,
    });
    dispatch(replace('/login'));
  };
};

const handleAuthSuccess = function handleAuthSuccess(dispatch) {
  return (response) => {
    dispatch(authSuccess(response.token));
    // dispatch(getExpenses());
    //call main page after login
  };
};

export function signIn(credentials) {
  return authPost('localhost:9000/auth/local', credentials);
}

export function userSignupRequest(credentials) {
  return (dispatch) => {
    const { isValid, errors } = validateInput(credentials);
    if (!isValid) {
      return Promise.resolve({ errors });
    }
    return authPost('http://localhost:9000/api/user/', credentials)
      .then(handleAuthSuccess(dispatch))
      .catch(e => dispatch(authFailure(e)));
  };
}
