import React, { Component } from "react";
import { connect } from "react-redux";

import { Pie } from "react-chartjs-2";

class Chart extends Component {
  state = {
    chartData: {
      labels: [],
      datasets: [
        {
          label: "author",
          data: [],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)"
          ]
        }
      ]
    }
  };

  componentWillReceiveProps(newProps) {
    console.log(newProps.assignments);

    let foo = this.aggregate(newProps.assignments);
    console.log(Object.keys(foo));

    this.setState({
      chartData: {
        labels: Object.keys(foo).sort((a, b) => -foo[a] + foo[b]),
        datasets: [
          {
            data: Object.values(foo).sort((a, b) => -a + b),
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
              "rgba(236, 240, 241,1.0)"
            ]
          }
        ]
      }
    });
  }

  aggregate(rawData) {
    let data = {};

    rawData.forEach(element => {
      if (data[element.author_name] === undefined) {
        data[element.author_name] = 1;
        return;
      }
      data[element.author_name]++;
    });

    return data;
  }

  render() {
    return <Pie data={this.state.chartData} options={{ legend: false }} />;
  }
}

const mapStateToProps = state => ({
  assignments: state.assignments.assignments
});

export default connect(mapStateToProps)(Chart);
