import React, { Component } from "react";
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
        labels: Object.keys(foo),
        datasets: [
          {
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
        label: "author",
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
      if (data[element.author_name] === undefined) {
        data[element.author_name] = 1;
        return;
      }
      data[element.author_name]++;
    });

    return data;
  }

  render() {
    return (
      <Pie
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
