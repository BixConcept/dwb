import React, { Component } from "react";

import css from "../../../styles/dashboard/admin/home.module.scss";

import { withTranslation } from "react-i18next";
import Stats from "./Stats";

class Home extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className={css.wrapper}>
        <h1>this is the admin dashboard</h1>
        <p>
          unless you are an administrator, there is no reason you should be
          here. if there is data here and you are not an administrator, please
          contact technical support and forget what you have seen.
        </p>
        <section>
          <Stats />
        </section>
      </div>
    );
  }
}

export default withTranslation()(Home);
