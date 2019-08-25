import React, { Component } from "react";

import css from "../styles/footer.module.scss";
import { Link } from "react-router-dom";

export default class Footer extends Component {
  render() {
    return (
      <footer className={css.footer}>
        <div className="container">
          <ul>
            <li>
              &copy; 2019 3nt3rt41nm3nt GbR
            </li>
            <li>
              <Link to="/contact">contact</Link>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
}
