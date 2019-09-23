import React, { Component } from "react";
import { connect } from "react-redux";

import { login } from "../../actions/auth";

import PasswordShowAndHide from "./PasswordShowAndHide.jsx";

import "../../styles/login.module.scss";
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
    return (
      <div className="main">
        {this.props.error ? (
          <Alert title="error" text={this.props.error} timeout={5} />
        ) : null}
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
            placeholder="username"
            style={{ WebkitAppearance: "none" }}
            required
          />
          <i className="fa fa-user" />
          <i className="fa fa-lock" />
          <PasswordShowAndHide onChange={this.handleChange} />
          <input
            type="submit"
            value="Log In"
            style={{ WebkitAppearance: "none" }}
          />
          <h4>
            Not Registered? &nbsp;
            <a href="/#/register" className="CreateAcc">
              Create an Account
            </a>
          </h4>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.errors.login
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
