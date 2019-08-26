import React, {Component} from 'react';

import css from '../../styles/dashboard/home/home.module.scss'


import CreateAssignmentForm from "./CreateAssignmentForm";
import TeamWidget from "./TeamWidget"
import AssignmentsWidget from "./AssignmentsWidget"

class Home extends Component {
  static

  render() {
    return (
      <div className={css.wrapper}>
        <section className={css.create}>
          <h1 className="s-heading">create assignment</h1>
          <CreateAssignmentForm/>
        </section>
        <section className={css.team}>
          <h1 className="s-heading">team</h1>
          <TeamWidget/>
        </section>
        <section className={css.stats}>
          <h1 className="s-heading">stats</h1>

          <div>
            <h2 className={css.bigNumber}>{this.state.assignmentsDue}</h2>
            <h3>assignments due</h3>
          </div>
        </section>
        <AssignmentsWidget/>
      </div>
    )
  }
}

export default Home;
