import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';
import { types } from './';

export function validateInput(data) {
  const errors = {};
  if (data.amount === undefined) {
    data.amount = ''; // eslint-disable-line no-param-reassign
  }
  if (data.description === undefined) {
    data.description = ''; // eslint-disable-line no-param-reassign
  }
  if (data.date === undefined) {
    data.date = ''; // eslint-disable-line no-param-reassign
  }
  if (data.time === undefined) {
    data.time = ''; // eslint-disable-line no-param-reassign
  }
  if (Validator.isEmpty(data.amount)) {
    errors.amount = 'This field is required';
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = 'This field is required';
  }
  if (Validator.isEmpty(data.date)) {
    errors.date = 'This field is required';
  }
  if (Validator.isEmpty(data.time)) {
    errors.time = 'This field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}

export function validateReport(data) {
  const errors = {};
  if (Validator.isEmpty(data.startDate)) {
    errors.startDate = 'This field is required';
  }
  if (Validator.isEmpty(data.startTime)) {
    errors.startTime = 'This field is required';
  }
  if (Validator.isEmpty(data.endDate)) {
    errors.endDate = 'This field is required';
  }
  if (Validator.isEmpty(data.endTime)) {
    errors.endTime = 'This field is required';
  }
  return Promise.resolve({
    errors,
    isValid: isEmpty(errors),
  });
}

export function addExpense(response) {
  return {
    type: types.EXPENSE_ADD,
    response,
  };
}

export function deleteExpense(expenseId) {
  return {
    type: types.EXPENSE_DELETE,
    expenseId,
  };
}

export function updateExpense(expense) {
  return {
    type: types.EXPENSE_UPDATE,
    expense,
  };
}

export function expenseReport(response) {
  return {
    type: types.EXPENSE_REPORT,
    response,
  };
}

export function populateExpense(response) {
  return {
    type: types.EXPENSE_POPULATE,
    response,
  };
}

export function decorateExpense(data) {
  const username = JSON.parse(localStorage.state).auth.username;
  const id = JSON.parse(localStorage.state).auth._id;
  data.owner = id; // eslint-disable-line no-param-reassign
  data.username = username; // eslint-disable-line no-param-reassign
  return data;
}

export function submitExpense(data) {
  // console.log('data', data);
  return (dispatch) => {
    const { isValid, errors } = validateInput(data);
    if (!isValid) {
      return Promise.resolve({ errors });
    }
    const token = JSON.parse(localStorage.state).auth.token;
    const expense = decorateExpense(data);
    return fetch('http://localhost:9000/api/expense/', { // eslint-disable-line no-undef
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(expense),
    })
    .then(res => res.json())
    .then(res => dispatch(addExpense(res)))
    .catch(e => console.log(e));
  };
}

export function removeExpense(expenseId) {
  // console.log('expenseId', expenseId);
  return (dispatch) => {
    const token = JSON.parse(localStorage.state).auth.token;
    const owner = JSON.parse(localStorage.state).auth._id;
    return fetch(`http://localhost:9000/api/expense/${expenseId}`, { // eslint-disable-line no-undef
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
        id: owner,
      },
    })
    .then(() => dispatch(deleteExpense(expenseId)))
    .catch(e => (e));
  };
}

export function editExpense(data) {
  return (dispatch) => {
    const expense = decorateExpense(data);
    const token = JSON.parse(localStorage.state).auth.token;
    return fetch(`http://localhost:9000/api/expense/${expense._id}`, { // eslint-disable-line no-undef
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
        id: expense.owner,
      },
      body: JSON.stringify(expense),
    })
    .then(() => {
      dispatch(updateExpense(expense));
    })
    .catch(e => (e));
  };
}

export function getAllExpenses(userData) {
  return (dispatch) => {
    return fetch('http://localhost:9000/api/expense/', { // eslint-disable-line no-undef
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${userData.token}`,
        accounttype: userData.accountType,
        id: userData._id,
      },
    })
    .then(res => res.json())
    .then(res => dispatch(populateExpense(res)))
    .catch(e => console.log(e));
  };
}
