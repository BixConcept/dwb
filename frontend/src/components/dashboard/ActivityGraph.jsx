import React from "react";
import { connect } from "react-redux";

import { Line } from "react-chartjs-2";

const getLabels = (assignment) => {
  const now = Date.now();
  const day = 1000 * 60 * 60 * 24;

  let maxDate = new Date("1970-01-01");
  for (let a of assignment) {
    const due_date = new Date(a.due_date);
    if (due_date > maxDate) {
      maxDate = due_date;
    }
  }

  let numDates = Math.round((maxDate - now) / day)
  console.log(`number of dates: ${numDates}`)
  if (numDates < 31) {
    numDates = 31
  }

  let dates = [];

  for (let i = numDates + 14; i > 0; i--) {
    dates.push(new Date(maxDate - day * (i - 1)).toISOString().substring(0, 10));
  }

  return dates;
};

const aggregate = (dates, rawData, key) => {
  let data = {};

  for (let date of dates) {
    data[date] = 0;
    for (let assignment of rawData) {
      try {
        const dateString = assignment[key].substring(0, 10);
        if (date === dateString) {
          data[date] += 1;
        }
      } catch {
        return {}
      }
    }
  }

  return data;
};

class ActivityGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    if (nextProps.assignments === undefined) return null;
    return {
      chartData: {
        labels: getLabels(nextProps.assignments),
        datasets: [
          {
            label: "assignments due",
            data: Object.values(
              aggregate(getLabels(nextProps.assignments), nextProps.assignments, "due_date")
            ),
            backgroundColor: ["rgba(52, 152, 219,.5)"],
            lineTension: 0,
          },
          {
            label: "assignments created",
            data: Object.values(
              aggregate(getLabels(nextProps.assignments), nextProps.assignments, "created_at")
            ),
            backgroundColor: ["rgba(231, 76, 60,.5)"],
            lineTension: 0,
          }
        ]
      }
    };
  }

  render() {
    return (
      <Line
        data={this.state.chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  assignments: state.assignments.assignments
});

export default connect(mapStateToProps)(ActivityGraph);
