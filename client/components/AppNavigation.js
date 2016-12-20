import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../modules/auth/authActions';

class AppNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.logoff = this.logoff.bind(this);
  }
  logoff(e) {
    e.preventDefault();
    console.log(this.props)
    this.props.logout();
  }
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li><button href="/" onClick={this.logoff}>Logout</button></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}


AppNavigation.propTypes = {
  logout: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  logout: bindActionCreators(authActions.logout, dispatch),
});

export default connect(null, mapDispatchToProps)(AppNavigation);
