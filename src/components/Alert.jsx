import React, { Component } from "react";

// css
import "./Alert.css";

export default class Alert extends Component {
  render() {
    return (
      <div className={`alert alert-${this.props.type}`}>
        <h3>{this.props.title}</h3>
        <p>{this.props.text}</p>
      </div>
    );
  }
}
