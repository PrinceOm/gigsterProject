import React from 'react';
import { validateReport } from '../modules/expense/expenseActions';

class GenerateReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
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

    // this.props.toggleOption()(this.state)
    validateReport(this.state)
      .then((t) => {
        if (t.isValid) {
          this.props.toggleOption(e);
        } else {
          this.setState({ errors: t.errors });
        }
      });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="col-xs-4">
        <form onSubmit={this.onSubmit}>

          <h1>Generate Report</h1>

          <div className="form-group">
            <label className="control-label" htmlFor="date">Start Date</label>
            <input
              onChange={this.onChange}
              value={this.state.startDate}
              type="date"
              name="startDate"
              className="form-control"
            />
            {errors.startDate && <span className="help-block">{errors.startDate}</span>}
          </div>

          <div className="form-group">
            <label className="control-label" htmlFor="time">Start Time</label>
            <input
              onChange={this.onChange}
              value={this.state.startTime}
              type="time"
              name="startTime"
              className="form-control"
            />
            {errors.startTime && <span className="help-block">{errors.startTime}</span>}
          </div>

          <div className="form-group">
            <label className="control-label" htmlFor="date">End Date</label>
            <input
              onChange={this.onChange}
              value={this.state.endDate}
              type="date"
              name="endDate"
              className="form-control"
            />
            {errors.endDate && <span className="help-block">{errors.endDate}</span>}
          </div>

          <div className="form-group">
            <label className="control-label" htmlFor="time">End Time</label>
            <input
              onChange={this.onChange}
              value={this.state.endTime}
              type="time"
              name="endTime"
              className="form-control"
            />
            {errors.endTime && <span className="help-block">{errors.endTime}</span>}
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-lg">
              Generate
            </button>
          </div>

        </form>
      </div>
    );
  }
}

GenerateReport.propTypes = {
  toggleOption: React.PropTypes.func.isRequired,
};

export default GenerateReport;
