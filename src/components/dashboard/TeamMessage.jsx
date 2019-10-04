import React, { Component } from "react";
import { connect } from "react-redux";
import css from "../../styles/dashboard/home/teamMessageWidget.module.scss"

export class TeamMessage extends Component {
  render() {
    if (this.props.team.team !== undefined) {
      return (
        <div className={css.messageContainer}>
            {this.props.team.team.message}
        </div>
      );
    } else {
      return null
    }
  }
}

const mapStateToProps = state => ({
  team: state.teams.team
});

export default connect(mapStateToProps)(TeamMessage);
