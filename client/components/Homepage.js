import React from 'react';
import { Link } from 'react-router';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>

        <nav id="nav">
          <ul>
            <li><Link to="/Home">Home</Link></li>
            <li><Link to="/">App</Link></li>
            <li><Link to="/Login">Login</Link></li>
          </ul>
          <ul>
            <li><Link to="/home">ExpenseTracker</Link></li>
          </ul>
        </nav>
        <div>
          signup or login
        </div>

        <footer id="footer">
          <p>© 2016 ExpenseTracker, Inc.</p>
        </footer>

      </div>
    );
  }
}

export default Homepage;
