import React, { Component } from "react";

import css from "../../styles/dashboard/home/home.module.scss";

import Chart from "./Chart";
import AuthorChart from "./AuthorChart";
import ActivityGraph from "./ActivityGraph"

import CreateAssignmentForm from "./CreateAssignmentForm";
import TeamWidget from "./TeamWidget";
import AssignmentsWidget from "./AssignmentsWidget";
import TeamMessage from "./TeamMessage";

import { withTranslation } from "react-i18next";

class Home extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className={css.wrapper}>
        <section className={css.teamMessage}>
          <TeamMessage key={Math.random().toString()}/>
        </section>
        <section className={css.graph1}>
          <h1 className="s-heading">{t("dashboard.home.graph1")}</h1>
          <Chart />
        </section>
        <section className={css.graph2}>
          <h1 className="s-heading">{t("dashboard.home.graph2")}</h1>
          <AuthorChart />
        </section>
        <section className={css.create}>
          <h1 className="s-heading">
            {t("dashboard.home.createAssignment.title")}
          </h1>
          <CreateAssignmentForm />
        </section>
        <section className={css.team}>
          <h1 className="s-heading">{t("dashboard.home.team.title")}</h1>
          <TeamWidget />
        </section>
        <section className={css.assignments}>
          <AssignmentsWidget />
        </section>
        <section className={css.activityGraph}>
          <h1>{t("dashboard.home.activityGraph.title")}</h1>
          <ActivityGraph />
        </section>
      </div>
    );
  }
}

export default withTranslation()(Home);
