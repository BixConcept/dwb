import React, { Component } from "react";
import { withTranslation } from "react-i18next";

import css from "../styles/footer.module.scss";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    const { t } = this.props;
    return (
      <footer className={css.footer}>
        <div className="container">
          <ul>
            <li>&copy; 2019 3nt3rt41nm3nt GbR</li>
            <li>
              <Link to="/imprint">{t("imprint.title")}</Link>
            </li>
            <li>
              <Link to="/contact">{t("footer.contact")}</Link>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
}

export default withTranslation()(Footer);
