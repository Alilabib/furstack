import React, { Component } from "react";
import styles from "./styles/header.module.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNamespaces } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import UserPlanText from "./UserPlanText";
import moment from "moment";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Progress } from "antd";
import "./styles/header.module.scss";
import Career from '../../assets/imgs/carreer.png'
// Assets
import LogoWhiteBlue from "~assets/imgs/logo_white_blue.svg";
import GiftIcon from "~assets/imgs/gift.svg";

// Actions
import logout from "../../containers/Auth/actions/logout";

const LoginView = ({ actions, userData, t, history }) => {
  const isProUser = userData.Company?.plan;
  const startPlan = moment(userData.Company?.plan_started_at);
  const endPlan = moment(userData.Company?.plan_finished_at);

  const daysLeft = endPlan.diff(moment(), "days")+1;

  const goToPay = () => {
    history.push("/registration/plan");
  };

  return (
    <div className={styles.actions}>
      <div
        className={styles.plan_wrapper}
        onClick={() => {
          if (!isProUser) goToPay();
        }}>
        <FontAwesomeIcon icon={["fas", "infinity"]} /> <span>Unlimited Posts</span>

        <Progress
          className={styles.progressBar}
          percent={(100 / 14) * daysLeft}
          status='normal'
          showInfo={false}
        />
        <div className={styles.days_left}>{daysLeft} Days left</div>
      </div>
      <div>
      <img src={Career} alt="Career" style={{marginLeft:'50px'}}/> 
        <div style={{fontSize:'15px'}}>Your Career Page</div>
      </div>
      <div className={styles.signOut} onClick={actions.logout }>
        <FontAwesomeIcon icon={["fas", "sign-out-alt"]} />
        <div>Logout</div>
      </div>

      <div className={styles.settings}>
        <Link to='/settings'>
          <FontAwesomeIcon icon={["fas", "cog"]} />
          <div>Settings</div>
        </Link>
      </div>
    </div>
  );
};

class HeaderDark extends Component {
  logout = e => {
    const { userActions,history } = this.props;
    e.preventDefault();
    history.push("/login");
    userActions.logout();
  };

  render() {
    const { userData, t, history } = this.props;
    const hasRegistration = window.location.pathname.indexOf("/registration") !== -1;

    return (
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo_container}>
            <Link to={userData?'/dashboard':"/"} className={styles.logo}>
              <img src={LogoWhiteBlue} alt='logo' />
            </Link>
          </div>
          <div className={styles.nav_container}>
            {userData ? (
              <div>
              <LoginView
                userData={userData}
                actions={{
                  logout: this.logout
                }}
                t={t}
                history={history}
              />
              </div>
            ) : (
              <div>
                {!userData && (
                  <span className={styles.spec_text}>
                    {/* Registration is coming soon */}
                    {hasRegistration
                      ? t("header.have_account")
                      : t("heder.dont_have_account")}
                  </span>
                )}
                <NavLink
                  className={styles.button_nav}
                  to={hasRegistration ? "/login" : "/registration"}>
                  {hasRegistration ? t("header.login") : t("header.registration")}
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  userData: store.auth.user
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators({ logout }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withNamespaces()(HeaderDark)));
