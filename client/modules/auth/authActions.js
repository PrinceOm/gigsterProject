import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';
import { replace } from 'react-router-redux';
import { types } from './';
import { setUser } from '../user/userActions';
import { getAllExpenses } from '../expense/expenseActions';
import { BASE_API_URL } from '../environment';

export function validateInput(data) {
  const errors = {};
  if (Validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (data.request !== 'current') {
    if (Validator.isEmpty(data.passwordConfirmation)) {
      errors.passwordConfirmation = 'This field is required';
    }
    if (!Validator.equals(data.passwordConfirmation, data.password)) {
      errors.passwordConfirmation = 'Passwords do not match';
    }
    if (Validator.isEmpty(data.accountType)) {
      errors.accountType = 'Please pick account type';
    }
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}

export function authSuccess(response) {
  return {
    type: types.AUTH_SUCCESS,
    response,
  };
}

export function authFailure(message) {
  return {
    type: types.AUTH_FAILURE,
    message,
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({
      type: types.LOG_OFF,
    });
    dispatch(replace('/'));
  };
}

// eslint-disable-line no-undef

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
  return fetch(uri, authRequestOptions(credentials)) // eslint-disable-line no-undef
    .then(response => response.json());
};


export function authCheck(token) {
  return (dispatch) => {
    fetch(`${BASE_API_URL}/api/user/me`, { // eslint-disable-line no-undef
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.json())
    .then((response) => {
      if (response.message) {
        dispatch(authFailure(response.message));
      } else {
        response.token = token; // eslint-disable-line no-param-reassign
        dispatch(getAllExpenses(response));
        dispatch(authSuccess(response));
        dispatch(setUser(response));
        setTimeout(() => {
          dispatch(replace('/app'));
        }, 500);
      }
    })
    .catch(() => {
      dispatch(authFailure('Session expired'));
      dispatch(replace('/login'));
    });
  };
}

const handleAuthSuccess = function handleAuthSuccess(dispatch) {
  return (response) => {
    dispatch(authSuccess(response.token));
    dispatch(authCheck(response.token));
  };
};

export function signIn(credentials) {
  return (dispatch) => {
    const { isValid, errors } = validateInput(credentials);
    if (!isValid) {
      return Promise.resolve({ errors });
    }
    return authPost(`${BASE_API_URL}/api/auth/local`, credentials)
      .then(handleAuthSuccess(dispatch))
      .catch((e) => {
        dispatch(authFailure(e));
        dispatch(replace('/login'));
      });
  };
}

export function userSignupRequest(credentials) {
  return (dispatch) => {
    const { isValid, errors } = validateInput(credentials);
    if (!isValid) {
      return Promise.resolve({ errors });
    }
    return authPost(`${BASE_API_URL}/api/user/`, credentials)
      .then(handleAuthSuccess(dispatch))
      .catch((e) => {
        dispatch(authFailure(e));
        dispatch(replace('/signup'));
      });
  };
}
