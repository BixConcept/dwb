import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

import { NavLink } from "react-router-dom";
import LangChanger from "./LangChanger";

import { withCookies } from "react-cookie";
import { withTranslation } from "react-i18next";

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
  const { t } = this.props;
    if (authenticated) {
      this.setState({
        items: [
          { link: "/dashboard", text: t("nav.dashboard") },
          { type: "logout" }
        ]
      });
    } else {
      this.setState({
        items: [
          { link: "/login", text: t("nav.login") },
          { link: "/register", text: t("nav.register") }
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
    const { t } = this.props;
    return (
      <header>
        <nav className={css.navbar}>
          <NavLink to="/">
            <h1 id="logo">dwb</h1>
          </NavLink>
          <ul>
            <li>
              <LangChanger />
            </li>
            {this.state.items.map(element => {
              if (element.type === "logout") {
                return (
                  <li key="logout">
                    <a
                      href="/"
                      onClick={this.handleLogout}
                      className={css.link}
                    >
                      {t("nav.logout")}
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

export default withTranslation()(
  connect(
    mapStateToProps,
    { logout }
  )(withCookies(Navbar))
);
