import React, { Component } from "react";
import "./Login.css";
import ReactDOM from "react-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default class GeneratePassword extends Component {
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
    return (
      <div>
        <div className="pwDiv">
          <h3>
            Don't have an idea for a password? Generate a very secure one.
          </h3>
          <div>
            {this.state.isGen ? (
              <div>
                <CopyToClipboard
                  text={this.state.value}
                  onCopy={() => this.setState({ copied: true })}
                >
                  <button>Copy to clipboard</button>
                </CopyToClipboard>
              </div>
            ) : (
                <button type="button" onClick={this.generatePw}>
                  Generate
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
                <span>Copied.</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
