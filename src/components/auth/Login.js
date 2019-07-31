import React, { Component } from "react";
import "./Login.css";
import "./PasswordShowAndHide.js";
import PasswordShowAndHide from "./PasswordShowAndHide.js";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

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
        <div className="logo">
          <h3>dwb</h3>
        </div>
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <input
            id="username"
            onChange={this.handleChange}
            type="username"
            placeholder="username"
            required
          />
          <i className="fa fa-user" />
          <i className="fa fa-lock" />
          <PasswordShowAndHide onChange={this.handleChange} />
          <input type="submit" value="Log In" />
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
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
