import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { show } from "redux-modal";
import { message as notify, Popover, Radio } from "antd";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import classnames from "classnames";
import { withNamespaces } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Scrollbars } from "react-custom-scrollbars";
import getPostDetails from "../Jobs/actions/getPostDetails";
// import {} from 'semantic-ui-react'
// Styles
import styles from "./styles/job-detail.module.scss";

// Components
import HeaderJobDetail from "~components/common/HeaderJobDetail";
import Categories from "~components/jobs/Categories";
import DetailHeader from "~components/jobs/DetailHeader";
import CandidateItem from "~components/jobs/CandidateItem";
import LoadingWrapper from "~components/common/LoadingWrapper";
import JobDetailContentUser from "~components/jobs/JobDetailContentUser";
import Comments from "~components/jobs/Comments";

// Actions
import getJobCandidate from "./actions/getJobCandidate";
import setJobDetailData from "./actions/setJobDetailData";
import getCandidateDetail from "./actions/getCandidateDetail";
import addComment from "./actions/addComment";
import getCandidateComments from "./actions/getCandidateComments";
import getJobsList from "./actions/getJobsList";
import AddCustomCategory from "./AddCustomCategory";
import getCustomCategories from "./actions/getCustomCategories";
import createCustomCategory from "./actions/createCustomCategory";
import stopPost from "./actions/stopPost";
import userMoveToCategory from "./actions/userMoveToCategory";
const queryString = require("query-string");

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);
let menu;
class JobDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      data: {},
      type: "",
      PostUserId: null,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      type: target.value,
    });
    this.handleGetCandidate(target.value);
  };

  handAddComment = (body) => {
    const { jobDetailActions } = this.props;
    const { PostUserId } = this.state;
    console.log(this.state);
    jobDetailActions.addComment({
      body,
      PostUserId,
    });
  };

  /* handle select one candidate under a job and fetches his data */
  handleSelecteCandidate = (candidate) => {
    const { jobDetailActions, jobDetailData, match } = this.props;
    this.setState({
      PostUserId: candidate.id,
    });
    jobDetailActions.getCandidateDetail({
      id: candidate.id,
      user_id: candidate.User?.id,
      job_id: match?.params?.id,
    });

    jobDetailActions.getCandidateComments({
      PostUserId: candidate.id,
    });
  };

  /* handles pick one job and fetches its data */
  handleGetCandidate = (sortBy) => {
    const { jobDetailActions, match } = this.props;

    const searchParams = queryString.parse(window.location.search);
    const data = { job_id: match?.params?.id };

    if (searchParams.qualified !== undefined) {
      try {
        data.qualified = JSON.parse(searchParams.qualified);
      } catch (error) {
        data.qualified = true;
      }
    }

    if (searchParams.category !== undefined) {
      data.folder = searchParams.category.toLowerCase();
    }
    if (sortBy) data.sortBy = sortBy;
    jobDetailActions.getJobCandidate(data);
  };

  /* handle add a category for candidates */
  handleAddcategory = () => {
    const { modalActions } = this.props;
    modalActions.show("addCustomCategory");
  };

  /* handle select users */
  handleCheckAllUser = () => {
    const { jobDetailData, jobCandidate, jobDetailActions } = this.props;
    const isAllSelected = jobDetailData.checkedUsers.length === jobCandidate.length;

    if (isAllSelected) {
      jobDetailActions.setJobDetailData({
        ...jobDetailData,
        checkedUsers: [],
      });
    } else {
      jobDetailActions.setJobDetailData({
        ...jobDetailData,
        checkedUsers: jobCandidate.map((item) => item.id),
      });
    }
  };

  /* handle change user data after select another candidate */
  handleChangeCheckdUser = (user) => {
    const { jobDetailData, jobDetailActions } = this.props;

    const data = jobDetailData.checkedUsers ? jobDetailData.checkedUsers.slice() : [];
    const dataId = data.map((item) => item.id);
    const findItem = dataId.indexOf(user.id);

    if (findItem === -1) {
      data.push(user);
    } else {
      data.splice(findItem, 1);
    }

    jobDetailActions.setJobDetailData({
      ...jobDetailData,
      checkedUsers: data,
    });
  };

  /* handle move a user to a list */
  handleMoveUserToCategory = (folder = {}) => {
    const { match, jobDetailData, jobDetailActions } = this.props;
    const userIds = jobDetailData.checkedUsers ? jobDetailData.checkedUsers.map((item) => item.id) : [];
    const data = {
      users_id: userIds,
      job_id: match?.params?.id,
      folder: folder.folder.toLowerCase(),
      folder_type: folder.folder_type,
    };

    jobDetailActions.userMoveToCategory(data, {
      success: (response) => {
        const { message } = response;
        this.handleGetCandidate();
        jobDetailActions.setJobDetailData({
          ...jobDetailData,
          checkedUsers: [],
        });
        notify.success(message);
      },
      fail: (response) => {
        const { message } = response;
        notify.error(message);
      },
    });
  };

  componentDidMount() {
    const { jobsActions, jobDetailActions, match, postActions, company, history } = this.props;
    this.handleGetCandidate();
    jobsActions.getJobsList();
    jobDetailActions.getCustomCategories({ job_id: match?.params?.id });
    this.getJobsData(match, postActions, jobDetailActions, company, history);
  }

  componentWillUnmount() {
    const { jobDetailActions, jobDetailData } = this.props;
    jobDetailActions.setJobDetailData({
      ...jobDetailData,
      selectedUser: null,
    });
  }

  getJobsData = async (match, postActions, jobDetailActions, company, history) => {
    await postActions.getPostDetails(match?.params?.id, {
      success: (response) => {
        const { message, data } = response;
        console.log("=====================================================");
        console.log(data);
        console.log("=====================================================");
        console.log(company);
        if (data && company.id !== data.CompanyId) history.push("/dashboard");
        jobDetailActions.setJobDetailData({
          data,
        });
      },
      fail: (response) => {
        const { message } = response;
        console.log(message);
      },
    });
  };

  render() {
    const {
      jobDetailActions,
      isLoadingJobCandidate,
      jobCandidate = [],
      jobDetailData,
      isLoadingCandidateDetail,
      jobsList,
      isLoadingCustomCategories,
      customCategories,
      match,
      t,
    } = this.props;
    const { search } = this.state;

    const jobId = match?.params?.id;

    return (
      <div>
        <HeaderJobDetail data={jobsList} jobId={match?.params?.id} postId={match?.params?.id} postDetails={this.state.data} />
        <LoadingWrapper isLoading={isLoadingJobCandidate}>
          <DetailHeader
            selected={jobDetailData.selectedUser}
            checkedUsers={jobDetailData.checkedUsers}
            customCategories={customCategories}
            onMoveUserToCategory={this.handleMoveUserToCategory}
            jobCandidate={jobCandidate}
          />
          <div className={styles.container}>
            {/* <Categories
              isLoading={isLoadingCustomCategories}
              data={customCategories}
              onAddCategory={this.handleAddcategory}
            /> */}
            <div className={styles.board}>
              <div className={styles.board_content}>
                <div className={styles.left_side}>
                  <div className={styles.search}>
                    {!!(jobDetailData.checkedUsers && jobDetailData.checkedUsers.length) && (
                      <div className={styles.selected_all}>
                        <button type="button" onClick={this.handleCheckAllUser}>
                          {!!(jobDetailData.checkedUsers.length === jobCandidate.length) ? "Deselect all" : "Select all"}
                        </button>
                      </div>
                    )}

                    {/* Search bar */}
                    <div className={styles.search_wrapper}>
                      <input
                        type="search"
                        placeholder={t("job.search")}
                        value={search}
                        onChange={({ target }) => {
                          this.setState({
                            search: target.value,
                          });
                        }}
                      />
                      <button className={styles.saerch_btn}>
                        <FontAwesomeIcon icon={["fas", "search"]} />
                      </button>
                    </div>
                  </div>

                  {/* filter and sort */}
                  <div className={styles.filter_sort}>
                    {/* <Popover trigger="click" content={content}>
                      <span className="">
                        <FontAwesomeIcon icon={["fas", "sort-alpha-down"]} />
                        Sort
                      </span>
                    </Popover> */}
                    <Dropdown
                      overlay={
                        <Menu>
                          <Menu.Item>
                            <label>
                              <input type="radio" value="DESC" checked={this.state.type === "DESC"} onChange={this.handleChange} style={{ marginRight: "6px" }} />
                              New to Old
                            </label>
                          </Menu.Item>
                          <Menu.Item>
                            <label>
                              <input type="radio" value="ASC" checked={this.state.type === "ASC"} onChange={this.handleChange} style={{ marginRight: "6px" }} />
                              Old to New
                            </label>
                          </Menu.Item>
                          <Menu.Item>
                            <label>
                              <input
                                type="radio"
                                value="NearByDammamFirst"
                                checked={this.state.type === "NearByDammamFirst"}
                                onChange={this.handleChange}
                                style={{ marginRight: "6px" }}
                              />
                              Near ByDammam First
                            </label>
                          </Menu.Item>
                          <Menu.Item>
                            <label>
                              <input type="radio" value="isReaded" checked={this.state.type === "isReaded"} onChange={this.handleChange} style={{ marginRight: "6px" }} />
                              Unread First
                            </label>
                          </Menu.Item>
                          <Menu.Item>
                            <label>
                              <input type="radio" value="isCommented" checked={this.state.type === "isCommented"} onChange={this.handleChange} style={{ marginRight: "6px" }} />
                              With Comments First
                            </label>
                          </Menu.Item>
                        </Menu>
                      }
                      trigger={["click"]}
                    >
                      <span className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                        <FontAwesomeIcon icon={["fas", "sort-alpha-down"]} />
                        Sort
                      </span>
                      {/* <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
      Hover me <DownOutlined />
    </a> */}
                    </Dropdown>
                    {/* ,
                    <span className={styles.filter}>
                      {" "}
                      <FontAwesomeIcon icon={["fas", "filter"]} />
                      Filter
                    </span> */}

                    <Dropdown
                      overlay={
                        <Menu style={{ width: "900px" }}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              color: "#0091FF",
                              marginTop: "5px",
                              justifyContent: "center",
                            }}
                          >
                            <FontAwesomeIcon icon={["fas", "filter"]} className="mt-1 mr-1" />
                            <p>Anyone doesn't match filtration requirements, will be auto-rejected</p>
                          </div>
                          <div className="ml-3 mb-2">
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <div
                                style={{
                                  width: "25%",
                                  border: "1px solid #CFD3D5",
                                  padding: "1px 5px",
                                }}
                              >
                                Working Status
                              </div>
                              <label
                                style={{
                                  width: "20%",
                                  textAlign: "center",
                                  textAlign: "center",
                                }}
                              >
                                Is
                              </label>
                              <select
                                class="ui dropdown ml-2"
                                style={{
                                  width: "130px",
                                  border: "1px solid #CFD3D5",
                                }}
                              >
                                <option value="">Gender</option>
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                              </select>
                              <label style={{ width: "20%", textAlign: "center" }}>Is</label>
                              <select
                                class="ui dropdown ml-2"
                                style={{
                                  width: "130px",
                                  border: "1px solid #CFD3D5",
                                }}
                              >
                                <option value="">Gender</option>
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                              </select>
                            </div>
                          </div>
                          <div className="ml-3 mb-2">
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <div
                                style={{
                                  width: "25%",
                                  border: "1px solid #CFD3D5",
                                  padding: "1px 5px",
                                }}
                              >
                                Age
                              </div>
                              <label style={{ width: "20%", textAlign: "center" }}>Is between</label>

                              <select
                                class="ui dropdown ml-2"
                                style={{
                                  width: "130px",
                                  border: "1px solid #CFD3D5",
                                }}
                              >
                                <option value="">Gender</option>
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                              </select>
                              <label style={{ width: "20%", textAlign: "center" }}>Is between</label>
                              <select
                                class="ui dropdown ml-2"
                                style={{
                                  width: "130px",
                                  border: "1px solid #CFD3D5",
                                }}
                              >
                                <option value="">Gender</option>
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                              </select>
                            </div>
                          </div>
                          <div className="ml-3 mb-2">
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <div
                                style={{
                                  width: "25%",
                                  border: "1px solid #CFD3D5",
                                  padding: "1px 5px",
                                }}
                              >
                                Gender
                              </div>
                              <label style={{ width: "20%", textAlign: "center" }}>Is</label>
                              <select
                                class="ui dropdown ml-2"
                                style={{
                                  width: "130px",
                                  border: "1px solid #CFD3D5",
                                }}
                              >
                                <option value="">Gender</option>
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                              </select>
                              <label style={{ width: "20%", textAlign: "center" }}>Is between</label>
                              <select
                                class="ui dropdown ml-2"
                                style={{
                                  width: "130px",
                                  border: "1px solid #CFD3D5",
                                }}
                              >
                                <option value="">Gender</option>
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                              </select>
                            </div>
                          </div>
                          <div className="ml-3 mb-2">
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <div
                                style={{
                                  width: "25%",
                                  border: "1px solid #CFD3D5",
                                  padding: "1px 5px",
                                }}
                              >
                                Nationality
                              </div>
                              <label style={{ width: "20%", textAlign: "center" }}>Is</label>
                              <select
                                class="ui dropdown ml-2"
                                style={{
                                  width: "130px",
                                  border: "1px solid #CFD3D5",
                                }}
                              >
                                <option value="">Saudi</option>
                                <option value="1">Non-Saudi</option>
                              </select>
                              <label style={{ width: "20%", textAlign: "center" }}>Is between</label>
                              <select
                                class="ui dropdown ml-2"
                                style={{
                                  width: "130px",
                                  border: "1px solid #CFD3D5",
                                }}
                              >
                                <option value="">Saudi</option>
                                <option value="1">Non-Saudi</option>
                              </select>
                            </div>
                          </div>
                          <div className="ml-3 mb-2">
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <div
                                style={{
                                  width: "25%",
                                  border: "1px solid #CFD3D5",
                                  padding: "1px 5px",
                                }}
                              >
                                Level Of Experience
                              </div>
                              <label style={{ width: "20%", textAlign: "center" }}>Is</label>
                              <select
                                class="ui dropdown ml-2"
                                style={{
                                  width: "130px",
                                  border: "1px solid #CFD3D5",
                                }}
                              >
                                <option value="">Fresh Graduate</option>
                                <option value="1">1-2 years</option>
                                <option value="0">3-5 years</option>
                                <option value="0"> 6-10 years</option>
                                <option value="0"> +10 years</option>
                              </select>
                              <label style={{ width: "20%", textAlign: "center" }}>Is between</label>
                              <select
                                class="ui dropdown ml-2"
                                style={{
                                  width: "130px",
                                  border: "1px solid #CFD3D5",
                                }}
                              >
                                <option value="">Fresh Graduate</option>
                                <option value="1">1-2 years</option>
                                <option value="0">3-5 years</option>
                                <option value="0"> 6-10 years</option>
                                <option value="0"> +10 years</option>
                              </select>
                            </div>
                          </div>

                          <div className="ml-3 mb-2">
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <div
                                style={{
                                  width: "25%",
                                  border: "1px solid #CFD3D5",
                                  padding: "1px 5px",
                                }}
                              >
                                Graduation Date
                              </div>
                              <label style={{ width: "20%", textAlign: "center" }}>Is minimum</label>
                              <select
                                class="ui dropdown ml-2"
                                style={{
                                  width: "130px",
                                  border: "1px solid #CFD3D5",
                                }}
                              >
                                <option value="">Gender</option>
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                              </select>
                              <label style={{ width: "20%", textAlign: "center" }}>Is between</label>
                              <select
                                class="ui dropdown ml-2"
                                style={{
                                  width: "130px",
                                  border: "1px solid #CFD3D5",
                                }}
                              >
                                <option value="">Gender</option>
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                              </select>
                            </div>
                          </div>

                          <div className="ml-3 mb-2">
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <div
                                style={{
                                  width: "25%",
                                  border: "1px solid #CFD3D5",
                                  padding: "1px 5px",
                                }}
                              >
                                Working Status
                              </div>
                              <label style={{ width: "20%", textAlign: "center" }}>Is between</label>
                              <select
                                class="ui dropdown ml-2"
                                style={{
                                  width: "130px",
                                  border: "1px solid #CFD3D5",
                                }}
                              >
                                <option value="">Gender</option>
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                              </select>
                              <label style={{ width: "20%", textAlign: "center" }}>Is between</label>
                              <select
                                class="ui dropdown ml-2"
                                style={{
                                  width: "130px",
                                  border: "1px solid #CFD3D5",
                                }}
                              >
                                <option value="">Gender</option>
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                              </select>
                            </div>
                          </div>
                        </Menu>
                      }
                      trigger={["click"]}
                    >
                      <span className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                        <FontAwesomeIcon icon={["fas", "filter"]} />
                        Filter
                      </span>
                      {/* <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
      Hover me <DownOutlined />
    </a> */}
                    </Dropdown>

                    <span className={styles.passed}>Passed</span>
                  </div>

                  <Scrollbars autoHide>
                    {/* job candidates */}
                    {jobCandidate
                      .filter(({ User }) => User.name.indexOf(search) !== -1)
                      .map((item) => (
                        <CandidateItem
                          key={item.id}
                          item={item}
                          checkedUsers={jobDetailData.checkedUsers}
                          selected={jobDetailData.selectedUser}
                          onSelect={this.handleSelecteCandidate}
                          onCheckUser={this.handleChangeCheckdUser}
                        />
                      ))}
                  </Scrollbars>
                </div>

                <JobDetailContentUser isLoading={isLoadingCandidateDetail} selected={jobDetailData.selectedUser} candidatesNumber={jobCandidate} />

                {/* <JobDetailContentUser isLoading={isLoadingCandidateDetail} selected={jobDetailData.selectedUser} candidatesNumber={jobCandidate} /> */}

                <Comments addComment={this.handAddComment} comments={jobDetailData.comments} isSelected={jobDetailData.selectedUser} />
              </div>
            </div>
          </div>
        </LoadingWrapper>
        {/* <AddCustomCategory
          jobId={jobId}
          submitCb={() => {
            // TODO: categories call
            // this.handleGetCandidate();
            jobDetailActions.getCustomCategories({ job_id: jobId });
          }}
        /> */}
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  isLoadingJobCandidate: store.jobs.isLoadingJobCandidate,
  isLoadingCandidateDetail: store.jobs.isLoadingCandidateDetail,
  jobCandidate: store.jobs.jobCandidate,
  jobDetailData: store.jobs.jobDetailData,
  company: store.auth.user.Company,
  jobsList: store.jobs.jobsList,

  isLoadingCustomCategories: store.jobs.isLoadingCustomCategories,
  customCategories: store.jobs.customCategories,
});

const mapDispatchToProps = (dispatch) => ({
  jobDetailActions: bindActionCreators(
    {
      getJobCandidate,
      setJobDetailData,
      getCandidateDetail,
      addComment,
      getCustomCategories,
      userMoveToCategory,
      getCandidateComments,
    },
    dispatch
  ),
  jobsActions: bindActionCreators({ getJobsList }, dispatch),
  modalActions: bindActionCreators({ show }, dispatch),
  postActions: bindActionCreators({ getPostDetails }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(JobDetail));
