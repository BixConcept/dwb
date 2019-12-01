import React, { Component, Fragment } from "react";
import "./Login.css";
import PasswordShowAndHide from "./PasswordShowAndHide.jsx";
import { register } from "../../actions/auth";
import { connect } from "react-redux";
import GeneratePassword from "./GeneratePassword";
import { withTranslation } from "react-i18next";
import Alert from "../Alert.jsx";

function Error(props) {
  if (!props.error) return null;
  return <Alert text={props.error} title="error" />;
}

class Register extends Component {
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
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);

    this.props.register(this.state);
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);

    if (newProps.isAuthenticated) this.props.history.push("/dashboard");
    this.setState({
      error: newProps.error
    });
  }
  render() {
    const {t} = this.props;
    return (
      <Fragment>
        <Error error={this.props.error} />
        <div className="main">
          <h1>{t("register.signup")}</h1>
          <div className="logo">
            <h3>dwb</h3>
          </div>
          <form onSubmit={this.handleSubmit}>
            <input
              id="username"
              onChange={this.handleChange}
              type="username"
              placeholder={t("auth.username")}
              autoComplete="off"
              required
            />
            <i className="fa fa-user" />
            <i className="fa fa-lock" />
            <PasswordShowAndHide onChange={this.handleChange} />
            <input
              type="submit"
              value={t("register.signup")}
              style={{ WebkitAppearance: "none" }}
            />
          </form>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.errors.errors.register
});

export default withTranslation()(connect(
  mapStateToProps,
  { register }
)(Register));
