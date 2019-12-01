import React, { Component } from "react";
import { withTranslation, I18nextProvider } from "react-i18next";
import css from "../styles/langChanger.module.scss";

class LangChanger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      language: ""
    };
  }

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
              <li>
                <p onClick={() => this.changeLng("de")}>deutsch <span role="img" aria-label="" aria-labelledby="">🇩🇪</span></p>
              </li>
              <li>
                <p onClick={() => this.changeLng("en")}>english <span role="img" aria-label="" aria-labelledby="">🇬🇧</span></p>
              </li>
            </ul>
          </button>
        </div>
      </I18nextProvider>
    );
  }
}

export default withTranslation()(LangChanger);
