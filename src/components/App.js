import React, { Component, Fragment } from "react";
import "../styles/main.scss";

import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./dashboard/Dashboard";

// router
import { HashRouter as Router, Switch, Route } from "react-router-dom";

// redux
import { setAuthenticated } from "../actions/auth";
import { connect } from "react-redux";

// keksen
import { CookiesProvider, withCookies } from "react-cookie";

import Footer from "./Footer";

class App extends Component {
  componentDidMount() {
    this.setAuthenticated(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setAuthenticated(nextProps);
  }

  setAuthenticated(props) {
    let session = props.cookies.get("session");
    console.log(`authenticated: ${session !== undefined}`);
    if (session !== undefined) this.props.setAuthenticated(true);
  }

  render() {
    return (
      <CookiesProvider>
        <Router>
          <Fragment>
            <div className="content">
              <Navbar />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/contact" component={Component} />
              </Switch>
            </div>
            <Footer />
          </Fragment>
        </Router>
      </CookiesProvider>
    );
  }
}

export default withCookies(
  connect(
    null,
    { setAuthenticated }
  )(App)
);
