import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withCookies } from "react-cookie";

// actions
import { getAssignments, deleteAssignment } from "../../actions/assignments";
import { getUser } from "../../actions/auth";

// css
import css from "../../styles/dashboard/dashboard.module.scss";

import { Route, Switch, Link } from "react-router-dom";
import { Trans, withTranslation, useTranslation } from "react-i18next";

// Views
import Home from "./Home.jsx";
import AssignmentsView from "./AssignmentsView.jsx";
import TeamView from "./TeamView.jsx";

import AdminHome from "./admin/Home";

const AdminLinks = props => {
  const { t } = useTranslation();
  if (props.permission < 3) return null;

  return (
    <ul>
      <li>
        <Link className={css.link} to="/dashboard/admin">
          {t("dashboard.nav.adminDashboard")}
        </Link>
      </li>
    </ul>
  );
};

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
    if (t)
      return (
        <div className={css.dashboard}>
          <aside>
            <h1>
              <Trans i18nKey="dashboard.nav.greeting">
                <span className="text-primary">
                  {{ name: this.props.user.username }}
                </span>
              </Trans>
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
            </ul>
            <AdminLinks permission={this.props.user.permission} />
          </aside>
          <main>
            <Switch>
              <Route
                path={`/dashboard/assignments`}
                component={AssignmentsView}
              />
              <Route path={`/dashboard/team`} component={TeamView} />
              <Route path={`/dashboard/admin`} component={AdminHome} />
              <Route component={Home} />
            </Switch>
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
  connect(
    mapStateToProps,
    {
      getAssignments,
      deleteAssignment,
      getUser
    }
  )(withCookies(Dashboard))
);
