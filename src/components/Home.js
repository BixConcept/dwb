import React, { Component, Fragment } from "react";
import css from "../styles/Home.module.scss";

/*
// Anti-Jakob-Abwehrsystem
const FBINotOpenUp = e => {
  console.log(e.key);
  if (e.key === "F12") {
    return !true;
  }
};

document.onkeydown = FBINotOpenUp;
*/
export default class Home extends Component {
  render() {
    return (
      <Fragment>
        <header className={css.showcase}>
          <div className={css.showcaseContent}>
            <div className="text-center p-2">
              <h1 className="l-heading">digital white board</h1>
              <p>your collaborative assignment management tool</p>
              <button></button>
            </div>
          </div>
        </header>

        <section id="features" className="p-2 text-center bg-light">
          <div className="container">
            <h1 className="m-heading">
              <span className="text-primary">features</span> we offer
            </h1>
            <div className={css.featuresList}>
              <div className={css.feature}>
                <h1 className="s-heading">saving time</h1>
                <p>
                  due to the fact that assignments are shared and only one
                  person has to add an assignment everyone else profits by
                  saving time on more important things ;)
                </p>
              </div>
              <div className={css.feature}>
                <h1 className="s-heading">saving money</h1>
                <p>
                  our service is entirely free. no one has to pay anything. lol
                </p>
              </div>
              <div className={css.feature}>
                <h1 className="s-heading">data visualization</h1>
                <p>
                  the only real reason we developed this service is cool graphs.
                  it is really important for us. there are cOoL gRaPhS.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="team" className="bg-dark">
          <div className={css.teamContainer}>
            <div className={css.img}></div>
            <div className={css.text}>
              <div className="p-1">
                <h1 className="m-heading">
                  <span className="text-primary">our</span> team
                </h1>
                <p>
                  we r a small team of students creating this tool as a cs
                  project in 9th gr8.
                </p>
                <ul className={css.teamMembers}>
                  <li>3nt3 - duck</li>
                  <li>anuz - oaschloch</li>
                  <li>goat* - määääh</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
