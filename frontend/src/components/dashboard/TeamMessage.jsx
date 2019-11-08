import React, { Component } from "react";
import { connect } from "react-redux";
import css from "../../styles/dashboard/home/teamMessageWidget.module.scss";
const Quote = () => {
  let quotes = [
    "Jungs, lasst den Schwanz in Ruhe! - Fr. Dr. Horn",
    "a² * b² = c² - GZUZ",
    "Du Internetrambo! - Gebrüder Grimm",
    "DEUTSCHLAND braucht einen Platz oben inna Süd. - Wilhelm II.",
    "An der Nase eines Mannes erkennt man seinen Johannes. - Immanuel Kant",
    "Hallo. - Jesus Christus"
  ];
  let getRndmQuote = quotes[Math.floor(Math.random() * quotes.length)];
  return getRndmQuote;
};

export class TeamMessage extends Component {
  render() {
    if (this.props.team.team !== undefined) {
      return (
        <div className={css.messageContainer}>
          {/*{this.props.team.team.message}*/}
          <Quote />
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  team: state.teams.team
});

export default connect(mapStateToProps)(TeamMessage);
