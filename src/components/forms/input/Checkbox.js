import React, { Component } from "react";
import { Checkbox as CheckboxAd } from "antd";
import styles from "./styles/input.module.scss";

export default class Checkbox extends Component {
  render() {
    const {
      label = "",
      onChange,
      value = [],
      options = [],
      afterLabel,
    } = this.props;
    return (
      <div className={styles.input_wrapper}>
        <p className={styles.label}>{label}</p>
        {afterLabel && (
          <span className={styles.addition_label}>{afterLabel()}</span>
        )}
        <div className={styles.checkbox}>
          <CheckboxAd.Group
            options={options}
            value={value}
            onChange={onChange}
          />
        </div>
        {/* <RadioAd.Group
          className={styles.radio}
          onChange={this.onChange}
          value={value}
        >
          {options.map((item) => (
            <RadioAd className={styles.item} value={item.value}>
              {item.label}
            </RadioAd>
          ))}
        </RadioAd.Group> */}
      </div>
    );
  }
}
