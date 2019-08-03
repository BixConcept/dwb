import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getTeam, addUserToTeam, createTeam } from "../../actions/teams";

import './Dashboard.css'

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

 

  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: ""
      },
      createTeamForm: {
        name: ""
      }
    };
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  
  this.createTeamChange = this.createTeamChange.bind(this);
  this.createTeamSubmit = this.createTeamSubmit.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.team)
  }

  componentDidMount() {
    if (!this.props.isTeamMember) return
    this.props.getTeam();
  }

  handleChange(e) {
    this.setState({ form: { [e.target.id]: e.target.value } });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addUserToTeam(this.state.form.username);
  }

  createTeamChange(e) {
    this.setState({
      createTeamForm: {
        [e.target.id]: e.target.value
      }
    });
  }

  createTeamSubmit(e) {
    e.preventDefault();
    this.props.createTeam(this.state.createTeamForm.name);
  }

  render() {
    if (!this.props.isTeamMember) {
      return (
        <div className="TeamText">
          <h3 className="container-headline">you are not part of a team.</h3>
          <p>
            loneliness is unhealthy. join a team or create one yourself (つ ͡° ͜ʖ
            ͡°)つ
          </p>
          <div>
            <form onSubmit={this.createTeamSubmit}>
              <input
                placeholder="enter a name for your team"
                id="name"
                onChange={this.createTeamChange}
              />
              <input type="submit" />
            </form>
          </div>
        </div>
      );
    }
    if (this.props.team.team !== undefined) {
      return (
        <div>
          <h3 className="container-headline">
            team -
            <span style={{ color: "black" }}>
              {this.props.team.team.name} by user #{this.props.team.team.owner}
            </span>
          </h3>
          <div className="team-members">
            <TeamMemberList members={this.props.team.members} />
          </div>
          <div className="add-user-form">
            <form onSubmit={this.handleSubmit}>
              <input id="username" onChange={this.handleChange} />
              <input type="submit" />
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h3 className="container-headline">loading...</h3>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  team: state.teams.team,
  isTeamMember: state.auth.user.team_member
});

const mapDispatchToProps = {
  getTeam,
  addUserToTeam,
  createTeam
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Team);
