import React, { Component } from "react";
import { connect } from "react-redux";
import { createAssignment } from "../../actions/assignments";
import PropTypes from "prop-types";

import "./CreateAssignment.css";

const subjects = [
  "deutsch",
  "erdkunde",
  "geschichte",
  "politik",
  "mathematik",
  "biologie",
  "physik",
  "chemie",
  "englisch",
  "kunst",
  "musik",
  "katholische Religion",
  "evangelische Religion",
  "philosophie",
  "sport"
].sort();

export class CreateAssignmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    createAssignment: PropTypes.func.isRequired
  };

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });

    console.log(this.state);
  }

  handleSubmit(e) {
    e.preventDefault();

    // this.state.due_date = Date.parse(this.state.due_date);
    this.setState({
      due_date: Date.parse(this.state.due_date)
    });
    console.log(this.state);

    this.props.createAssignment(this.state);
  }

  render() {
    return (
      <div className="assignmentForm">
        <form onSubmit={this.handleSubmit}>
          <select
            onChange={this.handleChange}
            id="subject"
            required
            defaultValue={""}
          >
            <option value="" disabled>
              select your subject
            </option>
            {subjects.map(subject => (
              <option key={subject}>{subject}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="text"
            id="text"
            onChange={this.handleChange}
            autoComplete="off"
            required
          />
          <input
            type="date"
            placeholder="due date"
            id="due_date"
            onChange={this.handleChange}
            autoComplete="off"
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { createAssignment }
)(CreateAssignmentForm);
