import React, { Component } from "react";
import "./Login.css";
import { withTranslation } from "react-i18next";


class PasswordShowAndHide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true,
      password: "",
      isEyeClassSlash: false
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  toggleShow() {
    this.setState({
      hidden: !this.state.hidden,
      isEyeClassSlash: this.state.hidden
    });
  }

  componentDidMount() {
    if (this.props.password) {
      this.setState({ password: this.props.password });
    }
  }

  eyeStyle = {
    color: "#3498db",
    position: "absolute",
    top: "4.2em",
    right: "2.2em",
    fontSize: "18pt",
    cursor: "pointer",
    transition: "0.2s ease-out"
  };

  render() {
    const {t} = this.props;
    return (
      <div>
        <input
          type={this.state.hidden ? "password" : "text"}
          onChange={this.props.onChange}
          placeholder={t("auth.password")}
          autoComplete="off"
          id="password"
          required
        />
        <i
          onClick={this.toggleShow}
          style={this.eyeStyle}
          className={
            this.state.isEyeClassSlash ? "fa fa-eye" : "fa fa-eye-slash"
          }
        />
      </div>
    );
  }
}

export default withTranslation()(PasswordShowAndHide);