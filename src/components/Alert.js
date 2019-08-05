import React, { Component } from "react";

// css
import "./Alert.css";

export default class Alert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: true
    };
  }

  componentDidMount() {
    const t = this.props.timeout * 1000;
    setTimeout(() => {
      this.setState({
        isVisible: false
      });
    }, t);
  }

  render() {
    if (this.state.isVisible) {
      return (
        <div className={`alert alert-${this.props.type}`}>
          <h3>{this.props.title}</h3>
          <p>{this.props.text}</p>
        </div>
      );
    } else {
      return null;
    }
  }
}
