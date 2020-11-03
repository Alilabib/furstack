import React, { Component } from 'react';
import { Input as InputAd } from 'antd';
import styles from './styles/input.module.scss';
import classnames from 'classnames';

const { TextArea } = InputAd;

export default class Input extends Component {
  render() {
    const {
      placeholder = 'Placeholder',
      label = '',
      afterLabel,
      onChange,
      value = '',
      type = 'text',
      textarea,
      disabled,
      pre,
    } = this.props;
    return (
      <div className={styles.input_wrapper}>
        <p
          className={classnames(styles.label, {
            [styles.labelShow]: value.length > 0,
          })}
        >
          {label}
        </p>
        {/*
        {afterLabel && (
          <span className={styles.addition_label}>{afterLabel()}</span>
        )} */}
        {textarea ? (
          <TextArea
            value={value}
            disabled={disabled}
            className={styles.input}
            placeholder={placeholder}
            autoSize={{ minRows: 5, maxRows: 7 }}
            onChange={onChange}
          />
        ) : (
          <InputAd
            type={type}
            addonBefore={pre}
            disabled={disabled}
            value={value}
            className={styles.input}
            placeholder={placeholder}
            onChange={onChange}
          />
        )}
      </div>
    );
  }
}
