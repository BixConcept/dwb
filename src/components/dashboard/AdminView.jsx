import React, { Component, Fragment } from "react";
import UsersWidget from "./admin/UsersWidget";
import TeamsWidget from "./admin/TeamsWidget";

class AdminView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <h1>admin dashboard</h1>
        <section>
          <UsersWidget />
        </section>
        <section>
          <TeamsWidget />
        </section>
      </Fragment>
    );
  }
}

export default AdminView;
