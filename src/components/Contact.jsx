import React, { Component, Fragment } from "react";

import css from "../styles/contact.module.scss";
import { withTranslation } from "react-i18next";

class Contact extends Component {
  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <div className={css.contact}>
          <h1 className={css.heading}>{t("contact.heading")}</h1>
          <hr />

          <div className={css.content}>
            <h3>{t("contact.text")}</h3>
          </div>

          <div className={css.grid}>
            <div className={css.telegram}>
              <h2>telegram</h2>
              <hr />
              <i
                className="fab fa-telegram fa-4x"
                aria-hidden="true"
                href="https://t.me/joinchat/IpXLZBXHvzbtl0njbcHviQ"
              ></i>
            </div>

            <div className={css.mail}>
              <h2>e-mail</h2>
              <hr />
              <div>
                <a href="mailto:spam@3nt3.de">{t("contact.writeMail")}</a>
              </div>
            </div>

            <div className={css.discord}>
              <h2>discord</h2>
              <hr />
              <i
                className="fab fa-discord fa-4x"
                aria-hidden="true"
                href="https://discord.gg/Ek42SpT"
              ></i>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withTranslation()(Contact);
