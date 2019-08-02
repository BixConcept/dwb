import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getTeam } from "../../actions/teams";

const TeamMemberList = props => {
  if (props.members === undefined) {
    return null;
  }
  return (
    <ul>
      {props.members.map(member => {
        return <TeamMember name={member.username} />;
      })}
    </ul>
  );
};

const TeamMember = props => {
  return (
    <li>
      <p>{props.name}</p>
    </li>
  );
};

export class Team extends Component {
  static propTypes = {
    getTeam: PropTypes.func.isRequired,
    team: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getTeam();
  }

  render() {
    if (this.props.team.team != undefined) {
      return (
        <div>
          <h3 className="container-headline">
            team -
            <span style={{color: "black"}}>
              {this.props.team.team.name} by user #{this.props.team.team.owner}
            </span>
          </h3>
          <div className="team-members">
            <TeamMemberList members={this.props.team.members} />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h3 className="container-headline">loading..</h3>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  team: state.teams.team
});

const mapDispatchToProps = {
  getTeam
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Team);
