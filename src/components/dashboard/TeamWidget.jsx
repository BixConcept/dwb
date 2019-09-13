import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { withTranslation } from "react-i18next";

import { getTeam, addUserToTeam, createTeam } from "../../actions/teams";

import css from "../../styles/dashboard/home/team.module.scss";

const TeamMemberList = props => {
  if (props.members === undefined) {
    return null;
  }
  return (
    <ul className={css.teamMembers}>
      {props.members.map(member => {
        return <TeamMember name={member.username} />;
      })}
    </ul>
  );
};

const TeamMember = props => {
  return (
    <li className={css.teamMember}>
      <div>{props.name[0].toUpperCase()}</div>
      <p>{props.name}</p>
    </li>
  );
};

export class TeamWidget extends Component {
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

  componentDidMount() {
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
    this.props.getTeam();
  }

  render() {
    const { t } = this.props;
    if (!this.props.isTeamMember) {
      return (
        <div className={css.TeamText}>
          <h3></h3>
          <p>{t("dashboard.home.team.create.text")}</p>
          <div className={css.teamForm}>
            <form onSubmit={this.createTeamSubmit}>
              <input
                style={{ WebkitAppearance: "none" }}
                placeholder={t("dashboard.home.team.create.input")}
                id="name"
                onChange={this.createTeamChange}
              />
              <input
                style={{ WebkitAppearance: "none" }}
                type="submit"
                value={t("dashboard.home.team.create.submit")}
              />
            </form>
          </div>
        </div>
      );
    }
    if (this.props.team.team !== undefined) {
      return (
        <div>
          <div>
            <h2 className="xs-heading">{t("dashboard.home.team.subtitle")}</h2>
            <TeamMemberList members={this.props.team.members} />
          </div>
          <div className={css.addUserForm}>
            <form onSubmit={this.handleSubmit}>
              <input
                style={{ WebkitAppearance: "none" }}
                type="text"
                id="username"
                placeholder={t("dashboard.home.team.members.form.input")}
                onChange={this.handleChange}
              />
              <input
                style={{ WebkitAppearance: "none" }}
                type="submit"
                value={t("dashboard.home.team.members.form.submit")}
              />
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

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TeamWidget)
);
