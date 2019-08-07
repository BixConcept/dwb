import React, { Component } from "react";

import "./Home.css";

import Alert from "./Alert";

/*
LOL
SPD
*/

// Anti-Jakob-Abwehrsystem
const FBINotOpenUp = e => {
  console.log(e.key);
  if (e.key === "F12") {
    return !true;
  }
};

document.onkeydown = FBINotOpenUp;

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={"title"}>
          <h1> dwb </h1>
          <h2> your collaborative assignment manager </h2>
        </div>
        <div className={"features"}>
          <h2 className={"section-header"}>features</h2>
          <div className="feature">
            <h3>collaboration</h3>
            <i className="fas fa-users" />
            <span>
              you and your team share assignments that are relevant to everyone.
              so only one team member has to add assignments but everyone
              profits by saving time
            </span>
          </div>
          <div className={"feature"}>
            <h3>saving time</h3>
            <i className="fas fa-mug-hot" />
            <span>
              due to the fact that assignments are shared and only one person
              has to add an assignment everyone else profits by saving time on
              more important things ;)
            </span>
          </div>
          <div className={"feature"}>
            <h3>saving money i guess...?</h3>
            <i className="fas fa-money-bill-wave" />
            <span>
              our service is entirely free. no one has to pay anything. lol
            </span>
          </div>
        </div>
        <div className={"trusted-by"}>
          <h2 className={"section-header"}>trusted by</h2>
          <div className="wrapper">
            <div className={"wrapper-item"}>
              <span>
                Syrischer Verein zur Vernichtung des deutschen Volkes e. V.
              </span>
            </div>
            <div className={"wrapper-item"}>
              <span>Bernd Höcke</span>
            </div>
            <div className={"wrapper-item"}>
              <span>Tilman Knechtel</span>
            </div>
          </div>
        </div>
        <div className="team">
          <h2 className="section-header">team</h2>
          <div className="wrapper">
            <div className="wrapper-item">
              <h3>
                <span role="img" aria-label="raus geht kuss">
                  🦆
                </span>
              </h3>
              <span>mag brotkrümel</span>
            </div>
            <div className="wrapper-item">
              <h3>
                <span role="img" aria-label="slatt">
                  🥚⛰
                </span>
              </h3>
              <span role="img" aria-label=",">
                <b>S</b>lime <b>L</b>ove <b>A</b>ll <b>T</b>he <b>T</b>ime
              </span>
            </div>
            <div className="wrapper-item">
              <h3>
                <span role="img" aria-label="entfernen">
                  ☀️⛰
                </span>
              </h3>
              <span>hat einen verbreiteten namen</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
