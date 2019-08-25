import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

import { NavLink } from "react-router-dom";

import { withCookies } from "react-cookie";

// css
import css from "../styles/navbar.module.scss";

class Navbar extends Component {
  state = {
    items: []
  };

  constructor(props) {
    super(props);
    this.featuresRef = React.createRef();
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

  scroll(ref) {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    return (
      <header>
        <nav className={css.navbar}>
          <NavLink to="/">
            <h1 id="logo">dwb</h1>
          </NavLink>
          <ul>
            {this.state.items.map(element => {
              if (element.type === "logout") {
                return (
                  <li key="logout">
                    <a
                      href="/"
                      onClick={this.handleLogout}
                      className={css.link}
                    >
                      logout
                    </a>
                  </li>
                );
              }
              return (
                <li key={element.link}>
                  <NavLink
                    to={element.link}
                    onClick={element.onClick}
                    className={css.link}
                  >
                    {element.text}
                  </NavLink>
                </li>
              );
            })}
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
