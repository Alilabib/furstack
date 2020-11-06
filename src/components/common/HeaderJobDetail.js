import React, { Component } from "react";
import styles from "./styles/header.module.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import stopImage from "~assets/imgs/Path 560.png";
import repostImage from "../../assets/imgs/Path 562.png";
import editImage from "../../assets/imgs/Icon feather-edit.png";
import shareLink from "../../assets/imgs/Path 561.png";
import AppGallery from "../../assets/imgs/AppGallery.png";
import GooglePlay from "../../assets/imgs/Google Play.png";
import AppStore from "../../assets/imgs/App Store.png";
import Copy from "../../assets/imgs/copy.png";
import QrCode from "../../assets/imgs/qrcode.png";

import { message as notify } from "antd";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import history from "../../history";
import { AuditOutlined, MailOutlined, DownOutlined, RedoOutlined, FormOutlined, UploadOutlined, ShareAltOutlined } from "@ant-design/icons";

// Assets
import Logo from "~assets/imgs/logo_white_blue.svg";

// Actions
import logout from "../../containers/Auth/actions/logout";
import { Dropdown, Button, Menu, Tooltip, Switch } from "antd";
import stopPost from "../../containers/Jobs/actions/stopPost";

const Actions = (props) => {
  const { items = [] } = props;
  return (
    <div className={styles.cell_actions}>
      {items.map((item, index) => (
        <Tooltip title={item.title}>
          <span className={styles.action} onClick={item.action}>
            <item.Icon />
          </span>
        </Tooltip>
      ))}
    </div>
  );
};

const jobList = (data, jobId) => (
  <Menu>
    {data
      .filter((item) => item.id !== parseInt(jobId))
      .map((item) => (
        <Menu.Item key={item.id}>
          <a rel="noopener noreferrer" href={window.location.origin + "/job/detail/" + item.id}>
            {item.title}
          </a>
        </Menu.Item>
      ))}
  </Menu>
);

class HeaderJobDetail extends Component {
  logout = (e) => {
    const { userActions } = this.props;
    e.preventDefault();
    userActions.logout();
  };

  render() {
    const { data, jobId } = this.props;
    return (
      <div className={classnames(styles.header, styles.white)}>
        <div className={styles.container}>
          <div className={styles.logo_container}>
            <a href="/" className={styles.logo}>
              <img src={Logo} alt="logo" />
            </a>
          </div>
          <div className={styles.nav_container}>
            {/* <div className={styles.section_toggle}>
              <div className={classnames(styles.section_item, styles.active)}>
                <span className={styles.icon}>
                  <AuditOutlined />
                </span>
                <span>Applications</span>
              </div>
              <div className={styles.section_item}>
                <span className={styles.icon}>
                  <MailOutlined />
                </span>
                Mail (3)
              </div>
            </div> */}

            <div className={styles.job_selection}>
              <Dropdown overlay={jobList(data, jobId)} placement="bottomLeft" trigger={["click"]}>
                {/* <Button>bottomLeft</Button> */}
                <div className={styles.dropdown}>
                  <span>{data.filter((item) => item.id === parseInt(jobId))[0]?.title}</span>
                  <span className={styles.dropdown_icon}>
                    <DownOutlined />
                  </span>
                </div>
              </Dropdown>
            </div>
            <div className={styles.alloptions}>
              <Popup
                trigger={
                  <button className={styles.containerOption}>
                    <img src={shareLink} alt="shareLink" style={{ width: "16px", height: "17px" }} className={styles.iconstyle} />

                    <span className={styles.spanoption}>Share apply link</span>
                  </button>
                }
                position="right center"
                modal
                nested
              >
                <div className="d-flex m-5" style={{ flexDirection: "row" }}>
                  <div
                    style={{
                      backgroundColor: "#707070",
                      color: "#fff",
                      width: "40px",
                      height: "40px",
                      textAlign: "center",
                      borderRadius: "8px",
                    }}
                  >
                    <h3 style={{ color: "#fff" }}>1</h3>
                  </div>
                  <span
                    style={{
                      color: "#707070",
                      marginLeft: "10px",
                      marginTop: "5px",
                    }}
                  >
                    Download "Fursatak" App
                  </span>
                </div>

                <div
                  className="d-flex mb-5 mt-5"
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <a href="https://play.google.com/store/apps/details?id=io.swvl.customer" target="blank">
                    <img src={AppGallery} alt="AppGallery" style={{ marginLeft: "11%" }} />
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=io.swvl.customer" target="blank">
                    <img src={GooglePlay} alt="GooglePlay" />
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=io.swvl.customer" target="blank">
                    <img src={AppStore} alt="AppGallery" />
                  </a>
                </div>
                <div className="d-flex m-5" style={{ flexDirection: "row" }}>
                  <div
                    style={{
                      backgroundColor: "#707070",
                      color: "#fff",
                      width: "40px",
                      height: "40px",
                      textAlign: "center",
                      borderRadius: "8px",
                    }}
                  >
                    <h3 style={{ color: "#fff" }}>1</h3>
                  </div>
                  <span
                    style={{
                      color: "#707070",
                      marginLeft: "10px",
                      marginTop: "5px",
                    }}
                  >
                    Enter this link
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <input
                    placeholder="https..//fursatak.app"
                    className={styles.fursatak}
                    id="myInput"
                    style={{
                      width: "50%",
                      backgroundColor: "#F7F8F8",
                      borderRadius: "15px",
                      padding: "8px 12px",
                      border: "none",
                      marginRight: "12%",
                    }}
                  />
                  <Link>
                    <div style={{ display: "flex" }}>
                      <img src={Copy} alt="Copy" />

                      <span style={{ textDecoration: "none", color: "#333", marginLeft: "6px", fontWeight: "bold" }}>Copy</span>
                    </div>
                  </Link>
                </div>
                <div className="text-center mt-3">
                  <img src={QrCode} alt="QrCode" />
                </div>
              </Popup>

              <Link to={"/jobs/edit/" + jobId}>
                <button className={styles.containerOption}>
                  <img src={editImage} alt="editimage" style={{ width: "16px", height: "17px" }} className={styles.iconstyle} />
                  <span className={styles.spanoption}>Edit post</span>
                </button>
              </Link>
              <Link to={"/jobs/repost/" + jobId}>
                <button className={styles.containerOption}>
                  <img src={repostImage} alt="repostimage" style={{ width: "16px", height: "17px" }} className={styles.iconstyle} />
                  <span className={styles.spanoption}>Re-post</span>
                </button>
              </Link>
              <button
                className={styles.containerOption}
                onClick={() => {
                  this.props.userActions.stopPost(
                    {
                      id: jobId,
                    },
                    {
                      success: (response) => {
                        const { message } = response;
                        notify.success(message);
                      },
                      fail: (response) => {
                        const { message } = response;
                        notify.error(message);
                      },
                    }
                  );
                }}
              >
                <img src={stopImage} alt="stopimage" style={{ width: "16px", height: "17px" }} className={styles.iconstyle} />
                {/* <img src={editImage} alt="stop image"/> */}
                <span className={styles.stopspan}>Stop</span>
              </button>
            </div>

            {/* <div className={styles.actions}>
              <Actions
                items={[
                  {
                    title: 'Re-post',
                    Icon: RedoOutlined,
                    action: () => {},
                  },
                  {
                    title: 'Edit',
                    Icon: FormOutlined,
                    action: () => {},
                  },
                  {
                    title: 'Share',
                    Icon: ShareAltOutlined,
                    action: () => {},
                  },
                ]}
              />
            </div> */}
            {/* <div className={styles.post_status}>
              <span>Post status</span>
              <div>
                <Switch
                  checkedChildren="On"
                  unCheckedChildren="Off"
                  defaultChecked
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  userData: store.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators({ logout, stopPost }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderJobDetail);
