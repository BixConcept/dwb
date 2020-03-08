import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { withTranslation } from "react-i18next";

import {
  getTeam,
  addUserToTeam,
  createTeam,
  setTeamMessage
} from "../../actions/teams";

import css from "../../styles/dashboard/home/team.module.scss";

const colors = ["#8e44ad", "#3498db", "#e67e22", "#95a5a6"].reverse();
const getColor = permission => {
  console.log(permission);
  return colors[permission];
};

class SetTeamMessageTF extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ form: { [e.target.id]: e.target.value } });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.setTeamMessage(this.state.form);
    console.log(this.props)
  }

  render() {
    const { t } = this.props;
    if (this.props.permission < 1) return null;
    return (
      <div className={css.setTeamMessageForm}>
        <form onSubmit={this.handleSubmit} className={css.form}>
          <input
            style={{ WebkitAppearance: "none" }}
            type="text"
            id="message"
            placeholder={this.props.message}
            onChange={this.handleChange}
          />
          <input
            style={{ WebkitAppearance: "none" }}
            type="submit"
            value={t("dashboard.home.team.message.form.submit")}
            disabled={
              this.state === null ||
              this.state.form.message === undefined ||
              this.state.form.message.trim() === ""
            }
          />
        </form>
      </div>
    );
  }
}

class AddMemberTF extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
        <form onSubmit={this.handleSubmit} className={css.form}>
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
            disabled={
              this.state === null ||
              this.state.form.username === undefined ||
              this.state.form.username.trim() === ""
            }
          />
        </form>
      </div>
    );
  }
}

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
  createTeam,
  setTeamMessage
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(TeamWidget)
);
