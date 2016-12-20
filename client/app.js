import { Router, Route, browserHistory } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import Homepage from './components/Homepage';


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Homepage}>
      <Route path="/Main" component={Main} />
      <Route path="/" component={Homepage} />
    </Route>
  </Router>

), document.getElementById('app'));
