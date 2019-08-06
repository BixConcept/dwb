import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { withCookies } from "react-cookie";

// actions
import { getAssignments, deleteAssignment } from "../../actions/assignments";
import { getUser } from "../../actions/auth";

// css
import "./Dashboard.css";

// components
import CreateAssignmentForm from "./CreateAssignmentForm";
import Team from "./Team";

import Chart from "./Chart";
import AuthorChart from "./AuthorChart";
import Alert from "../Alert";

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
  if (props.assignments.length > 0) {
    return (
      <div className={props.classIdentifier}>
        <h3>{props.title}</h3>
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
    return null;
  }
}

class Dashboard extends Component {
  static propTypes = {
    assignments: PropTypes.array.isRequired,
    getAssignments: PropTypes.func.isRequired,
    deleteAssignment: PropTypes.func.isRequired
  };

  state = {
    assignmentGroups: [],
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
    // this.state.outstandingAssiggnments = 0;
    this.setState({
      outstandingAssiggnments: 0,
      errors: newProps.errors
    });
    console.log(`props: ${newProps}`);

    if (newProps.isAuthenticated === false) {
      this.props.history.push("/login/");
      return;
    }



    var groups = [];

    //console.log(newProps.assignments);

    for (let assignment of newProps.assignments) {
      //console.log(assignment);
      let date = Date.parse(new Date(assignment.due_date));
      let now = Date.now();

      //console.log(date, now);

      if (date < now - 1000 * 60 * 60 * 24) continue;

      // this.state.outstandingAssiggnments += 1;
      this.setState({
        outstandingAssiggnments: this.state.outstandingAssiggnments + 1
      });

      //console.log(`groups: ${groups}`);
      //groups.forEach(x => console.log(`x: ${x}`));

      let groupid = groups.findIndex(x => x.date === date);
      //console.log(`group id: ${groupid}`);
      if (groupid === -1) {
        groups.push({ date, assignments: [assignment] });
      } else groups[groupid].assignments.push(assignment);
    }

    //console.log(groups);

    let i = 0;
    for (let group of groups) {
      // if date is today title = "today"
      if (this.dateIsEqual(group.date, Date.now())) {
        groups[i].title = "today";
        groups[i].classIdentifier = "wrapper-today";
      }
      // if date is tomorrow title = "tomorrow"
      else if (this.dateIsEqual(group.date, Date.now() + 1000 * 60 * 60 * 24)) {
        groups[i].title = "tomorrow";
        groups[i].classIdentifier = "wrapper-tomorrow";
      }
      // if date is something else
      else {
        //console.log(group);
        let date = new Date(parseInt(group.date));
        //console.log(date);
        groups[i].title = `${date.getDate()}.${date.getMonth() +
          1}.${date.getFullYear()}`;
        groups[i].classIdentifier = "wrapper-future";
      }
      i++;
    }

    this.setState({
      assignmentGroups: groups.sort((a, b) => {
        return a.date - b.date;
      })
    });
  }

  componentDidUpdate() {
    //console.log(this.state);
  }

  componentDidMount() {
    this.props.getAssignments();
    this.props.getUser();
  }

  render() {
    return (
      <div>
        <h1 className="dashboardHeadline">dashboard</h1>
        <div className="dashboard">
          <Errors errors={Object.values(this.state.errors)} />
          <h2 className="greeting">
            hi, <u>{this.props.user.username}</u>!
          </h2>
          <div className="container">
            <h3 className="container-headline">
              assignments due: &nbsp;
              <span>{this.state.outstandingAssiggnments}</span>
            </h3>
            <div className="wrapper">
              {Object.values(this.state.assignmentGroups).map(group => {
                return (
                  <AssignmentGroup
                    key={group.date}
                    assignments={group.assignments}
                    title={group.title}
                    classIdentifier={group.classIdentifier}
                  />
                );
              })}
            </div>
          </div>
          <div className="row">
            <div className="container assignment-form">
              <CreateAssignmentForm />
            </div>
            <div className="container team">
              <Team />
            </div>
          </div>
          {/*
        <Chart assignments={this.props.assignments} />
        <AuthorChart assignments={this.props.assignments} />
        */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  assignments: state.assignments.assignments,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,

  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    getAssignments,
    deleteAssignment,
    getUser
  }
)(withCookies(Dashboard));
