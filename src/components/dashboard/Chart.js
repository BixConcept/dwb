import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class Chart extends Component {
  state = {
    dataluuuuuv: {
      label: "foo"
    }
  };


  componentWillReceiveProps(newProps) {
    console.log(newProps.assignments);

    let foo = this.aggregate(newProps.assignments);
    console.log(Object.keys(foo));

    this.setState({
      chartData: {
        labels: Object.keys(foo),
        datasets: [
          {
            label: "subject",
            data: Object.values(foo),
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
        data={this.state.chartData}
        options={{
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

export default Chart;
