import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withCookies } from "react-cookie";

// actions
import { getAssignments, deleteAssignment } from "../../actions/assignments";
import { getUser } from "../../actions/auth";

// css
import css from "../../styles/dashboard.module.scss";

// components
import CreateAssignmentForm from "./CreateAssignmentForm";
import Team from "./Team";

import Chart from "./Chart";
import AuthorChart from "./AuthorChart";
import Alert from "../Alert";

import { Link } from "react-router-dom";

function Errors(props) {
  let actualErrors = [];
  for (let error of props.errors) {
    if (error) actualErrors.push(error);
  }

  if (actualErrors.length > 0) {
    return (
      <div className="errors">
        {actualErrors.map(error => {
          return <Alert title="error" text={error} timeout="5" />;
        })}
      </div>
    );
  } else {
    return null;
  }
}

function AssignmentGroup(props) {
  //console.log(props)
  if (props.assignments !== undefined) {
    return (
      <div className={props.classIdentifier}>
        <h3>{props.title}</h3>
        <div className={css.line}></div>
        <ul>
          {props.assignments.map(item => (
            <li key={item.text}>
              <div className="white">
                <b>{item.subject}</b>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div className={props.classIdentifier}>
        <h3>{props.title}</h3>
        <p>no assignments</p>
      </div>
    );
  }
}

function AssignmentGroups(props) {
  console.log(props);
  if (props.groups == 0) {
    return null;
  }

  console.log(props);
  return (
    <Fragment>
      <AssignmentGroup
        title="today"
        classIdentifier={css.today}
        assignments={props.groups[0].assignments}
      />
      <AssignmentGroup
        title="tomorrow"
        classIdentifier={css.tomorrow}
        assignments={props.groups[1].assignments}
      />
      <AssignmentGroup
        title="the day after tomorrow"
        classIdentifier={css.future}
        assignments={props.groups[2].assignments}
      />
    </Fragment>
  );
}

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

  dateIsEqual(date1, date2) {
    date1 = new Date(date1);
    date2 = new Date(date2);

    //console.log(date1, date2);

    return (
      date1.getYear() === date2.getYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      outstandingAssignments: 0,
      errors: newProps.errors
    });
    if (newProps.isAuthenticated === false) {
      this.props.history.push("/login/");
      return;
    }

    var groups = [{}, {}, {}];

    if (newProps.assignments == 0) return;
    console.log(newProps.assignments.length);
    console.log(newProps.assignments);

    for (let assignment of newProps.assignments) {
      console.log(assignment);
      let date = Date.parse(new Date(assignment.due_date));
      console.log(date);
      let now = Date.now();

      console.log(new Date(date));

      // continue if date is invalid
      if (date === NaN) continue;
      if (date < now - 1000 * 60 * 60 * 24) {
        // continue if date is in the past
        console.error("date is in the past");
        continue;
      }

      // continue if date is more than 3 days in the future
      if (date > now + 1000 * 60 * 60 * 24 * 3) continue;

      this.state.outstandingAssignments += 1;

      // i dont fucking know, what i did here lol
      let groupid = Math.floor((date - now) / (1000 * 60 * 60 * 24)) + 1;
      console.log(`groupid: ${groupid}`);
      if (groups[groupid].assignments == undefined) {
        groups[groupid] = { date, assignments: [assignment] };
      } else {
        groups[groupid].assignments.push(assignment);
      }
    }

    console.log(groups);

    this.setState({
      assignmentGroups: groups.sort((a, b) => {
        return a.date - b.date;
      })
    });
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
              <Link className={css.link} to="/dashboard/team">
                assignments
              </Link>
            </li>
          </ul>
        </aside>
        <div className={css.wrapper}>
          <section className={css.create}>
            <h1 className="s-heading">create assignment</h1>
            <CreateAssignmentForm />
          </section>
          <section className={css.team}>
            <h1 className="s-heading">team</h1>
            <Team />
          </section>
          {/*
          <section className={css.stats}>
            <h1 className="s-heading">stats</h1>

            <div>
              <h2 className={css.bigNumber}>2</h2>
              <h3>assignments due</h3>
            </div>
          </section> */}

          <section className={css.assignments}>
            <h1 className="s-heading">upcoming 3 days</h1>
            <div className={css.days}>
              <AssignmentGroups groups={this.state.assignmentGroups} />
            </div>
          </section>
        </div>
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
