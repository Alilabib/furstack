import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNamespaces } from "react-i18next";
import { languageOptions } from "~configs/languageOptions";
import styles from "./styles/landing.module.scss";

// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

// Assets
import Logo from "~assets/imgs/logo_landing.svg";
import Signin from "~assets/imgs/landing/sign-in.svg";
import ArrowJobAvailable from "~assets/imgs/landing/arrow-jobavailable.svg";
import Mobile from "~assets/imgs/landing/iphone.svg";
import MobileAr from "~assets/imgs/landing/iphone-AR.svg";
import Card from "~assets/imgs/landing/Floating-card.svg";
import CardAr from "~assets/imgs/landing/Floating-card-AR.svg";
import HuaweiStore from "~assets/imgs/landing/huawei-app-store@2x.png";
import GooglePlay from "~assets/imgs/landing/googleplay-store@2x.png";
import AppStore from "~assets/imgs/landing/appstore@2x.png";
import Thumblike from "~assets/imgs/landing/thumb-like.svg";
import TitleUnderline from "~assets/imgs/landing/title-underline.svg";
import Flag from "~assets/imgs/landing/flag.png";

import Easytouse from "~assets/imgs/landing/easytouse.svg";
import SeeVideo from "~assets/imgs/landing/seevideo.svg";
import Clock from "~assets/imgs/landing/clock.svg";
import EffectiveFilter from "~assets/imgs/landing/effective-filter.svg";
import CoWorkers from "~assets/imgs/landing/co-workers.svg";
import Privacy from "~assets/imgs/landing/privacy.svg";
import PeopleLocation from "~assets/imgs/landing/people-location.svg";
import RedirectLink from "~assets/imgs/landing/redirect-link.svg";
import Rubber from "~assets/imgs/landing/rubber.svg";
import { setLocale } from "~helpers/locale/actions";

class Landing extends Component {
  // switch between arabic and english
  changeLang = (lang) => {
    const { languageActions } = this.props;
    languageActions.setLocale(lang);
  };

  render() {
    const { lang, t } = this.props;

    return (
      <div>
        <div className={styles.header}>
          {/* landing page head */}
          <div className={classnames(styles.head, styles.container)}>
            <a className={styles.log_in} href="/login">
              <img src={Signin} alt="signin-icon" /> {t("landing.header.login")}
            </a>

            {/* switch between langaues */}
            <span
              onClick={() => {
                if (lang === languageOptions[0].value) {
                  // if lang = eng
                  this.changeLang(languageOptions[1].value); // change to arabic
                } else {
                  this.changeLang(languageOptions[0].value); // else change to english
                }
              }}
            >
              {lang === "en"
                ? languageOptions[1].label
                : languageOptions[0].label}
            </span>

            {/* head logo */}
            <a href="/" className={styles.logo}>
              <img src={Logo} alt="logo" />
            </a>
          </div>

          {/* landing page presentation */}
          <div className={styles.presentation}>
            {/* left side */}
            <div className={styles.left}>
              {/* mobile shape */}
              {lang === "en" && (
                <div className={styles.mobile_wrapper}>
                  <img
                    src={Mobile}
                    className={styles.iphone}
                    alt="mobile wireframe"
                    data-aos="zoom-in"
                  />

                  <img
                    src={Card}
                    className={styles.card}
                    alt="mobile wireframe"
                    data-aos="slide-left"
                  />
                </div>
              )}

              {/* mobile shape */}
              {lang === "ar" && (
                <div className={styles.mobile_wrapper}>
                  <img
                    src={MobileAr}
                    className={styles.iphone}
                    alt="mobile wireframe"
                    data-aos="zoom-in"
                  />
                  <img
                    src={CardAr}
                    className={styles.card}
                    alt="mobile wireframe"
                    data-aos="slide-right"
                  />
                </div>
              )}

              {/* download our app */}
              <div className={styles.store_links}>
                <div className={styles.our_app_text}>
                  <span>
                    {t("landing.header.jobs_available")}{" "}
                    <img src={ArrowJobAvailable} alt="" />
                  </span>
                </div>

                <div className={styles.stores}>
                  <a href="#">
                    <img src={HuaweiStore} alt="huawei app store" />{" "}
                  </a>
                  <a href="#">
                    <img src={GooglePlay} alt="google play" />{" "}
                  </a>
                  <a href="#">
                    <img src={AppStore} alt="app store" />{" "}
                  </a>
                </div>
              </div>
            </div>

            {/* right side */}
            <div className={styles.right}>
              {lang === "en" && (
                <div className={styles.head_title_section}>
                  <h2 className={styles.head_title}>
                    Hire <span>{t("landing.header.title")}</span> with less time
                    <img src={Thumblike} alt="" />
                  </h2>
                  <img
                    className={styles.under_line}
                    src={TitleUnderline}
                    alt=""
                  />
                </div>
              )}
              {lang === "ar" && (
                <div className={styles.head_title_section}>
                  <h2 className={styles.head_title}>
                    {t("landing.header.title")}
                    <img src={Thumblike} alt="" />
                  </h2>
                  <img
                    className={styles.under_line}
                    src={TitleUnderline}
                    alt=""
                  />
                </div>
              )}
              <p className={styles.desc}>{t("landing.header.description")}</p>

              {/* start hiring button */}
              {lang === "en" && (
                <>
                  <Link to="/registration">
                    <button type="button" className={styles.create_account}>
                      {t("landing.header.button.create")}
                      <FontAwesomeIcon
                        className={styles.arrow}
                        icon={["fas", "arrow-right"]}
                      />
                    </button>
                  </Link>
                </>
              )}

              {lang === "en" && (
                <>
                  <Link to="/view">
                    <button type="button" className={styles.create_account}>
                      {t("landing.header.button.view")}
                      <FontAwesomeIcon
                        className={styles.arrow}
                        icon={["fas", "arrow-right"]}
                      />
                    </button>
                  </Link>
                  <Link to="/registration/plan" className={styles.price}>
                    {t("landing.header.button.sub_text")}
                  </Link>
                </>
              )}

              {lang === "ar" && (
                <>
                  <Link to="/registration">
                    <button type="button" className={styles.create_account}>
                      {t("landing.header.button.create")}
                      <FontAwesomeIcon
                        className={styles.arrow}
                        icon={["fas", "arrow-left"]}
                      />
                    </button>
                  </Link>

                  <Link to="/registration/plan" className={styles.price}>
                    {t("landing.header.button.sub_text")}
                  </Link>
                </>
              )}
            </div>

            {/* made with love in SA */}
            <div className={styles.made_with}>
              <img src={Flag} alt="hearth" />
              <div className={styles.text}>
                <p>{t("landing.header.made_with")}</p>
                <p>{t("landing.header.made_from")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* presentation video section */}
        <div className={styles.vidoSection}>
          <video controls>
            <source src="mov_bbb.mp4" type="video/mp4" />
            <source src="mov_bbb.ogg" type="video/ogg" />
            Your browser does not support HTML video.
          </video>
        </div>

        {/* partners section */}
        <div className={styles.partners}>
          <h2 className={styles.section_title}>
            {t("landing.section.title.trust")}
          </h2>
          <div className={classnames(styles.partner_list, styles.container)}>
            {[0, 0, 0, 0, 0, 0, 0, 0].map((item, index) => (
              <div className={styles.item} data-aos="flip-up">
                <img
                  src="https://cdn.vox-cdn.com/thumbor/VSSwGPlTwiV0AY5zL9Afu7KGpno=/0x28:640x388/1600x900/cdn.vox-cdn.com/assets/1311169/mslogo.jpg"
                  alt="partner image"
                />
              </div>
            ))}
          </div>
          {/* try out services button */}
          <Link to="/registration">
            <button type="button" className={styles.try_services}>
              {t("landing.section.title.try")}
              <FontAwesomeIcon
                className={styles.arrow}
                icon={["fas", "arrow-right"]}
              />
            </button>
          </Link>
        </div>

        {/* feautures section */}
        <div className={styles.features}>
          <h2 className={styles.section_title}>
            {t("landing.section.title.why")}
          </h2>
          <div className={classnames(styles.items)}>
            {[
              {
                title: t("landing.section.features.title.easy_to_use"),
                icon: Easytouse,
                description: t(
                  "landing.section.features.description.easy_to_use"
                ),
              },
              {
                title: t("landing.section.features.title.people_around"),
                icon: PeopleLocation,
                description: t(
                  "landing.section.features.description.people_around"
                ),
              },
              {
                title: t("landing.section.features.title.effictive"),
                icon: EffectiveFilter,
                description: t(
                  "landing.section.features.description.effictive"
                ),
              },
              {
                title: t("landing.section.features.title.privacy"),
                icon: Privacy,
                description: t("landing.section.features.description.privacy"),
              },
              {
                title: t("landing.section.features.title.interview"),
                icon: CoWorkers,
                description: t(
                  "landing.section.features.description.interview"
                ),
              },
            ].map((item, index) => (
              <div className={styles.item} key={index}>
                <div
                  className={styles.icon}
                  style={item.iconWrapperStyle || {}}
                >
                  <img src={item.icon} alt="feature" />
                </div>
                <p className={styles.item_title}>{item.title}</p>
                <p className={styles.desc}>{item.description}</p>
              </div>
            ))}

            <div className={styles.item}>
              <div>{t("landing.section.features.title.and_more")}</div>
            </div>
          </div>
        </div>

        {/* Footer section */}
        <div className={styles.footer}>
          <div className={styles.container}>
            {/* social media */}
            <div className={styles.copyright}>
              <div className={styles.right}>
                <div className={styles.social}>
                  <a href="#">
                    <div className={styles.socialItem}>
                      <FontAwesomeIcon icon={["fab", "snapchat-ghost"]} />
                    </div>
                  </a>
                  <a href="#">
                    <div className={styles.socialItem}>
                      <FontAwesomeIcon icon={["fab", "twitter"]} />
                    </div>
                  </a>
                  <a href="#">
                    <div className={styles.socialItem}>
                      <FontAwesomeIcon icon={["fab", "instagram"]} />
                    </div>
                  </a>
                  <a href="#">
                    <div className={styles.socialItem}>
                      <FontAwesomeIcon icon={["fab", "telegram-plane"]} />
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* logo */}
            <div className={styles.logo}>
              <img src={Logo} alt="logo" />
            </div>

            {/* about */}
            <div className={styles.about}>
              <p>{t("landing.footer.about")}</p>
              <h4>{t("landing.footer.vision_title")}</h4>
              <p>{t("landing.footer.vision")}</p>
            </div>
            <div className={styles.rubber}>
              <img src={Rubber} alt="rubber" />
            </div>
            <div className={styles.copyright}>
              <div className={styles.left}>
                <p>{t("landing.footer.copyright")}</p>
                <a href="#">{t("landing.footer.links.privacy")}</a>
                <a href="#">{t("landing.footer.links.terms")}</a>
                <a href="#">{t("landing.footer.links.faq")}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  lang: store.locale.lang,
});

const mapDispatchToProps = (dispatch) => ({
  languageActions: bindActionCreators({ setLocale }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(Landing));
