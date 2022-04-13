import React, { Component } from "react";
import { withTranslation, I18nextProvider } from "react-i18next";
import css from "../styles/langChanger.module.scss";
class LangChanger extends Component {
  changeLng(lng) {
    this.props.i18n.changeLanguage(lng);
  }

  render() {
    const { t } = this.props;
    return (
      <I18nextProvider>
        <div className={css.container}>
          <button className={css.btn}>
            <span>{t("selectLanguage.language")}</span>
            <p>&nbsp;</p>
            <i className="fas fa-language"></i>
            <ul className={css.dropdown}>
              <li onClick={() => this.changeLng("de")}>
                <p>
                  deutsch{" "}
                  <span role="img" aria-label="german">
                    🇩🇪
                  </span>
                </p>
              </li>
              <li onClick={() => this.changeLng("en")}>
                <p>
                  english{" "}
                  <span role="img" aria-label="english">
                    🇬🇧
                  </span>
                </p>
              </li>
              <li onClick={() => this.changeLng("la")}>
                <p>
                  lingua latina <span role="img" aria-label="latin"></span>
                </p>
              </li>
            </ul>
          </button>
        </div>
      </I18nextProvider>
    );
  }
}

export default withTranslation()(LangChanger);
