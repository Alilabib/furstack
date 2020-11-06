import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNamespaces } from "react-i18next";
import styles from "./styles/job-list.module.scss";

class JobsList extends PureComponent {
  render() {
    const { headTitles, data } = this.props;
    console.warn(data);
    return (
      <div className={styles.job_list}>
        {data.map((job, index) => (
          <div className="card" key={job.id}>
            <div className="card-header">{job.title}</div>
            <div className="card-body">
              <h5 className="card-title">{job.active ? "Open" : "Close"}</h5>
              <p className="card-text"> {job.Addresses && job.Addresses.length && job.Addresses[0].Governorate > 0 ? job.Addresses[0].Governorate.name.en : "Not set"}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({});

export default connect((state) => state, mapDispatchToProps)(withNamespaces()(JobsList));
