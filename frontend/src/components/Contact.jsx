import React, { Component } from "react";

import css from "../styles/contact.module.scss";
import { withTranslation } from "react-i18next";

class Contact extends Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <div className={css.contactHeader}>
          <h1>contact us</h1>
        </div>
        <div className={css.contactForm}>
          <div className={css.contactField}>
            <input
              className={css.name}
              style={{ WebkitAppearance: "none" }}
              type="text"
              placeholder="name"
              required
            />
            <input
              className={css.mail}
              style={{ WebkitAppearance: "none" }}
              type="text"
              placeholder="email"
              required
            />
            <textarea
              autoFocus
              maxLength="1000"
              cols="40"
              rows="5"
              className={css.text}
              style={{ WebkitAppearance: "none" }}
              type="text"
              placeholder="message"
              required
            />
          <input style={{ WebkitAppearance: "none" }} type="submit" />
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(Contact);
