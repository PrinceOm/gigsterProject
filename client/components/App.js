import React from 'react';
import AppNavigation from './AppNavigation';
import ExpensesComponent from '../containers/ExpensesComponent';
import AddExpense from '../containers/AddExpense';
import GenerateReport from '../containers/GenerateReport';


class App extends React.Component {
  render() {
    return (
      <div className="container">
        <AppNavigation />
        <ExpensesComponent />
        <AddExpense />
        <GenerateReport />
      </div>
    );
  }
}

export default App;
