import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { getAssignments, deleteAssignment } from "../../actions/assignments";

import { withTranslation, useTranslation } from "react-i18next";

import css from "../../styles/dashboard/assignments/assignmentsView.module.scss";

function Assignment(props) {
  const { t } = useTranslation();
  if (props.item === undefined) return null;

  return (
    <div className="assignment">
      <div className="assignmentHeader">
        <h1>{props.item.subject}</h1>
      </div>
      <div className="assignmentContent">
        <p>{t("date", { date: new Date(props.item.due_date) })}</p>
        <p>{props.item.text}</p>
        <p>
          {t("dashboard.assignments.authorText", {
            date: t("date", { date: props.item.due_date }),
            author: props.item.author_name
          })}
        </p>
        <p>{props.item.text}</p>
      </div>
    </div>
  );
}

class AssignmentsView extends Component {
  componentDidMount() {
    this.props.getAssignments();
  }

  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <h1 className="m-heading">{t("dashboard.assignments.title")}</h1>
        <div className="assignments-container">
          {this.props.assignments &&
            this.props.assignments.map(item => (
              <Assignment
                item={item}
                deleteAssignment={this.props.deleteAssignment}
              />
            ))}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  assignments: state.assignments.assignments
});

export default withTranslation()(
  connect(
    mapStateToProps,
    { getAssignments, deleteAssignment }
  )(AssignmentsView)
);
