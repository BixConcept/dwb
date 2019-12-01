import React, { Component } from "react";
import { connect } from "react-redux";
import css from "../../styles/dashboard/home/teamMessageWidget.module.scss";

 
const Quote = () => {
  let quotes = [
    "Jungs, lasst den Schwanz in Ruhe! - Fr. Dr. Horn",
    "a² * b² = c² - GZUZ",
    "Du Internetrambo! - Gebrüder Grimm",
    "Deutschland braucht einen Platz an der Sonne. - Wilhelm II.",
    "An der Nase eines Mannes erkennt man seinen Johannes. - Immanuel Kant",
    "Hallo. - Jesus Christus",
    "In Mexiko sagt man nicht 'Ich liebe dich.' die können dort nämlich gar kein Deutsch. - Plato",
    "Die Sieger Olympias bekamen goldene Lorbeerkränze. - David K.",
    "Smoke trees everyday. - David K.",
    "In germany teachers don't say 'you have to learn this'. Instead they say: 'Wenn ich um 3 Uhr nachts bei dir am Bett stehe und ich dich das abfrage musst du das, wie aus der Pistole geschossen, im Halbschlaf beantworten können ohne nachzudenken.' - Jeder Lateinlehrer"
  ];
  let getRndmQuote = quotes[Math.floor(Math.random() * quotes.length)];
  return <p id="quote">{getRndmQuote}</p>;
};

export class TeamMessage extends Component {
  render() {
    if (this.props.team.team !== undefined) {
      return (
        <div className={css.messageContainer}> 
          <strong>{this.props.team.team.message}</strong> 
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
