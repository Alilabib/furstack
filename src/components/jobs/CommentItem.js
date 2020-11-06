import React, { PureComponent } from "react";
import classnames from "classnames";
import styles from "./styles/candidate.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Person from "../../assets/imgs/person.png";

export default class CommentItem extends PureComponent {
  render() {
    const { comment = {} } = this.props;
    return (
      // <div className={styles.item}>
      //   <div className={styles.wrapper}>
      //     <div className={styles.info}>
      //       {/* <p className={styles.date}>Today</p> */}
      //       <p className={styles.name}>{comment.body}</p>
      //     </div>
      //     <div className={styles.actions}></div>
      //   </div>
      // </div>
      // <div style={{display:'flex',flexDirection:'column'}}>
      <div style={{ diplay: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row" }} className="ml-3 mt-3 mb-3">
          <div>
            <img src={Person} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }} className="ml-2">
            {/* <span style={{ fontSize: "12px", fontWeight: "bold" }}>{comment.PostUser.User.name}</span> */}
            <span style={{ fontSize: "12px" }}>12 days ago </span>
          </div>
        </div>
        <p className="ml-5">{comment.body}</p>
      </div>

      // </div>
    );
  }
}
