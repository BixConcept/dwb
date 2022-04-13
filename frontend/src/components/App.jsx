import React, { Component, Fragment, StrictMode } from "react";
import "../styles/main.scss";

import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";
import Contact from "./Contact.jsx";
import Imprint from "./Imprint";

// router
import { HashRouter as Router, Routes, Route } from "react-router-dom";

// redux
import { setAuthenticated } from "../actions/auth";
import { connect } from "react-redux";

// keksen
import { CookiesProvider, withCookies } from "react-cookie";

import Footer from "./Footer";
import { API_HOST } from "..";
import PrivacyNotice from "./PrivacyNotice";
import AssignmentsView from "./dashboard/AssignmentsView";
import TeamView from "./dashboard/team/TeamView";
import DashboardHome from "./dashboard/Home";

class App extends Component {
  componentDidMount() {
    this.setAuthenticated(this.props);
  }

  setAuthenticated(props) {
    fetch(API_HOST + "/user/", { credentials: "include" }).then((r) => {
      this.props.setAuthenticated(r.ok);
    });
  }

  render() {
    return (
      <CookiesProvider>
        <Router>
          <StrictMode>
            <Fragment>
              <div className="content">
                <Navbar />
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="" element={<DashboardHome />} />
                    <Route path="assignments" element={<AssignmentsView />} />
                    <Route path="team" element={<TeamView />} />
                  </Route>

                  <Route path="/contact" element={<Contact />} />

                  <Route path="/imprint" element={<Imprint />} />
                  <Route path="/privacy-notice" element={<PrivacyNotice />} />
                </Routes>
              </div>
              <Footer />
            </Fragment>
          </StrictMode>
        </Router>
      </CookiesProvider>
    );
  }
}

export default withCookies(connect(null, { setAuthenticated })(App));
