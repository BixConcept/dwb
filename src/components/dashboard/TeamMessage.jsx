import React, { Component } from "react";
import { connect } from "react-redux";

export class TeamMessage extends Component {
  render() {
    if (this.props.team.team !== undefined) {
      return (
        <div>
          message:{" "}
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
