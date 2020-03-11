import React from "react";
import { connect } from "react-redux";

import { Line } from "react-chartjs-2";

const getLabels = () => {
  const now = Date.now();
  const day = 1000 * 60 * 60 * 24;

  let dates = [];

  for (let i = 31; i > 0; i--) {
    dates.push(new Date(now - day * (i - 1)).toISOString().substring(0, 10));
  }

  return dates;
};

const aggregate = (dates, rawData, key) => {
  let data = {};

  for (let date of dates) {
    data[date] = 0;
    for (let assignment of rawData) {
      const dateString = assignment[key].substring(0, 10);
      if (date === dateString) {
        data[date] += 1;
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
        labels: getLabels(),
        datasets: [
          {
            label: "assignments due",
            data: Object.values(
              aggregate(getLabels(), nextProps.assignments, "due_date")
            ),
            backgroundColor: ["rgba(52, 152, 219,.5)"],
            // lineTension: 0,
          },
          {
            label: "assignments created",
            data: Object.values(
              aggregate(getLabels(), nextProps.assignments, "created_at")
            ),
            backgroundColor: ["rgba(231, 76, 60,.5)"],
            // lineTension: 0,
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
