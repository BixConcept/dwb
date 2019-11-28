import React, { Component } from "react";
import { connect } from "react-redux";

import { getAllUsers, getAllAssignments, getAllTeams } from "../../../actions/admin";

const getCount = count => {
  if (count === undefined) return "NaN";
  return count.length;
};

class Stats extends Component {
  componentDidMount() {
    this.props.getAllUsers();
    this.props.getAllAssignments();
    this.props.getAllTeams()
  }

  render() {
    return (
      <div>
        <h2>stats</h2>
        <p>
          there are currently {getCount(this.props.users)} users registered.
        </p>
        <p>
          there are currently {getCount(this.props.teams)} teams registered.
        </p>
        <p>
          there are currently {getCount(this.props.assignments)} assignments
          created.
        </p>
      </div>
    );
  }
}

const mapStateToPtops = state => ({
  users: state.admin.allUsers,
  assignments: state.admin.allAssignments,
  teams: state.admin.allTeams
});

export default connect(mapStateToPtops, { getAllUsers, getAllAssignments, getAllTeams })(
  Stats
);
