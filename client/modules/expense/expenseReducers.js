import * as types from './constants';

const initialState = {
  expenses: [],
  reportExpenses: [],
};

export default function (state = initialState, action) {
  let newList;
  switch (action.type) {
    case types.EXPENSE_ADD:
      newList = state.expenses.slice();
      newList.push(action.response);
      return {
        ...state,
        expenses: newList,
      };
    case types.EXPENSE_DELETE:
      newList = state.expenses.slice();
      newList.forEach((list, index) => {
        if (list._id === action.expenseId) {
          newList.splice(index, 1);
        }
      });
      return {
        ...state,
        expenses: newList,
      };
    case types.EXPENSE_REPORT:
      return {
        ...state,
      };
    case types.EXPENSE_POPULATE:
      return {
        ...state,
        expenses: action.response,
      };
    case types.EXPENSE_UPDATE:
      newList = state.expenses.slice();
      newList.forEach((list, index) => {
        if (list._id === action.expense._id) {
          newList[index] = action.expense;
        }
      });
      return {
        ...state,
        expenses: newList,
      };
    default:
      return state;
  }
}
