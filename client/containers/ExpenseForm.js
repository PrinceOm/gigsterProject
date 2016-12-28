import React from 'react';
import ToggleDisplay from 'react-toggle-display';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      submitOn: true,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    this.setState({ errors: {} });
    const sanitized = { ...this.props.selected, ...this.state };
    delete sanitized.errors;
    e.preventDefault();
    // need to clear out state
    if (this.props.edit) {
      this.setState({ submitOn: false });
      this.props.eActions.editExpense(sanitized);
      this.props.edit();
    } else if (this.state.submitOn) {
      this.props.eActions.submitExpense(this.state)
      .then((t) => {
        if (t.errors) {
          this.setState({ errors: t.errors });
        }
      });
    } else {
      this.setState({ submitOn: true });
    }
  }

  onDelete() {
    this.setState({ submitOn: false });
    this.props.eActions.removeExpense(this.props.selected._id);
    this.props.edit();
  }

  render() {
    let toggleOption;
    const { errors } = this.state;
    if (!this.props.edit) {
      toggleOption = false;
    } else {
      toggleOption = true;
    }
    return (
      <div className="col-xs-4">
        <form onSubmit={this.onSubmit}>

          <h1>Input expense</h1>

          <div className="form-group" id="expenseForm">
            <label className="control-label" htmlFor="number" >Amount</label>
            <input
              onChange={this.onChange}
              value={this.state.amount || this.props.selected.amount}
              type="number"
              name="amount"
              step="0.01"
              className="form-control"
            />
            {errors.amount && <span className="help-block">{errors.amount}</span>}
          </div>

          <div className="form-group">
            <label className="control-label" htmlFor="description">Description</label>
            <input
              onChange={this.onChange}
              value={this.state.description || this.props.selected.description}
              type="text"
              name="description"
              className="form-control"
            />
            {errors.description && <span className="help-block">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label className="control-label" htmlFor="date">Date</label>
            <input
              onChange={this.onChange}
              value={this.state.date || this.props.selected.date}
              type="date"
              name="date"
              className="form-control"
            />
            {errors.date && <span className="help-block">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label className="control-label" htmlFor="time">Time</label>
            <input
              onChange={this.onChange}
              value={this.state.time || this.props.selected.time}
              type="time"
              name="time"
              className="form-control"
            />
            {errors.time && <span className="help-block">{errors.time}</span>}
          </div>
          <div className="form-group">
            <ToggleDisplay show={toggleOption}>
              <button className="btn btn-danger btn-small" onClick={this.onDelete}>
                DELETE
              </button>
            </ToggleDisplay>

            <button className="btn btn-primary btn-lg">
              Submit
            </button>
          </div>

        </form>
      </div>
    );
  }
}

ExpenseForm.propTypes = {
  eActions: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  edit: React.PropTypes.any, // eslint-disable-line react/forbid-prop-types
  selected: React.PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

export default ExpenseForm;
