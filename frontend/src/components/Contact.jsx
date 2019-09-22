import React, { Component } from "react";

import css from "../styles/contact.module.scss";
import { withTranslation } from "react-i18next";

import { API_HOST } from "../index";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    // dom stuff
    e.preventDefault();
    e.target.reset();

    // actual request
    fetch(API_HOST + "/contact/", {
      method: "POST",
      body: JSON.stringify(this.state)
    });
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <div className={css.contactHeader}>
          <h1>{t("contact.title")}</h1>
        </div>
        <form className={css.contactForm} onSubmit={this.handleSubmit}>
          <div className={css.contactField}>
            <input
              className={css.name}
              style={{ WebkitAppearance: "none" }}
              type="text"
              placeholder={t("contact.placeholders.name")}
              required
              onChange={e => {
                this.setState({ name: e.target.value });
              }}
            />
            <input
              className={css.mail}
              style={{ WebkitAppearance: "none" }}
              type="text"
              placeholder={t("contact.placeholders.email")}
              required
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
            />
            <textarea
              autoFocus
              maxLength="10000"
              cols="40"
              rows="5"
              className={css.text}
              style={{ WebkitAppearance: "none" }}
              type="text"
              placeholder={t("contact.placeholders.message")}
              required
              onChange={e => {
                this.setState({ message: e.target.value });
              }}
            />
            <input style={{ WebkitAppearance: "none" }} type="submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default withTranslation()(Contact);
