import React, { Component } from "react";
import { connect } from "react-redux";
import { createAssignment } from "../../actions/assignments";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import css from "../../styles/dashboard/home/createAssignmentForm.module.scss";
import { getSubjects, getIDFromSelected } from "./subjectName";

export class CreateAssignmentForm extends Component {
  subjects = [];
  options = {};

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
    if (e.target.type === "file") {
      this.setState({
        file: e.target.files[0]
      })
      return
    }

    this.setState({
      assignment: {...this.state.assignment, [e.target.id]: e.target.value }
    });

    console.log(this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
    // console.log(this.state);
    this.setState.due_date = Date.parse(this.state.due_date);

    this.props.createAssignment({
      ...this.state,
      assignment: {
        ...this.state.assignment,
        author_name: this.props.username,
        subject: getIDFromSelected(this.options, this.state.subject)
      },
    });
  }

  componentDidMount() {
    const { t } = this.props;

    this.subjects = getSubjects();
    console.log(this.subjects);
    for (let i = 0; i < Object.values(this.subjects).length; i++) {
      this.options[Object.keys(this.subjects)[i]] = t(
        "subjects." + Object.values(this.subjects)[i]
      );
    }

  }

  render() {
    const { t } = this.props;
    return (
      <div className={css.assignmentForm}>
        <form onSubmit={this.handleSubmit}>
          <select
            style={{ WebkitAppearance: "none" }}
            onChange={this.handleChange}
            id="subject"
            required
            defaultValue={""}
            className={css.input}
          >
            <option value="" style={{ WebkitAppearance: "none" }} disabled>
              {t("dashboard.home.createAssignment.form.subject")}
            </option>
            {Object.values(this.options).sort().map(subject => (
              <option key={subject}>{subject}</option>
            ))}
          </select>
          <input
            style={{ WebkitAppearance: "none" }}
            placeholder="text"
            id="text"
            onChange={this.handleChange}
            autoComplete="off"
            className={css.input}
            required
          />
          <input
            type="date"
            style={{ WebkitAppearance: "none" }}
            placeholder="due date"
            id="due_date"
            onChange={this.handleChange}
            autoComplete="off"
          />
          <input type="file" name="file" id="file" onChange={this.handleChange}/>
          <input
            style={{ WebkitAppearance: "none" }}
            type="submit"
            value="send"
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.user.username
});

export default withTranslation()(
  connect(
    mapStateToProps,
    { createAssignment }
  )(CreateAssignmentForm)
);
