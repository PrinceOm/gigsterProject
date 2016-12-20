import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignupForm from './SignupForm';
import * as authActions from '../modules/auth/authActions';

const Signup = ({ userSignupRequest }) => (
  <div className="jumbotron">
    <div className="row">
      <div className="col-md-4 col-md-offset-4">
        <SignupForm userSignupRequest={userSignupRequest} />
      </div>
    </div>
  </div>
);

Signup.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  userSignupRequest: bindActionCreators(authActions.userSignupRequest, dispatch),
});

export default connect(null, mapDispatchToProps)(Signup);
