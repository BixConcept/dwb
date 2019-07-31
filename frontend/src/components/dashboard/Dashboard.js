import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAssignments, deleteAssignment } from "../../actions/assignments";

import CreateAssignmentForm from "./CreateAssignmentForm";
import "./Dashboard.css";
import "../../actions/auth";

function AssignmentGroup(props) {
  if (props.assignments.length > 0) {
    return (
      <div className={props.className}>
        <h3>{props.title}</h3>
        <ul>
          {props.assignments.map(item => (
            <li key={item.id}>{item.subject}</li>
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
    assignmentGroups: [[], [], []],
    countColor: []
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

    let groups = [[], [], []];

    for (let i = 0; i < newProps.assignments.length; i++) {
      const assignment = newProps.assignments[i];
      let date = Date.parse(new Date(assignment.due_date));
      let now = Date.now();

      console.log(assignment);

      if (this.dateIsEqual(date, now)) {
        groups[0].push(assignment);
      } else if (this.dateIsEqual(date, now + 1000 * 60 * 60 * 24)) {
        groups[1].push(assignment);
      } else if (date > now) {
        groups[2].push(assignment);
      }
    }
    this.setState({
      assignmentGroups: groups
    });
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  componentDidMount() {
    this.props.getAssignments();
  }

  /*
 const colors = ["#22a6b3", "#6ab04c", "#eb4d4b", "#f0932b", "#95afc0", "#ff4444", "#eef00a", "#d600ff", "#e74c3c", "#f1c40f", "#bdc3c7", "#3498db", "#EA2027", "#FFC312", "#fed330"];
 let i = 0;
 
 setInterval(function () {
      x = document.getElementsByClassName("ente")[0];
     changeText();
 }, 102,4);
 
 function changeText() {
     if (i == colors.length) {
         i = 0;
     }
     x.style.color = colors[i];
     
     i += 1; 
 }
 */

  // <p key={item.id}>{item.subject}</p> <- get subject,
  render() {
    return (
      <div>
<<<<<<< HEAD
        <h1 className="dashboardHeadline">dashboard</h1>
        <div className="dashboard">
          <h6>Hi, here is your current homework!</h6>
          <h5>
            Outstanding assignments: &nbsp;
            <span className="countAssignments">
              {this.state.assignmentGroups[0].length +
                this.state.assignmentGroups[1].length +
                this.state.assignmentGroups[2].length}
            </span>
          </h5>
          <div className="wrapper">
            <AssignmentGroup
              title={"today"}
              className="wrapper_today"
              assignments={this.state.assignmentGroups[0]}
            />
            <AssignmentGroup
              title={"tommorow"}
              className="wrapper_tommorow"
              assignments={this.state.assignmentGroups[1]}
            />
            <AssignmentGroup
              title={"tommorow"}
              className="wrapper_future"
              assignments={this.state.assignmentGroups[2]}
            />
          </div>
        </div>
        {/*
       <Chart assignments={this.props.assignments} />
        <AuthorChart assignments={this.props.assignments} /> 
        */}
        <CreateAssignmentForm />
=======
        <CreateAssignmentForm />
        <div>
          <div>
            <h3>today</h3>
            {this.state.assignmentGroups[0].map(item => (
              <p key={item.id}>{Object.values(item)}</p>
            ))}
          </div>
          <div>
            <h3>tomorrow</h3>
            {this.state.assignmentGroups[1].map(item => (
              <p key={item.id}>{Object.values(item)}</p>
            ))}
          </div>
          <div>
            <h3>in the future</h3>
            {this.state.assignmentGroups[2].map(item => (
              <p key={item.id}>{Object.values(item)}</p>
            ))}
          </div>
        </div>
        <div className="charts">
          <Chart assignments={this.props.assignments} className="chart" />
          <AuthorChart assignments={this.props.assignments} className="chart" />
        </div>
>>>>>>> 0bb9cc03ad6e3aa0670c737dae520764ef912c93
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
