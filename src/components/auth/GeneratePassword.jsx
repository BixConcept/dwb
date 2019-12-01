import React, { Component } from "react";
import "../../styles/auth/auth.scss";
import ReactDOM from "react-dom";
import { withTranslation } from "react-i18next";
import { CopyToClipboard } from "react-copy-to-clipboard";

class GeneratePassword extends Component {
  // generated a random password using cryptojs

  constructor(props) {
    super(props);

    this.state = {
      isGen: false,
      value: "",
      copied: !true
    };

    this.generatePw = this.generatePw.bind(this);
  }
  generatePw() {
    let result = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!$%&/=?*+#";
    for (let i = 0; i < chars.length; i++) {
      let cryptoStr = new Uint8Array(1);
      result += chars.charAt(crypto.getRandomValues(cryptoStr));
    }
    let pw = result.substring(0, 10);

    this.setState({
      isGen: true,
      value: pw,
      copied: false
    });

    const p = <p>{"generated password: " + pw}</p>;
    ReactDOM.render(p, document.getElementById("passw"));
  }

  onChange = ({ target: { value } }) => {
    this.setState({ value, copied: false });
  };

  onClick = ({ target: { innerHTML } }) => {
    console.log(`Click on "${innerHTML}"`);
  };

  render() {
    const {t} = this.props;
    return (
      <div>
        <div className="pwDiv">
          <h3>
            {t("register.genPw")}
          </h3>
          <div>
            {this.state.isGen ? (
              <div>
                <CopyToClipboard
                  text={this.state.value}
                  onCopy={() => this.setState({ copied: true })}
                >
                  <button>{t("register.copyToClipboard")}</button>
                </CopyToClipboard>
              </div>
            ) : (
                <button type="button" onClick={this.generatePw}>
                  {t("register.gen")}
              </button>
              )}
            <p
              id="passw"
              value={this.state.value}
              onChange={({ target: { value } }) =>
                this.setState({ value, copied: false })
              }
            />
            {this.state.copied ? (
              <div>
                <span>{t("register.copied")}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(GeneratePassword);
