import React from 'react';

class ExpensesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 500);
  }
  render() {
    const owner = JSON.parse(localStorage.state).auth._id;
    let expenses = [];
    if (this.props.expenseList.length < 1) {
      expenses = JSON.parse(localStorage.state).expense.expenses || [];
    } else {
      expenses = this.props.expenseList || [];
    }
    let display;
    if (expenses.length < 1) {
      display = (<li className="list-group-item disabled">
        <p>No Information</p>
      </li>);
    } else {
      display = expenses.map((expense) => {
        let type = 'list-group-item disabled';
        let editable = <p> cannot edit</p>;
        if (owner === expense.owner) {
          type = 'list-group-item';
          editable = <button name={expense._id} onClick={this.props.fill}>edit</button>;
        }
        return (<li className={type} >
          <p>Amount: {expense.amount}</p>
          <p>Details: {expense.description}</p>
          <p>Date: {expense.date}</p>
          <p>Time: {expense.time}</p>
          <a>Owned by: </a>
          <a>{expense.username}</a>
          {editable}
        </li>
        );
      });
    }
    if (this.state.loading) {
      return (<div className="col-xs-8 list-group">
        LOADING
      </div>
      );
    }
    return (
      <div className="col-xs-8 list-group">
        {display}
      </div>
    );
  }
}

ExpensesComponent.propTypes = {
  expenseList: React.PropTypes,
  fill: React.PropTypes.func.isRequired,
};

export default ExpensesComponent;
