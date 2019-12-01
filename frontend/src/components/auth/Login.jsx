import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PasswordShowAndHide from "./PasswordShowAndHide.jsx";
import "./Login.css";
import { withTranslation } from "react-i18next";
import Alert from "../Alert";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });

    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);

    this.props.login(this.state);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isAuthenticated) this.props.history.push("/dashboard");
  }

  render() {
    const {t} = this.props;
    return (
      <Fragment>
        {this.props.error ? (
          <Alert title="error" text={this.props.error} />
        ) : null}
        <div className="main">
        <h1>{t("login.submit")}</h1>
          <div className="logo">
            <h3>dwb</h3>
          </div>
          <form
            onSubmit={this.handleSubmit}
            autoComplete="off"
            style={{ WebkitAppearance: "none" }}
          >
            <input
              id="username"
              onChange={this.handleChange}
              type="username"
              placeholder={t("auth.username")}
              style={{ WebkitAppearance: "none" }}
              required
            />
            <i className="fa fa-user" />
            <i className="fa fa-lock" />
            <PasswordShowAndHide onChange={this.handleChange} />
            <input
              type="submit"
              value={t("login.submit")}
              style={{ WebkitAppearance: "none" }}
            />
            <h4>
              {t("login.notRegistered")} &nbsp;
              <a href="/#/register" className="CreateAcc">
                {t("login.linkToRegister")}
              </a>
            </h4>
          </form>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.errors.errors.login
});

export default withTranslation()(connect(
  mapStateToProps,
  { login }
)(Login));
