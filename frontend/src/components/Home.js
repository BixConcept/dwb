import React, { Component } from "react";
import "./Home.css";

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
      <div>
        <header id="showcase">
          <div className="showcase-content">
            <h1 className="l-heading">dwb</h1>
            <h2>your collaborative assignment manager</h2>
            <h3>beta v0.3</h3>
          </div>
        </header>
        {/*
        <div classNameName={"features"}>
          <h2 classNameName={"section-header"}>features</h2>
          <div classNameName="feature">
            <h3>collaboration</h3>
            <i classNameName="fas fa-users" />
            <span>
              you and your team share assignments that are relevant to everyone.
              so only one team member has to add assignments but everyone
              profits by saving time
            </span>
          </div>
          <div classNameName={"feature"}>
            <h3>saving time</h3>
            <i classNameName="fas fa-mug-hot" />
            <span>
              due to the fact that assignments are shared and only one person
              has to add an assignment everyone else profits by saving time on
              more important things ;)
            </span>
          </div>
          <div classNameName={"feature"}>
            <h3>saving money i guess...?</h3>
            <i classNameName="fas fa-money-bill-wave" />
            <span>
              our service is entirely free. no one has to pay anything. lol
            </span>
          </div>
        </div>
        <div classNameName={"trusted-by"}>
          <h2 classNameName={"section-header"}>trusted by</h2>
          <div classNameName="wrapper">
            <div classNameName={"wrapper-item"}>
              <span>
                Syrischer Verein zur Vernichtung des deutschen Volkes e. V.
              </span>
            </div>
            <div classNameName={"wrapper-item"}>
              <span>Bernd Höcke</span>
            </div>
            <div classNameName={"wrapper-item"}>
              <span>Tilman Knechtel</span>
            </div>
          </div>
        </div>
        <div classNameName="team">
          <h2 classNameName="section-header">team</h2>
          <div classNameName="wrapper">
            <div classNameName="wrapper-item">
              <h3>
                <span role="img" aria-label="raus geht kuss">
                  🦆
                </span>
              </h3>
              <span>mag brotkrümel</span>
            </div>
            <div classNameName="wrapper-item">
              <h3>
                <span role="img" aria-label="slatt">
                  🥚⛰
                </span>
              </h3>
              <span role="img" aria-label=",">
                <b>S</b>lime <b>L</b>ove <b>A</b>ll <b>T</b>he <b>T</b>ime
              </span>
            </div>
            <div classNameName="wrapper-item">
              <h3>
                <span role="img" aria-label="entfernen">
                  ☀️⛰
                </span>
              </h3>
              <span>hat einen verbreiteten namen</span>
            </div>
          </div>
        </div>
*/}
        <section id="features" class="p-2 text-center bg-dark">
          <div className="containerr">
            <h1 className="m-heading text-primary">features</h1>
            <div id="features-list">
              <div className="feature">
                <h1 className="s-heaing">saving time</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Veritatis odit neque fuga similique obcaecati eveniet ducimus
                  consequuntur ad molestiae explicabo.
                </p>
              </div>
              <div className="feature">
                <h1 className="s-heading">saving money</h1>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Expedita natus autem quidem quia magnam, pariatur tenetur
                  quasi sapiente sunt doloribus!
                </p>
              </div>
              <div className="feature">
                <h1 className="s-heading">data visualization</h1>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea
                  nesciunt accusamus officiis vitae optio, molestiae ipsam in
                  exercitationem at modi!
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
