import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './modules';
import Homepage from './components/Homepage';
import Signup from './containers/Signup';
import Main from './components/Main';
import localStorage, { loadState } from './localStorage';


const store = createStore(
  reducers,
  loadState(),
  applyMiddleware(thunk),
);

localStorage(store);

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Homepage}>
        <IndexRoute component={Main} />
        <Route path="signup" component={Signup} />
        <Route path="login" component={Main} />
      </Route>
    </Router>
  </Provider>

), document.getElementById('app'));
