import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reducers from './modules';
import Homepage from './components/Homepage';
import { authCheck } from './modules/auth/authActions';
import App from './components/App';
import Signup from './containers/Signup';
import Main from './components/Main';
import localStorage, { loadState } from './localStorage';

const store = createStore(
  reducers,
  loadState(),
  applyMiddleware(thunk, routerMiddleware(browserHistory)),
);

localStorage(store);

const requireAuth = (nextState, replace) => {
  if (!store.getState().auth.token) {
    replace({ pathname: '/' });
  } else {
    authCheck(store.getState().auth.token);
  }
};

const checkToken = (nextState, replace) => {
  if (store.getState().auth.token) {
    replace({ pathname: '/app' });
  }
};

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Homepage} onEnter={checkToken} >
        <IndexRoute component={Main} />
        <Route path="signup" component={Signup} />
        <Route path="login" component={Main} />
      </Route>
      <Route path="/app" component={App} onEnter={requireAuth} />
    </Router>
  </Provider>

), document.getElementById('app'));
