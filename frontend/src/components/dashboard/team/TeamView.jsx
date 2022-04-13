import React, { Fragment } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { connect } from "react-redux";

import { getTeam } from "actions/teams";

import css from "styles/dashboard/team/team.module.scss";

function getColor(permission) {
  // grey, yellow, red, blue,
  const colors = ["#95a5a6", "#f1c40f", "#e74c3c", "#3498db"];

  if (isNaN(permission)) {
    return colors[0];
  }

  return colors[permission];
}

function getPermissionName(permission) {
  const permissions = ["user", "moderator", "teamOwner", "administrator"];
  return "permission." + permissions[permission];
}

function Member(props) {
  const { t } = useTranslation();
  if (props.member === undefined) return null;

  return (
    <div className={css.member} key={props.member.id}>
      <div
        className={css.header}
        style={{ backgroundColor: getColor(props.member.permission) }}
      >
        <h2>{props.member.username}</h2>
      </div>
      <div className={css.body}>
        <p>permission: {t(getPermissionName(props.member.permission))}</p>
      </div>
    </div>
  );
}

function TeamMembers(props) {
  if (!props.members) {
    return null;
  }

  return (
    <div className={css.memberContainer}>
      {props.members.map(member => (
        <Member member={member} />
      ))}
    </div>
  );
}

class TeamView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      team: {}
    };
  }

  componentDidMount() {
    this.props.getTeam();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return { team: nextProps.team };
  }

  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <h1 className="m-heading">{t("dashboard.team.title")}</h1>
        <div className={css.body}>
          {this.props.team.members !== undefined ? (
            <TeamMembers
              members={this.props.team.members.sort((a, b) =>
                ("" + a.username).localeCompare(b.username)
              )}
            />
          ) : null}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  team: state.teams.team
});

export default withTranslation()(
  connect(
    mapStateToProps,
    { getTeam }
  )(TeamView)
);
