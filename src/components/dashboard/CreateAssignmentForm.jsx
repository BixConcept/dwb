import React, { Component } from "react";
import { connect } from "react-redux";
import { createAssignment } from "../../actions/assignments";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import css from "../../styles/dashboard/home/createAssignmentForm.module.scss";
import { getSubjects, getIDFromSelected } from "./subjectName";

export class CreateAssignmentForm extends Component {
  subjects = [];

  constructor(props) {
    super(props);
    this.state = { options: [] };

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

    //console.log(this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
    // console.log(this.state);
    this.setState.due_date = Date.parse(this.state.due_date);

    this.props.createAssignment({
      ...this.state,
      author_name: this.props.username,
      subject: getIDFromSelected(this.state.options, this.state.subject)
    });
  }
  componentDidMount() {
    console.log("update");
    const { t } = this.props;

    const subjects = getSubjects();
    console.log(subjects);

    let options = [];
    for (let i = 0; i < Object.values(subjects).length; i++) {
      options[Object.keys(subjects)[i]] = t(
        "subjects." + Object.values(subjects)[i]
      );
      //console.log(options)
    }

    this.setState({
      options
    })
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
            {Object.values(this.state.options)
              .sort()
              .map(subject => (
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
            required
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
  connect(mapStateToProps, { createAssignment })(CreateAssignmentForm)
);
