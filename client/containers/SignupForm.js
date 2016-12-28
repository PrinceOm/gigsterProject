import React from 'react';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      accountType: '',
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    this.setState({ errors: {} });
    e.preventDefault();
    this.props.userSignupRequest(this.state)
      .then((t) => {
        if (t.errors) {
          this.setState({ errors: t.errors });
        }
      });
  }

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmit}>

        <h1>Signup now!</h1>

        <div className="form-group">
          <label className="control-label" htmlFor="username">Username</label>
          <input
            onChange={this.onChange}
            value={this.state.username}
            type="text"
            name="username"
            className="form-control"
          />
          {errors.username && <span className="help-block">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label className="control-label" htmlFor="password">Password</label>
          <input
            onChange={this.onChange}
            value={this.state.password}
            type="password"
            name="password"
            className="form-control"
          />
          {errors.password && <span className="help-block">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label className="control-label" htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            onChange={this.onChange}
            value={this.state.passwordConfirmation}
            type="password"
            name="passwordConfirmation"
            className="form-control"
          />
          {errors.passwordConfirmation && <span className="help-block">{errors.passwordConfirmation}</span>}
        </div>

        <div className="form-group">
          <label className="control-label" htmlFor="accountType">Account Type</label>
          <select
            onChange={this.onChange}
            value={this.state.accountType}
            type="text"
            name="accountType"
            className="form-control"
          >
            <option value="" disabled> - Pick - </option>
            <option value="Admin"> Admin </option>
            <option value="Regular"> Regular </option>
          </select>
          {errors.accountType && <span className="help-block">{errors.accountType}</span>}
        </div>

        <div className="form-group">
          <button className="btn btn-primary btn-lg">
            Sign up
          </button>
        </div>

      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
};

export default SignupForm;
