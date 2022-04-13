import React, { Component } from "react";

// css
import css from "../styles/alert.module.scss";

export default class Alert extends Component {
  render() {
    return (
      <div className={css.alert}>
        <h3>{this.props.title}</h3>
        <p>{this.props.text}</p>
      </div>
    );
  }
}
