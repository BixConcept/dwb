import React from "react";
import { connect } from "react-redux";
import { useTranslation, withTranslation } from "react-i18next";
import { getAssignments } from "../../actions/assignments";

import css from "../../styles/dashboard/home/assignmentsWidget.module.scss";

function AssignmentGroup(props) {
  ////console.log(props)
  const { t } = useTranslation();
  if (props.assignments !== undefined) {
    return (
      <div className={props.classIdentifier}>
        <h3>{props.title}</h3>
        <div className={css.line}></div>
        <ul>
          {props.assignments.map(item => (
            <li key={item.text}>
              <div className="white">
                <p>
                  {item.subject}: {item.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div className={props.classIdentifier}>
        <h3>{props.title}</h3>
        <div className={css.line}></div>
        <p>{t("dashboard.home.assignments.noAssignments")}</p>
      </div>
    );
  }
}

/**
 * @return {null}
 */
function AssignmentGroups(props) {
  const { t } = useTranslation();

  if (props.groups === undefined) {
    return null;
  }

  return (
    <React.Fragment>
      <AssignmentGroup
        title={t("today")}
        classIdentifier={css.today}
        assignments={props.groups[0].assignments}
      />
      <AssignmentGroup
        title={t("tomorrow")}
        classIdentifier={css.tomorrow}
        assignments={props.groups[1].assignments}
      />
      <AssignmentGroup
        title={t("the day after tomorrow")}
        classIdentifier={css.future}
        assignments={props.groups[2].assignments}
      />
    </React.Fragment>
  );
}

class AssignmentsWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  dateIsEqual(date1, date2) {
    date1 = new Date(date1);
    date2 = new Date(date2);

    ////console.log(date1, date2);

    return (
      date1.getYear() === date2.getYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  componentWillReceiveProps(newProps) {
    var groups = [{}, {}, {}];

    if (newProps.assignments === 0) return;

    for (let assignment of newProps.assignments) {
      let date = Date.parse(new Date(assignment.due_date));

      let now = Date.now();

      this.setState.outstandingAssignments += 1;

      // ugliest code i ever wrote incoming...
      const day = 1000 * 60 * 60 * 24;
      let groupid = 0;

      if (this.dateIsEqual(date, now)) groupid = 0;
      else if (this.dateIsEqual(date, now + day * 1)) groupid = 1;
      else if (this.dateIsEqual(date, now + day * 2)) groupid = 2;
      else continue;

      if (groups[groupid].assignments === undefined) {
        groups[groupid] = { date, assignments: [assignment] };
      } else {
        groups[groupid].assignments.push(assignment);
      }
    }

    this.setState({
      assignmentGroups: groups.sort((a, b) => {
        return a.date - b.date;
      })
    });
  }

  componentDidMount() {
    this.props.getAssignments();
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <h1 className="s-heading">{t("dashboard.home.assignments.title")}</h1>
        <div className={css.days}>
          <AssignmentGroups groups={this.state.assignmentGroups} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  assignments: state.assignments.assignments
});

export default withTranslation()(
  connect(
    mapStateToProps,
    { getAssignments }
  )(AssignmentsWidget)
);
