import React, { Component, Fragment } from "react";
import css from "../styles/home.module.scss";
import { withTranslation, Trans } from "react-i18next";
class Home extends Component {
  constructor() {
    super();
    this.featuresRef = React.createRef();
  }

  scroll(ref) {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    const { t } = this.props;

    return (
      <Fragment>
        <header className={css.showcase}>
          <div className={css.showcaseContent}>
            <div className="text-center p-2">
              <h1 className="l-heading">{t("home.showcase.title")}</h1>
              <p>{t("home.showcase.subtitle")}</p>
              <button
                style={{ WebkitAppearance: "none" }}
                onClick={() => {
                  this.scroll(this.featuresRef);
                }}
              >
                {t("home.showcase.btn")}
              </button>
            </div>
          </div>
        </header> 
        
        <section
          id="features"
          ref={this.featuresRef}
          className="p-2 text-center bg-light"
        >
          <div className="container">
            <h1 className="m-heading">
              <Trans i18nKey="home.features.title">
                <span className="text-primary"></span>
              </Trans>
            </h1>
            <div className={css.featuresList}>
              <div className={css.feature}>
                <h1 className="s-heading">{t("home.features.0.title")}</h1>
                <p>{t("home.features.0.text")}</p>
              </div>
              <div className={css.feature}>
                <h1 className="s-heading">{t("home.features.1.title")}</h1>
                <p>{t("home.features.1.text")}</p>
              </div>
              <div className={css.feature}>
                <h1 className="s-heading">{t("home.features.2.title")}</h1>
                <p>{t("home.features.2.text")}</p>
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
                  <Trans i18nKey="home.team.title">
                    <span className="text-primary">our</span> team
                  </Trans>
                </h1>
                <p>{t("home.team.text")}</p>
                <ul className={css.teamMembers}>
                  <li><a href="https://twitter.com/nielsdingsbums">{t("home.team.members.0")}</a></li>
                  <li><a href="https://www.instagram.com/anuzzz_senpai/">{t("home.team.members.1")}</a></li>
                  <li><a href="https://github.com/sanberksoysal">{t("home.team.members.2")}</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
      
    );
  }
}

export default withTranslation()(Home);
