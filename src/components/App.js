import React, { Component, Fragment } from "react";
import "./App.css";

import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./dashboard/Dashboard";
import Get_Started from "./Get_Started/Get_Started";

// router
import { HashRouter as Router, Switch, Route } from "react-router-dom";

// redux
import { Provider } from "react-redux";
import store from "../store";

// keksen
import { CookiesProvider, withCookies } from "react-cookie";

class App extends Component {
  componentDidMount() {
    console.log(this.props.cookies.session);
    let authenticated = this.props.cookies.session !== undefined;
    store.dispatch({
      type: "SET_AUTHENTICATED",
      payload: authenticated
    });
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
                <Route path="/get_started" component={Get_Started} />
              </Switch>
            </Fragment>
          </Router>
        </Provider>
      </CookiesProvider>
    );
  }
}

export default withCookies(App);
