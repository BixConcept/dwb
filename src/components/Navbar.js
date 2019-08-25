import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

import { Link } from "react-router-dom";

import { withCookies } from "react-cookie";

// css
import css from "../styles/Navbar.module.scss";

class Navbar extends Component {
  state = {
    items: []
  };

  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    //this.props.cookies.remove("session");
    this.props.logout();
  }

  updateLinks(authenticated) {
    if (authenticated) {
      this.setState({
        items: [{ link: "/dashboard", text: "dashboard" }, { type: "logout" }]
      });
    } else {
      this.setState({
        items: [
          { link: "/login", text: "log in" },
          { link: "/register", text: "register" }
        ]
      });
    }
  }

  componentWillReceiveProps(newProps) {
    this.updateLinks(newProps.isAuthenticated);
  }

  componentDidMount() {
    this.updateLinks(this.props.isAuthenticated);
  }

  render() {
    return (
      <header>
        <nav className={css.navbar}>
            <span>
              <h1 id="logo">dwb</h1>
            </span>
            <ul>
              <li>
                <Link to="#features">features</Link>
              </li>
              <li>
                <Link to="#soos">soos</Link>
              </li>
              <li>
                <Link to="#soos">soos</Link>
              </li>
              {/*
            {this.state.items.map(element => {
              if (element.type === "logout") {
                return (
                  <li key="logout">
                    <a href="/" onClick={this.handleLogout}>
                      logout
                    </a>
                  </li>
                );
              }
              return (
                <li key={element.link}>
                  <Link to={element.link} onClick={element.onClick}>
                    {element.text}
                  </Link>
                </li>
              );
            })}
          */}
            </ul>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { logout }
)(withCookies(Navbar));
