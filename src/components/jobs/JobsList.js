import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNamespaces } from "react-i18next";
import { Tooltip } from "antd";
import {
  ArrowsAltOutlined,
  RedoOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import classnames from "classnames";
import { Button, Popup } from "semantic-ui-react";
import moment from "moment";
import postNote from "../../containers/Jobs/actions/postNote";
import styles from "./styles/job-list.module.scss";
import ReactTooltip from "react-tooltip";
const Actions = (props) => {
  const { items = [] } = props;
  const { postNote } = props;
  return (
    <div className={styles.cell_actions}>
      {items.map((item, index) => (
        <div
          key={index}
          className={classnames(styles.action, {
            [styles.red]: item.type === "red",
            [styles.orange]: item.type === "orange",
            [styles.blue]: item.type === "blue",
            [styles.black]: item.type === "black",
            [styles.disable]: item.type === "disable",
          })}
          onClick={item.action}
        >
          <item.Icon />
          <span>{item.title}</span>
        </div>
      ))}
    </div>
  );
};

class JobsList extends PureComponent {
  render() {
    const { headTitles, data, actions, jobId } = this.props;
    console.warn(data);
    return (
      <div className={styles.job_list}>
        {headTitles && (
          <div className={classnames(styles.row, styles.row_head)}>
            {headTitles.map((item, index) => (
              <div
                key={index}
                className={classnames(styles.cell, {
                  [styles.cell_size_2]: index === 0 || index === 4,
                  [styles.text_center]: index !== 0,
                })}
              >
                {item}
              </div>
            ))}
          </div>
        )}
        {data.map((job, index) => (
          <div key={job.id} className={classnames(styles.row)}
          >
            {[
              <span
                className={styles.job_title}
                onClick={() => {
                  actions.goToJobDetail(job.id);
                }}
              >
                {job.title}
              </span>,
              job.active ? "Open" : "Close",
              job.Addresses &&
              job.Addresses.length &&
              job.Addresses[0].Governorate > 0
                ? job.Addresses[0].Governorate.name.en
                : "Not set",
              moment(job.expected_hiring_date).format("ll"),
              job.PostUsers.length,
              job.note ? (
                <div>
                  <Popup
                    trigger={<span className={styles.note}>{job.note}</span>}
                    position="top left"
                    data-variation="huge"
                    data-variation="very wide"
                  style={{backgroundColor:'#4CAF50',
                marginBottom:'8px',
                border: 'none',
                color: 'white',
                padding: '15px 15px',
                textAlign: 'left',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '14px',
                cursor: 'pointer',
                borderRadius:'6px'
                }}
                  >
                    {" "}
                    {job.note}
                  </Popup>
                </div>
              ) : (
                <input
                  type="text"
                  placeholder="Type a note..."
                  className={styles.note1}
                  onBlur={(e) => {
                    this.props.noteaActions.postNote({
                      id: job.id,
                      note: e.target.value,
                    });
                  }}
                />
              ),
            ].map((item, index) => (
              <div
                key={index}
                className={classnames(styles.cell, {
                  [styles.open]: item === "Open",
                  [styles.close]: item === "Close",
                  [styles.cell_size_2]: index === 0 || index === 4,
                  [styles.text_overflow]: index === 0,
                  [styles.text_center]: index !== 0,
                })}
              >
                {item}
              </div>
            ))}
          </div>
        ))}
        {/* <div className={styles.pagination}>
              <div>
                <button>
                  <StepBackwardOutlined />
                </button>
                <button>
                  <CaretLeftOutlined />
                </button>
                <span>1 / 2</span>
                <button>
                  <CaretRightOutlined />
                </button>
                <button>
                  <StepForwardOutlined />
                </button>
              </div>
            </div> */}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  noteaActions: bindActionCreators({ postNote }, dispatch),
});

export default connect(
  (state) => state,
  mapDispatchToProps
)(withNamespaces()(JobsList));
