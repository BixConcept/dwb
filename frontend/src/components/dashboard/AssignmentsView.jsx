import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { getAssignments, deleteAssignment } from "../../actions/assignments";
import { getUser } from "../../actions/auth";

import { withTranslation, useTranslation } from "react-i18next";

import css from "../../styles/dashboard/assignments/assignmentsView.module.scss";

import { getName } from "./subjectName";

// red, yellow, green, grey, blue
const colors = ["#e74c3c", "#f1c40f", "#2ecc71", "#95a5a6", "#3498db"];

function dateIsEqual(a, b) {
  a = new Date(a);
  b = new Date(b);

  return (
    a.getYear() === b.getYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getDate(a) {
  return new Date(a.getFullYear(), a.getMonth(), a.getDate());
}

function getColor(a) {
  const day = 1000 * 60 * 60 * 24;
  const now = getDate(new Date());

  a = Date.parse(getDate(new Date(a)));

  if (dateIsEqual(a, Date.parse(now))) return colors[0];
  if (dateIsEqual(a, Date.parse(now + day))) return colors[1];
  if (dateIsEqual(a, Date.parse(now + day + day))) return colors[2];
  if (Date.parse(now) > a) return colors[3];
  if (Date.parse(now) < a) return colors[4];
}

function Assignment(props) {
  const { t } = useTranslation();
  if (props.assignment === undefined) return null;

  return (
    <div className={css.assignment} key={props.assignment.id}>
      <div
        className={css.header}
        style={{ backgroundColor: getColor(props.assignment.due_date) }}
      >
        <h2>{t("subjects." + getName(props.assignment.subject))}</h2>
        <button
          className="deleteBtn"
          hidden={props.hidden}
          onClick={() => {
            props.removeAssignment(props.assignment);
          }}
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
      <div className={css.body}>
        <h2>{t("date", { date: new Date(props.assignment.due_date) })}</h2>
        <p>{props.assignment.text}</p>
        <p className={css.authorTag}>
          - by {props.assignment.author_name} on{" "}
          {t("date", { date: new Date(props.assignment.created_at) })}
        </p>
      </div>
    </div>
  );
}

function AssignmentsList(props) {
  if (props.assignments === undefined) {
    return null;
  }

  return (
    <div className={css.assignmentContainer}>
      {props.assignments.map(assignment => {
        return (
          <Assignment
            assignment={assignment}
            removeButtonHidden={props.permission > 1}
            removeAssignment={props.removeAssignment}
          />
        );
      })}
    </div>
  );
}

class AssignmentsView extends Component {
  componentDidMount() {
    this.props.getAssignments();
    this.props.getUser();
  }

  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <h1 className="m-heading">{t("dashboard.assignments.title")}</h1>
        <div className={css.body}>
          <AssignmentsList
            permission={this.props.permission}
            assignments={this.props.assignments.sort((a, b) => {
              return (
                Date.parse(new Date(b.due_date)) -
                Date.parse(new Date(a.due_date))
              );
            })}
            removeAssignment={this.props.deleteAssignment}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  assignments: state.assignments.assignments,
  permission: state.auth.user.permission
});

export default withTranslation()(
  connect(
    mapStateToProps,
    { getAssignments, getUser, deleteAssignment }
  )(AssignmentsView)
);
