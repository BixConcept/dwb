import React, { Component } from "react";
import { connect } from "react-redux";

import { getAllTeams } from "../../../actions/teams";

const TeamsList = props => {
  if (props.teams === undefined) return null;
  return (
    <ul>
      {props.teams.map(team => (
        <li key={team.id}>
          {team.name} by {team.owner}
        </li>
      ))}
    </ul>
  );
};

class TeamsWidget extends Component {
  constructor(props) {
    super(props);
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
    this.props.getAllTeams();
  }

  render() {
    return (
      <div>
        <h1>teams</h1>
        <p>currently there are {this.state.teamsAmount} teams</p>
        <TeamsList teams={this.props.teams} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  teams: state.teams.teams
});

export default connect(
  mapStateToProps,
  { getAllTeams }
)(TeamsWidget);
