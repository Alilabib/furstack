import React, { PureComponent } from "react";
import classnames from "classnames";
import styles from "./styles/candidate.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class CommentItem extends PureComponent {
  
  render() {
    const { comment={} } = this.props;
    return (
      <div className={styles.item}>
        <div className={styles.wrapper}>
          <div className={styles.info}>
            {/* <p className={styles.date}>Today</p> */}
            <p className={styles.name}>{comment.body}</p>
          </div>
          <div className={styles.actions}></div>
        </div>
      </div>
    );
  }
}
