import React, { Component } from "react";
import "./Login.css";
import "./PasswordShowAndHide.js";
import PasswordShowAndHide from "./PasswordShowAndHide.js";
import GeneratePassword from '../GenPw/genPw';
import { register } from "../../actions/auth"
import { connect } from "react-redux"

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
  }


  render() {
    return (
      <div className="main">
        <div className="logo">
          <h3>dwb</h3>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            id="username"
            onChange={this.handleChange}
            type="username"
            placeholder="username"
            autoComplete="off"
            required
          />
          <i className="fa fa-user" />
          <i className="fa fa-lock" />
          <PasswordShowAndHide onChange={this.handleChange} />
          <input type="submit" value="Sign up" />
        <GeneratePassword />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { register })(Register)