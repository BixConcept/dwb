import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAssignments, deleteAssignment } from "../../actions/assignments";

import CreateAssignmentForm from "./CreateAssignmentForm";
import "./Dashboard.css";
import "../../actions/auth";

import Chart from "./Chart";
import AuthorChart from "./AuthorChart";

function AssignmentGroup(props) {
  if (props.assignments.length > 0) {
    return (
      <div className={props.className}>
        <h3>{props.title}</h3>
        {props.assignments.map(item => (
          <ul>
            <li>
              <div className="white">
                <b>{item.subject}</b>
                <p>{item.text}</p>
              </div>
            </li>
          </ul>
        ))}
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
    outstandingAssiggnments: 0
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
    if (!newProps.isAuthenticated) {
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

      this.state.outstandingAssiggnments++;

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
      if (this.dateIsEqual(group.date, Date.now())) groups[i].title = "today";
      // if date is tomorrow title = "tomorrow"
      else if (this.dateIsEqual(group.date, Date.now() + 1000 * 60 * 60 * 24))
        groups[i].title = "tomorrow";
      // if date is something else
      else {
        console.log(group)

        let date = new Date(parseInt(group.date));
        console.log(date);
        groups[i].title = `${date.getDate()}.${date.getMonth() +
          1}.${date.getFullYear()}`;
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
    console.log(this.state);
  }

  componentDidMount() {
    this.props.getAssignments();
  }

  render() {
    return (
      <div>
        <h1 className="dashboardHeadline">dashboard</h1>
        <div className="dashboard">
          <h6>Hi, here is your current homework!</h6>
          <h5>
            Outstanding assignments: &nbsp;
            <span className="countAssignments">
              {this.state.outstandingAssiggnments}
            </span>
          </h5>
          <div className="wrapper">
            {Object.values(this.state.assignmentGroups).map(group => {
              return (
                <AssignmentGroup
                  assignments={group.assignments}
                  title={group.title}
                />
              );
            })}
            <CreateAssignmentForm className="CreateAssignment" />
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
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  {
    getAssignments,
    deleteAssignment
  }
)(Dashboard);
