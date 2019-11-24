import React, { Component } from "react";
import { connect } from "react-redux";

import { getAllUsers } from "../../../actions/admin";

class Stats extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
    return (
      <div>
        <h2>stats</h2>
        <p>there are currently {this.props.users.length} users registered.</p>
        <p>there are {this.props.assignments.length} assignments</p>
      </div>
    );
  }
}

const mapStateToPtops = state => ({
  users: state.admin.allUsers
});

export default connect(
  mapStateToPtops,
  { getAllUsers }
)(Stats);
