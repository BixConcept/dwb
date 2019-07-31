import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAssignments, deleteAssignment } from "../../actions/assignments";

import CreateAssignmentForm from "./CreateAssignmentForm";
import Chart from "./Chart";
import AuthorChart from "./AuthorChart";

class Dashboard extends Component {
  static propTypes = {
    assignments: PropTypes.array.isRequired,
    getAssignments: PropTypes.func.isRequired,
    deleteAssignment: PropTypes.func.isRequired
  };

  state = {
    assignmentGroups: [[], [], []]
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

  render() {
    return (
      <div>
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
