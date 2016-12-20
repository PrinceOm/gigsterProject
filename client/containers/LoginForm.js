import React from 'react';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      request: 'current',
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
    this.props.signIn(this.state)
      .then(t => t.errors ? this.setState({ errors: t.errors }): null);
  }

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmit}>

        <h1>Login now!</h1>

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
          <button className="btn btn-primary btn-lg">
            Sign up
          </button>
        </div>

      </form>
    );
  }
}

export default SignupForm;
