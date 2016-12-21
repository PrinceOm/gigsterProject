import React from 'react';

class ReportDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      default: 'empty',
    };
  }

  render() {
    return (
      <div className="col-xs-12">
        what what
        <button onClick={this.props.toggleOption}>button</button>
      </div>
    );
  }
}

ReportDisplay.propTypes = {
  toggleOption: React.PropTypes.func.isRequired,
};

export default ReportDisplay;
