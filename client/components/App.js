import React from 'react';
import ToggleDisplay from 'react-toggle-display';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppNavigation from './AppNavigation';
import ExpensesComponent from '../containers/ExpensesComponent';
import ExpenseForm from '../containers/ExpenseForm';
import GenerateReport from '../containers/GenerateReport';
import ReportDisplay from '../containers/ReportDisplay';
import { removeExpense, editExpense, submitExpense } from '../modules/expense/expenseActions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      report: false,
      edit: false,
      expenses: [],
      selectedId: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.fillUpdate = this.fillUpdate.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ report: !this.state.report });
  }

  onEdit() {
    if (this.state.edit) {
      this.setState({
        edit: !this.state.edit,
        selectedId: '',
      });
    }
    this.setState({ edit: !this.state.edit });
  }

  fillUpdate(e) {
    // grab editable expense to pass to addExpense form
    // need to start mapping state to props maybe cut time?
    e.preventDefault();
    let selectedExpense = this.state.expenses;
    if (selectedExpense.length < 1) {
      selectedExpense = JSON.parse(localStorage.state).expense.expenses;
    }
    selectedExpense.forEach((expense) => {
      if (expense._id === e.target.name) {
        this.setState({ selectedId: expense });
      }
    });
    if (!this.state.edit) {
      this.onEdit();
    }
  }


  render() {
    let updateOrNew;
    if (this.state.edit) {
      updateOrNew = this.onEdit;
    } else {
      updateOrNew = false;
    }
    return (
      <div className="container" >
        <AppNavigation />
        <ToggleDisplay show={!this.state.report}>
          <ExpensesComponent
            toggleEdit={this.onEdit}
            fill={this.fillUpdate}
            expenseList={this.props.expense.expenses}
          />
          <ExpenseForm
            selected={this.state.selectedId}
            eActions={this.props.expenseActions}
            edit={updateOrNew}
          />
          <GenerateReport toggleOption={this.onSubmit} />
        </ToggleDisplay>
        <ToggleDisplay show={this.state.report}>
          <ReportDisplay toggleOption={this.onSubmit} />
        </ToggleDisplay>
      </div>
    );
  }
}

App.propTypes = {
  expenseActions: React.PropTypes.any, // eslint-disable-line react/forbid-prop-types
  expense: React.PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  expense: state.expense,
});

const mapDispatchToProps = dispatch => ({
  expenseActions: bindActionCreators({
    removeExpense,
    editExpense,
    submitExpense,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
