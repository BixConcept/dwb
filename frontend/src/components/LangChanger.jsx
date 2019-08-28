import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import ReactDOM from "react-dom";

import css from "../styles/langChanger.module.scss";
class LangChanger extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let selectedIndex = e.target.options.selectedIndex;
    console.log(selectedIndex);

    let language = "";
    console.log(this.props.i18n);
    switch (selectedIndex) {
      case 0:
        language = "de";
        break;
      case 1:
        language = "en";
        break;
    }
    this.props.i18n.changeLanguage(language);
  }

  componentDidMount() {
    window.onclick = event => {
      if (!event.target.matches(css.dropdownBtn)) {
        let dropdowns = document.getElementsByClassName(css.dropwdownContent);
        for (let i = 0; i < dropdowns.length; i++) {
          let openDropdown = dropdowns[i];
          if (openDropdown.classList.contains(css.show)) {
            openDropdown.classList.remove(css.show);
          }
        }
      }
    };
  }
  render() {
    const { t } = this.props;
    return (
      <div className={css.dropdown}>
        <button
          onClick={() => {
            console.log("btn clicked");
            let d = ReactDOM.findDOMNode(this.refs.dropdwnContent);
            d.classList.toggle(css.show);
          }}
          className={css.dropdownBtn}
        >
          {t("language")}
        </button>
        <div ref={"dropdwnContent"} className={css.dropdownContent}>
          <p href="#">englisch</p>
          <p href="#">deutsch</p>
        </div>
      </div>
    );
  }
}

export default withTranslation()(LangChanger);
