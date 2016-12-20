import React from 'react';

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      accountType: '',
    };
  }

  render() {
    return (
      <div>
         Signup
      </div>
    );
  }
}

export default Signup;
