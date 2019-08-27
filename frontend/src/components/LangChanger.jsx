import React, { Component } from "react";
import { withTranslation } from "react-i18next";

import css from "../styles/langChanger.module.scss";

class LangChanger extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.i18n.changeLanguage(e.target.id);
  }

  render() {
    return (
      <div>
        <form onChange={this.handleChange}>
          <input type="radio" name="lang" id="de" />
          <input type="radio" name="lang" id="en" />
          <input type="radio" name="lang" id="tr" />
        </form>
      </div>
    );
  }
}

export default withTranslation()(LangChanger);
