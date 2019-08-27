import React, { Component } from "react";

import css from "../../styles/dashboard/home/home.module.scss";

import CreateAssignmentForm from "./CreateAssignmentForm";
import TeamWidget from "./TeamWidget";
import AssignmentsWidget from "./AssignmentsWidget";

import { withTranslation } from "react-i18next";

class Home extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className={css.wrapper}>
        <section className={css.create}>
          <h1 className="s-heading">{t("dashboard.home.createAssignment.title")}</h1>
          <CreateAssignmentForm />
        </section>
        <section className={css.team}>
          <h1 className="s-heading">{t("dashboard.home.team.title")}</h1>
          <TeamWidget />
        </section>
        <section className={css.stats}>
          <h1 className="s-heading">{t("dashboard.home.stats.title")}</h1>
          <div>
            <h2 className={css.bigNumber}>2</h2>
            <h3>{t("dashboard.home.stats.assignmentsDue")}</h3>
          </div>
        </section>
        <AssignmentsWidget />
      </div>
    );
  }
}

export default withTranslation()(Home);
