import React, { Component } from "react";
import { connect } from "react-redux";
import { createAssignment } from "../../actions/assignments";
import PropTypes from "prop-types";

import css from "../../styles/createAssignmentForm.module.scss";

const subjects = [
  // normal
  "deutsch 🇩🇪",
  "erdkunde 🗺",
  "geschichte 🏛️",
  "politik 🌍",
  "mathematik ➗",
  "biologie 🧬",
  "physik ⚛️",
  "chemie 🧪",
  "englisch 🇺🇸",
  "kunst 🎨󠁧󠁢󠁥",
  "musik 🎹",
  "katholische religion ✝️",
  "evangelische religion ✝️",
  "philosophie 🗿",
  "sport 🏃‍",

  // diff
  "informatik 👾",
  "culture studies 🇬🇧",
  "spanisch 🇪🇸",
  "ökologie 🌳",

  "sonstiges 🍌"
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
      due_date: new Date()
    });

    this.props.createAssignment({...this.state, author_name: this.props.username});
  }

  render() {
    return (
      <div className={css.assignmentForm}>
        <form onSubmit={this.handleSubmit}>
          <select
            onChange={this.handleChange}
            id="subject"
            required
            defaultValue={""}
            className={css.input}
          >
            <option value="" disabled>
              select your subject
            </option>
            {subjects.map(subject => (
              <option key={subject}>{subject}</option>
            ))}
          </select>
          <input
            placeholder="&nbsp;text"
            id="text"
            onChange={this.handleChange}
            autoComplete="off"
            className={css.input}
            required
          />
          <input
            type="date"
            placeholder="due date"
            id="due_date"
            onChange={this.handleChange}
            autoComplete="off"
          />
          <input type="submit" value="send" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.user.username
})

export default connect(
  mapStateToProps,
  { createAssignment }
)(CreateAssignmentForm);
