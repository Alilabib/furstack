import React, { PureComponent } from "react";
import { Tooltip } from "antd";
import {
  ArrowsAltOutlined,
  RedoOutlined,
  FormOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import classnames from "classnames";
import moment from "moment";

import styles from "./styles/job-list.module.scss";

const Actions = props => {
  const { items = [] } = props;
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
            [styles.disable]: item.type === "disable"
          })}
          onClick={item.action}>
          <item.Icon />
          <span>{item.title}</span>
        </div>
      ))}
    </div>
  );
};

export default class JobsList extends PureComponent {
  render() {
    const { headTitles, data, actions } = this.props;

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
                  [styles.text_center]: index !== 0
                })}>
                {item}
              </div>
            ))}
          </div>
        )}
        {data.map((job, index) => (
          <div key={job.id} className={classnames(styles.row)}>
            {[
              <span
                className={styles.job_title}
                onClick={() => {
                  actions.goToJobDetail(job.id);
                }}>
                {job.title}
              </span>,
              job.active ? "Open" : "Close",
              job.Addresses && job.Addresses.length > 0
                ? job.Addresses[0].Governorate.name.en
                : "Not set",
              moment(job.expected_hiring_date).format("ll"),
              job.PostUsers.length,
              <input type='text' placeholder='Type a note...' />
            ].map((item, index) => (
              <div
                key={index}
                className={classnames(styles.cell, {
                  [styles.open]: item === "Open",
                  [styles.close]: item === "Close",
                  [styles.cell_size_2]: index === 0 || index === 4,
                  [styles.text_overflow]: index === 0,
                  [styles.text_center]: index !== 0
                })}>
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
