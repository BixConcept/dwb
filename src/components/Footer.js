import React, { Component } from "react";

import "./Footer.css";
import { Link } from "react-router-dom";

export default class Footer extends Component {
  render() {
    return (
      <div className="lol">
        <footer>
          <ul>
            <li>
                <Link to="/contact">contact</Link>
                </li>
            <li>report bugs / some kinda issues</li> 
          </ul>
        </footer>
      </div>
    );
  }
}
                                                                                                                                                          