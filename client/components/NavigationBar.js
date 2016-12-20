import React from 'react';
import { Link } from 'react-router';

class NavigationBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <ul className="nav navbar-nav navbar-left">
              <li><Link to="/">Home</Link></li>
            </ul>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/signup">Signup</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavigationBar;
