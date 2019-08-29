import React, { Component } from "react";
import { withTranslation, I18nextProvider } from "react-i18next";
import ReactDOM from "react-dom";

import css from "../styles/langChanger.module.scss";
class LangChanger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      language: ""
    };
  }

  changeLng(lng) {
    console.log("moin");
    console.log("successfully set");
    this.props.i18n.changeLanguage(lng);
  }

  render() {
    const { t } = this.props;

    return (
      <I18nextProvider>
        <div className={css.dropdown} id="moin">
          <button
            onClick={() => {
              let d = ReactDOM.findDOMNode(this.refs.dropdwnContent);
              d.classList.toggle(css.show);
            }}
            className={css.dropdownBtn}
          >
            {t("selectLanguage.language")}
          </button>
          <div ref={"dropdwnContent"} className={css.dropdownContent}>
            <p
              onClick={() => {
                console.log("en");
                this.changeLng("en");
              }}
            >
              english
            </p>
            <p
              onClick={() => {
                console.log("de");
                this.changeLng("de");
              }}
            >
              deutsch
            </p>
          </div>
        </div>
      </I18nextProvider>
    );
  }
}

export default withTranslation()(LangChanger);
