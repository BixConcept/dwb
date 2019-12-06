import React, { Component, Fragment } from "react";
import "../styles/main.scss";

import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";
import Contact from "./Contact.jsx";
import Imprint from "./Imprint";

// router
import { HashRouter as Router, Switch, Route } from "react-router-dom";

// redux
import { setAuthenticated } from "../actions/auth";
import { connect } from "react-redux";

// keksen
import { CookiesProvider, withCookies } from "react-cookie";

import Footer from "./Footer";
import { API_HOST } from "..";
import PrivacyNotice from "./PrivacyNotice";

class App extends Component {
  componentDidMount() {
    this.setAuthenticated(this.props);
  }

  setAuthenticated(props) {
    fetch(API_HOST + "/user/", { credentials: "include" })
      .then(r => {
        this.props.setAuthenticated(r.ok);
      })
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

                <Route path="/contact" component={Contact} />

                <Route path="/imprint" component={Imprint} />
                <Route path="/privacy-notice" component={PrivacyNotice} />
              </Switch>
            </div>
            <Footer />
          </Fragment>
        </Router>
      </CookiesProvider>
    );
  }
}

export default withCookies(connect(null, { setAuthenticated })(App));
