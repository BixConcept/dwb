import React, { Component } from "react";
import { connect } from "react-redux";
import { createAssignment } from "../../actions/assignments";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import css from "../../styles/dashboard/home/createAssignmentForm.module.scss";

export class CreateAssignmentForm extends Component {
  subjects = [];
  constructor(props) {
    super(props);
    this.state = {};

    const { t } = this.props;
    this.subjects = [
      t("subjects.german"),
      t("subjects.geography"),
      t("subjects.history"),
      t("subjects.math"),
      t("subjects.politics"),
      t("subjects.biology"),
      t("subjects.physics"),
      t("subjects.chemistry"),
      t("subjects.english"),
      t("subjects.art"),
      t("subjects.music"),
      t("subjects.catholic"),
      t("subjects.protestant"),
      t("subjects.philosophy"),
      t("subjects.sports"),
      t("subjects.computerScience"),
      t("subjects.cs"),
      t("subjects.spanish"),
      t("subjects.ecology"),
      t("subjects.other"),
      t("subjects.latin"),
      t("subjects.french")
    ].sort();
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
    console.log(this.state);
    this.setState.due_date = Date.parse(this.state.due_date);

    console.log(
      document.getElementsByClassName(css.assignmentForm)[0].children[0].reset()
    );

    this.props.createAssignment({
      ...this.state,
      author_name: this.props.username
    });
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
            {this.subjects.map(subject => (
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
