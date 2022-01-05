import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withCookies } from "react-cookie";

// actions
import { getAssignments, deleteAssignment } from "../../actions/assignments";
import { getUser } from "../../actions/auth";

// css
import css from "../../styles/dashboard/dashboard.module.scss";

import {  Outlet, Link } from "react-router-dom";
import { Trans, withTranslation } from "react-i18next";

class Dashboard extends Component {
  static propTypes = {
    assignments: PropTypes.array.isRequired,
    getAssignments: PropTypes.func.isRequired,
    deleteAssignment: PropTypes.func.isRequired
  };

  state = {
    assignmentGroups: [{}, {}, {}],
    countColor: [],
    outstandingAssiggnments: 0,
    errors: []
  };

  componentWillReceiveProps(newProps) {
    this.setState({
      outstandingAssignments: 0,
      errors: newProps.errors
    });
    if (newProps.isAuthenticated === false) {
      this.props.history.push("/login/");
      return;
    }
  }

  componentDidMount() {
    this.props.getAssignments();
    this.props.getUser();
  }

  render() {
    const { t } = this.props;
    return (
      <div className={css.dashboard}>
        <aside>
          <h1>
            {this.props.user.username !== undefined ? (
              <Trans i18nKey="dashboard.nav.greeting">
                <span className="text-primary">
                  {{ name: this.props.user.username }}
                </span>
                !
              </Trans>
            ) : null}
          </h1>
          <ul>
            <li>
              <Link className={css.link} to="/dashboard">
                {t("dashboard.nav.dashboard")}
              </Link>
            </li>
            <li>
              <Link className={css.link} to="/dashboard/assignments">
                {t("dashboard.nav.assignments")}
              </Link>
            </li>
            <li>
              <Link className={css.link} to="/dashboard/team">
                {t("dashboard.nav.team")}
              </Link>
            </li>
          </ul>
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  assignments: state.assignments.assignments,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,

  errors: state.errors.errors
});

export default withTranslation()(
  connect(mapStateToProps, {
    getAssignments,
    deleteAssignment,
    getUser
  })(withCookies(Dashboard))
);
