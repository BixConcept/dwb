import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { getAllUsers } from "../../../actions/auth";

class UsersWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
    return (
      <Fragment>
        <h1>Users</h1>
        <p>
          currently there are{" "}
          {this.props.users === undefined ? null : this.props.users.length}{" "}
          users
        </p>
        <ul>
          {this.props.users === undefined
            ? null
            : this.props.users.map(user => {
                return <li>{user.username}</li>;
              })}
        </ul>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  users: state.auth.users
});

export default connect(
  mapStateToProps,
  { getAllUsers }
)(UsersWidget);
