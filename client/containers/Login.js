import React from 'react';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    return (
      <div>
         Login
      </div>
    );
  }
}

export default Login;
