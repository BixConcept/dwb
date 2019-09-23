import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { getAssignments } from "../../actions/assignments";

import { withTranslation, useTranslation } from "react-i18next";

import css from "../../styles/dashboard/assignments/assignmentsView.module.scss";

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
  if (props.item === undefined) return null;

  return (
    <tr key={props.item.id}>
      <td>{props.item.subject}</td>
      <td>{props.item.text}</td>
      <td>{t("date", { date: new Date(props.item.due_date) })}</td>
      <td>{props.item.author_name}</td>
    </tr>
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
        <table className={css.table}>
          <thead>
            <tr>
              <th>{t("dashboard.assignments.table.subject")}</th>
              <th>{t("dashboard.assignments.table.text")}</th>
              <th>{t("dashboard.assignments.table.dueDate")}</th>
              <th>{t("dashboard.assignments.table.author")}</th>
            </tr>
          </thead>
          <tbody>
            {this.props.assignments
              .sort((a, b) => {
                return Date.parse(b.due_date) - Date.parse(a.due_date);
              })
              .map(x => {
                return <Assignment item={x} />;
              })}
          </tbody>
        </table>
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
    { getAssignments }
  )(AssignmentsView)
);
