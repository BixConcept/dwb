import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withCookies} from "react-cookie";

// actions
import {getAssignments, deleteAssignment} from "../../actions/assignments";
import {getUser} from "../../actions/auth";

// css
import css from "../../styles/dashboard/dashboard.module.scss";


import {Route, Switch, Link} from "react-router-dom";

// Views
import Home from "./Home.jsx";
import AssignmentsView from "./AssignmentsView.jsx";
import TeamView from "./TeamView.jsx";


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
    return (
      <div className={css.dashboard}>
        <aside>
          <h1>
            Hello,{" "}
            <span className="text-primary">{this.props.user.username}</span>!
          </h1>
          <ul>
            <li>
              <Link className={css.link} to="/dashboard">
                dashboard
              </Link>
            </li>
            <li>
              <Link className={css.link} to="/dashboard/team">
                team
              </Link>
            </li>
            <li>
              <Link className={css.link} to="/dashboard/assignments">
                assignments
              </Link>
            </li>
          </ul>
        </aside>
        <main>
            <Switch>
              <Route path={`/dashboard/assignments`} component={AssignmentsView}/>
              <Route path={`/dashboard/team`} component={TeamView}/>
              <Route component={Home}/>
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

export default connect(
  mapStateToProps,
  {
    getAssignments,
    deleteAssignment,
    getUser
  }
)(withCookies(Dashboard));
