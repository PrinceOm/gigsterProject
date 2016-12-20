import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginForm from './LoginForm';
import * as authActions from '../modules/auth/authActions';

class Login extends React.Component {
  render() {
    const { signIn } = this.props;
    return (
      <div className="jumbotron">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <LoginForm signIn={signIn} />
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  signIn: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  signIn: bindActionCreators(authActions.signIn, dispatch),
});

export default connect(null, mapDispatchToProps)(Login);
