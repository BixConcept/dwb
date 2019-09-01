import React, { Component } from "react";
import { connect } from "react-redux";

import { Bar } from "react-chartjs-2";

class Chart extends Component {
  state = {
    dataluuuuuv: {
      label: "foo"
    }
  };

  componentWillReceiveProps(newProps) {
    let foo = this.aggregate(newProps.assignments);

    this.setState({
      chartData: {
        labels: Object.keys(foo),
        datasets: [
          {
            label: "subject",
            data: Object.values(foo),
            backgroundColor: [
              "rgba(26, 188, 156,1.0)",
              "rgba(46, 204, 113,1.0)",
              "rgba(52, 152, 219,1.0)",
              "rgba(155, 89, 182,1.0)",
              "rgba(52, 73, 94,1.0)",
              "rgba(22, 160, 133,1.0)",
              "rgba(39, 174, 96,1.0)",
              "rgba(41, 128, 185,1.0)",
              "rgba(142, 68, 173,1.0)",
              "rgba(44, 62, 80,1.0)",
              "rgba(241, 196, 15,1.0)",
              "rgba(230, 126, 34,1.0)",
              "rgba(231, 76, 60,1.0)",
              "rgba(236, 240, 241,1.0)",
            ]
          }
        ]
      }
    });

    /*
    this.setState({
      dataluuuuuv: {
      labels: ["soos", "fdsa"],
        label: "subject",
        data: Object.values(foo),
        backgroundColor: "rgba(255,99,132,0.2)"
      }
    });

    */

    console.log(this.state);
  }

  aggregate(rawData) {
    let data = {};

    rawData.forEach(element => {
      if (data[element.subject] === undefined) {
        data[element.subject] = 1;
        return;
      }
      data[element.subject]++;
    });

    return data;
  }

  render() {
    return (
      <Bar
        className=""
        data={this.state.chartData}
        options={{
          responsive: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  min: 0 // minimum will be 0, unless there is a lower value.
                }
              }
            ]
          }
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  assignments: state.assignments.assignments
})

export default connect(mapStateToProps)(Chart);
