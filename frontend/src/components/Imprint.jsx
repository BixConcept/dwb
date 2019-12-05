import React, { Component } from "react";

import css from "../styles/imprint.module.scss";
import { withTranslation } from "react-i18next";

import { API_HOST } from "../index";

class Imprint extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { t } = this.props;
    return (
      <div>
        <div className={css.imprintHeader}>
          <h1>{t("imprint.title")}</h1>
        </div>
        <div className={css.content}>
          <h2>Angaben gemäß § 5 TMG:</h2>
          <p>3nt3rt41nm3nt GbR<br />Niels Schlegel</p>
          <h3>Postanschrift:</h3>
          <p>Thienhausener Str. 32<br />42781 Haan<br /></p>
          <h3>Kontakt:</h3>
          <p>Telefon: 0176 45750946<br />E-Mail: gott@3nt3.de</p>
        </div>
      </div>
    );
  }
}

export default withTranslation()(Imprint);
