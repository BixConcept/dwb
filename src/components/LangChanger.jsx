import React, { Component } from "react";
import { withTranslation } from "react-i18next";

import css from "../styles/langChanger.module.scss";
import Flag from "react-flags";

class LangChanger extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let selectedIndex = e.target.options.selectedIndex
    console.log(selectedIndex)

    let language = ""
    console.log(this.props.i18n)
    switch (selectedIndex) {
      case 0:
        language = "de"
        break;
      case 1:
        language = "en"
        break;
    }
    this.props.i18n.changeLanguage(language)
  }

  render() {
    return (
      <div class="dropdown">
        <form onChange={this.handleChange}>
          <select>
            <option id="de">
              deutsch
            </option>
            <option id="en">english</option>
          </select>
        </form>
      </div>
    );
  }
}

export default withTranslation()(LangChanger);
