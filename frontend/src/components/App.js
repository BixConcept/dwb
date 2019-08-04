import React, { Component, Fragment } from "react";
import "./App.css";

import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./dashboard/Dashboard";

import generatePassword from "./auth/GeneratePassword"

// router
import { HashRouter as Router, Switch, Route } from "react-router-dom";

// redux
import { setAuthenticated } from "../actions/auth";
import { connect } from "react-redux";

// keksen
import { CookiesProvider, withCookies } from "react-cookie";

class App extends Component {
  componentDidMount() {
    this.props.setAuthenticated(this.props.cookies.get("session") !== undefined);
  }

  componentWillReceiveProps(nextProps) {
    this.props.setAuthenticated(nextProps.cookies.get("session") !== undefined);
  }



  render() {
    return (
      <CookiesProvider>
        <Provider store={store}>
          <Router>
            <Fragment>
              <Navbar />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/getStarted" component={GetStarted} />
                <Route path="/genPw" component={generatePassword} />
              </Switch>
            </Fragment>
          </Router>
        </Provider>
      </CookiesProvider>
    );
  }
}

export default connect(
  undefined,
  { setAuthenticated }
)(withCookies(App));
