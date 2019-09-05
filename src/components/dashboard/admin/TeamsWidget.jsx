import React, { Component } from "react";
import { connect } from "react-redux";

import { getTeams } from "../../../actions/teams";

class TeamsWidget extends Component {
  constructor(props) {
    this.state = {
      teamsAmount: 0
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.teams != undefined) {
      return { teamsAmount: nextProps.teams.length };
    }
  }

  componentDidMount() {
    this.props.getTeams();
  }

  render() {
    return (
      <div>
        <h1>teams</h1>
        <p>currently there are {this.state.teamsAmount} teams</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  teams: state.teams.teams
});

export default connect(
  mapStateToProps,
  { getTeams }
)(TeamsWidget);
