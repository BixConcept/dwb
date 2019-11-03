import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { withTranslation, useTranslation } from "react-i18next";

import { getTeam, addUserToTeam, createTeam } from "../../actions/teams";

import css from "../../styles/dashboard/home/team.module.scss";

const colors = ["#8e44ad", "#3498db", "#e67e22", "#95a5a6"].reverse();
const getColor = permission => {
  console.log(permission);
  return colors[permission];
};

class SetTeamMessageTF extends Component {
  handleChange(e) {
    this.setState({ form: { [e.target.id]: e.target.value } });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.setTeamMessage(this.state.form.username);
  }

  render() {
    const { t } = this.props;
    if (this.props.permission < 1) return null;
    return (
      <div className={css.addUserForm}>
        <form onSubmit={this.handleSubmit}>
          <input
            style={{ WebkitAppearance: "none" }}
            type="text"
            id="username"
            value={this.props.message}
            onChange={this.handleChange}
          />
          <input
            style={{ WebkitAppearance: "none" }}
            type="submit"
            value={t("dashboard.home.team.message.form.submit")}
          />
        </form>
      </div>
    );
  }
}

class AddMemberTF extends Component {
  handleChange(e) {
    this.setState({ form: { [e.target.id]: e.target.value } });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addUserToTeam(this.state.form.username);
  }

  render() {
    const { t } = this.props;
    if (this.props.permission < 1) return null;
    return (
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
    );
  }
}

const TeamMemberList = props => {
  if (props.members === undefined) {
    return null;
  }
  return (
    <ul className={css.teamMembers}>
      {props.members
        .sort((a, b) => {
          if (a.username.toLowerCase() > b.username.toLowerCase()) {
            return 1;
          } else if (a.username.toLowerCase() < b.username.toLowerCase()) {
            return -1;
          }
          return 0;
        })
        .map(member => {
          return (
            <TeamMember name={member.username} permission={member.permission} />
          );
        })}
    </ul>
  );
};

const TeamMember = props => {
  return (
    <li className={css.teamMember}>
      <div style={{ backgroundColor: getColor(props.permission) }}>
        {props.name[0].toUpperCase()}
      </div>
      <p>
        {props.name}{" "}
        <span style={{ display: props.permission < 1 ? "none" : "inline" }}>
          {["", "moderator*in", "team owner", "admin"][props.permission]}
        </span>
      </p>
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

    this.createTeamChange = this.createTeamChange.bind(this);
    this.createTeamSubmit = this.createTeamSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getTeam();
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
    if (!this.props.user.team_member) {
      return (
        <div className={css.TeamText}>
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
            <AddMemberTF
              t={t}
              addUserToTeam={this.props.addUserToTeam}
              permission={this.props.user.permission}
            />
            <SetTeamMessageTF
              t={t}
              permission={this.props.user.permisison}
              message={this.props.team.team.message}
              setTeamMessage={this.props.setTeamMessage}
            />
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
  user: state.auth.user
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
