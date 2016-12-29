import React from 'react';
import { connect } from 'react-redux';


class ReportDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      default: 'empty',
    };
  }

  render() {
    let totalAmount = 0;
    let display = 'no expenses';
    if (this.props.expense.reportExpenses) {
      display = this.props.expense.reportExpenses.map((expense) => {
        totalAmount += Number(expense.amount);
        return (<li key={expense._id} className="list-group-item disabled" >
          <p>Amount: {expense.amount}</p>
          <p>Details: {expense.description}</p>
          <p>Date: {expense.date}</p>
          <p>Time: {expense.time}</p>
          <a>Owned by: </a>
          <a>{expense.username}</a>
        </li>
        );
      });
    }
    const totalDays = (this.props.expense.end - this.props.expense.start) / (3600000 * 24);
    const totalWeeks = totalDays / 7;
    const weekly = totalAmount / totalWeeks;
    const daily = totalAmount / totalDays;
    const yearly = weekly * 52;
    const startDate = new Date(this.props.expense.start).toString();
    const endDate = new Date(this.props.expense.end).toString();
    return (
      <div>
        <div className="col-xs-6">
          <h1>Report Details</h1>
          <p>Start date: {startDate}</p>
          <p>End date: {endDate}</p>
          <p>Number of Expenses: {this.props.expense.reportExpenses.length || 0}</p>
          <p>Total spent: ${totalAmount}</p>
          <p>Per Day: ${daily.toFixed(2)}</p>
          <p>Per Week: ${weekly.toFixed(2)}</p>
          <p>Per Year: ${yearly.toFixed(2)}</p>
        </div>
        <div className="col-xs-6">
          <h1>Report Expenses</h1>
          {display}
          <button onClick={this.props.toggleOption}>Return</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  expense: state.expense,
});

ReportDisplay.propTypes = {
  toggleOption: React.PropTypes.func.isRequired,
  expense: React.PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

export default connect(mapStateToProps, {})(ReportDisplay);
