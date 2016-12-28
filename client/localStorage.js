import throttle from 'lodash/throttle';

export const loadState = function loadState() {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
  }
};

export default function subscribe(store) {
  store.subscribe(throttle(() => {
    saveState({
      auth: store.getState().auth,
      expense: store.getState().expense,
      user: store.getState().user,
    });
  }, 1000));
}
