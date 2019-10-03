import React, { Component } from "react";
import { connect } from "react-redux";

export class TeamMessage extends Component {
  render() {
    return (
      <div>
        message:{" "}
        {this.props.team.team !== undefined
          ? this.props.team.team.message
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  team: state.teams.team
});

export default connect(mapStateToProps)(TeamMessage);
