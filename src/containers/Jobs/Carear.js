import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNamespaces } from "react-i18next";
import { message as notifi } from "antd";

import styles from "./styles/job.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components
import JobsList from "~components/jobs/carearList";
import getCarearList from "./actions/getCarearList";
import LoadingWrapper from "~components/common/LoadingWrapper";
import { WelcomeUser } from "~components/user";
import Noavatar from "~assets/imgs/company_noavatar.svg";
import VerifyIcon from "~assets/imgs/verify_user.svg";

class Job extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.getCarearList(id);
  }

  getCarearList = async (id) => {
    const { jobsActions } = this.props;
    await jobsActions.getCarearList(id, {
      success: (response) => {
        const { message, data } = response;
      },
      fail: (response) => {
        const { message } = response;
        notifi.error(message);
      },
    });
  };

  getJobsNext = async (page) => {
    const { jobsActions, match } = this.props;
    await jobsActions.getCarearList(match.params.id, {
      success: (response) => {
        const { message, data } = response;
      },
      fail: (response) => {
        const { message } = response;
        notifi.error(message);
      },
    });
  };

  render() {
    const { jobsListLoading, jobsList, jobsCount, t, userData } = this.props;
    const companyData = userData?.Company;
    return (
      <div className={styles.jobsListPage}>
        {/* company data and welcome user */}
        <div className={styles.company_wrapper}>
          <div className={styles.company_logo}>
            {companyData?.logo_path ? <img src={companyData.logo_path} alt="company logo" /> : <img src={Noavatar} alt="company logo" className={styles.noavatar} />}
          </div>
          <p className={styles.company_name}>
            {companyData?.verified && <img src={VerifyIcon} alt="verify-user" />}
            {companyData?.name}
          </p>
          <WelcomeUser user={userData} />
        </div>

        {/* jobs list */}
        <div className={styles.container}>
          <LoadingWrapper isLoading={jobsListLoading}>
            <JobsList data={jobsList} />
          </LoadingWrapper>
        </div>

        <div className={styles.dashboard_footer}>
          <div className={styles.left}>
            <span className={styles.youtube}>
              <FontAwesomeIcon className={styles.arrow} icon={["fab", "youtube"]} />
              <span>Larn how to use the website</span>
            </span>
          </div>
          <div className={styles.right}>
            <span className={styles.email}>
              <FontAwesomeIcon className={styles.arrow} icon={["fas", "envelope"]} />
              <span>info@fursatak.app</span>
            </span>

            <span className={styles.phone}>
              <FontAwesomeIcon className={styles.arrow} icon={["fas", "phone-alt"]} />
              <span>0503117234</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  userData: store.auth.user,
  jobsListLoading: store.jobs.jobsListLoading,
  jobsList: store.jobs.jobsList,
  jobsCount: store.jobs.jobsCount,
});

const mapDispatchToProps = (dispatch) => ({
  jobsActions: bindActionCreators({ getCarearList }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(Job));
