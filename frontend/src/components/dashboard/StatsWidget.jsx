import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import css from "../../styles/dashboard/home/stats.module.scss";

class StatsWidget extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div className={css.stats}>
        <h2 className={css.bigNumber}>
          {
            this.props.assignments.filter((val, index) => {
              return (
                Date.parse(val.due_date) >
                Date.parse(Date()) - 1000 * 60 * 60 * 24
              );
            }).length
          }
        </h2>
        <h3>{t("dashboard.home.stats.assignmentsDue")}</h3>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  assignments: state.assignments.assignments
});

export default withTranslation()(connect(mapStateToProps)(StatsWidget));
