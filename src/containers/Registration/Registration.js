import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import StepWizard from "react-step-wizard";
import classnames from "classnames";
import { message as notifi } from "antd";
import { withNamespaces } from "react-i18next";

import styles from "./styles/registration.module.scss";
import inputStyles from "~components/forms/input/styles/input.module.scss";

// Components
import HeaderDark from "~components/common/HeaderDark";
import { Nav } from "~components/wizard";
import { Step1, Step2 } from "./steps";
import { Avatar, Input, Select, FormWrapper, Button } from "~components/forms";

// Actions

import authCompany from '../Auth/actions/authCompany';
import setRegistrationData from "./actions/setRegistrationData";
import createCompany from "./actions/createCompany";
import TextArea from "antd/lib/input/TextArea";

class Registration extends Component {
  state = {
    wizardRef: null,
  };

  onStepChange = (state) => {
    console.log(state);
  };


  login = (email,password) =>{
    const data = {email,password}
    const { history, registrationActions } = this.props;
    registrationActions.authCompany(data, {
      success: (response) => {
        history.replace('/dashboard');
      },
      fail: (response) => {
        const { message } = response;
        notifi.error(message);
      },
    });
  }
  onSubmit = () => {
    const { registrationData, registrationActions } = this.props;

    console.warn(registrationData);
    const { email = "", password = "", rePassword = "" } = registrationData;


    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
      notifi.error("Please enter correct email");
      return;
    }

    if (password !== rePassword) {
      notifi.error("Please use in a password above 6 symbols");
      return;
    }

    if (password.length <= 6) {
      notifi.error("Please use in a password above 6 symbols");
      return;
    }

    const data = new FormData();

    data.append("logo", registrationData.companyLogo?.file || null);
    data.append("name", registrationData.companyName);
    data.append("website", registrationData.webSite);
    data.append("business_field", registrationData.businesField);
    data.append("employees", registrationData.employerNumber);
    data.append("description", registrationData.aboutBusines);
    data.append("first_name", registrationData.firstName);
    data.append("last_name", registrationData.lastName);
    data.append("position", registrationData.positionCompany);
    data.append("mobile", registrationData.mobile);
    data.append("email", email);
    data.append("password", password);

    registrationActions.createCompany(data, {
      success: (response) => {
        this.login(email,password)

        const { history } = this.props;
        const { message, data } = response;
        notifi.success(message);
        sessionStorage.setItem("authToken", data.token);
        history.replace("/registration/plan");
        registrationActions.setRegistrationData(null);
      },
      fail: (response) => {
        const { message } = response;
        notifi.error(message);
      },
    });
  };

  render() {
    const {
      registrationActions,
      registrationData,
      createCompanyLoading,
      t,
    } = this.props;
    const {
      companyName,
      webSite,
      businesField,
      employerNumber,
      companyLogo,
      mobile,
      aboutBusines,
      firstName,
      lastName,
      positionCompany,
      email,
      password,
      rePassword,
    } = registrationData;
    return (
      <div>
        <HeaderDark />

        <div className={styles.container}>
          <FormWrapper title={t("Company information")}>
            <div
              className={classnames(
                inputStyles.input_container,
                inputStyles.file
              )}
            >
              <Avatar
                value={companyLogo}
                placeholder={t("input.avatar_placeholder")}
                onChange={(image) => {
                  registrationActions.setRegistrationData({
                    companyLogo: image,
                  });
                }}
              />
            </div>

            {/* ========= */}
            <div className={inputStyles.input_container}>
              <span
                style={{ color: "red", marginTop: "45px", marginRight: "5px" }}
              >
                *
              </span>
              <Input
                value={companyName}
                label={t("input.company_name.label")}
                placeholder={t("input.company_name.placeholder")}
                onChange={(el) => {
                  registrationActions.setRegistrationData({
                    companyName: el.target.value,
                  });
                }}
              />
            </div>
            {/* ========= */}
            <div className={inputStyles.input_container}>
              <Input
                value={webSite}
                label={t("input.web_site.label")}
                placeholder={t("input.web_site.placeholder")}
                onChange={(el) => {
                  registrationActions.setRegistrationData({
                    webSite: el.target.value,
                  });
                }}
              />
            </div>
            {/* ========= */}
            <div className={inputStyles.input_container}>
              <span
                style={{ color: "red", marginTop: "45px", marginRight: "5px" }}
              >
                *
              </span>
              <Input
                value={businesField}
                label={t("input.business_field.label")}
                placeholder={t("input.business_field.placeholder")}
                onChange={(el) => {
                  registrationActions.setRegistrationData({
                    businesField: el.target.value,
                  });
                }}
              />
            </div>
            {/* ========= */}
            <div className={inputStyles.input_container}>
              <span
                style={{ color: "red", marginTop: "45px", marginRight: "5px" }}
              >
                *
              </span>
              <Select
                value={employerNumber}
                label={t("input.number_employer.label")}
                placeholder={t("input.number_employer.placeholder")}
                options={[
                  "1-5 employee",
                  "6-49 employee",
                  "50-500 employee",
                  "More than 500 employee",
                ]}
                onChange={(value) => {
                  registrationActions.setRegistrationData({
                    employerNumber: value,
                  });
                }}
              />
            </div>
            {/* ========= */}
            <div className={inputStyles.input_container}>
              <span
                style={{ color: "red", marginTop: "45px", marginRight: "5px" }}
              >
                *
              </span>
              <TextArea
              style={{marginTop:'20px'}}
                value={aboutBusines}
                label={t("input.about_business.label")}
                placeholder={t("input.about_business.placeholder")}
                onChange={(el) => {
                  registrationActions.setRegistrationData({
                    aboutBusines: el.target.value,
                  });
                }}
              />
            </div>
            {/* ========= */}
            <h2 className={styles.sections_title}>
              {t("registration.personal_date_title")}
            </h2>
            <div className={inputStyles.input_container}>
              <span
                style={{ color: "red", marginTop: "45px", marginRight: "5px" }}
              >
                *
              </span>
              <Input
                value={firstName}
                label={t("input.first_name.label")}
                placeholder={t("input.first_name.placeholder")}
                onChange={(el) => {
                  registrationActions.setRegistrationData({
                    firstName: el.target.value,
                  });
                }}
              />
            </div>
            {/* ========= */}
            <div className={inputStyles.input_container}>
              <span
                style={{ color: "red", marginTop: "45px", marginRight: "5px" }}
              >
                *
              </span>
              <Input
                value={lastName}
                label={t("input.last_name.label")}
                placeholder={t("input.last_name.placeholder")}
                onChange={(el) => {
                  registrationActions.setRegistrationData({
                    lastName: el.target.value,
                  });
                }}
              />
            </div>
            {/* ========= */}
            <div className={inputStyles.input_container}>
              <span
                style={{ color: "red", marginTop: "45px", marginRight: "5px" }}
              >
                *
              </span>
              <Input
                value={positionCompany}
                label={t("input.position.label", {
                  companyName: companyName || "",
                })}
                placeholder={t("input.position.label", {
                  companyName: companyName || "",
                })}
                onChange={(el) => {
                  registrationActions.setRegistrationData({
                    positionCompany: el.target.value,
                  });
                }}
              />
            </div>
            {/* ========= */}
            <div className={inputStyles.input_container}>
              <span
                style={{ color: "red", marginTop: "45px", marginRight: "5px" }}
              >
                *
              </span>
              <Input
              showCount
                value={mobile}
                type="number"
                label={t("input.mobile.label")}
                placeholder={t("input.mobile.placeholder")}
                onChange={(el) => {
                  registrationActions.setRegistrationData({
                    mobile: el.target.value,
                  });
                }}
              />
            </div>
            {/* ========= */}
            <div className={inputStyles.input_container}>
              <span
                style={{ color: "red", marginTop: "45px", marginRight: "5px" }}
              >
                *
              </span>
              <Input
                value={email}
                type="email"
                label={t("input.email.label")}
                placeholder={t("input.email.placeholder")}
                onChange={(el) => {
                  registrationActions.setRegistrationData({
                    email: el.target.value,
                  });
                }}
              />
            </div>
            {/* ========= */}
            <div className={inputStyles.input_container}>
              <span
                style={{ color: "red", marginTop: "45px", marginRight: "5px" }}
              >
                *
              </span>
              <Input
                value={password}
                type={t("input.password.label")}
                label={t("input.password.placeholder")}
                placeholder="Password"
                onChange={(el) => {
                  registrationActions.setRegistrationData({
                    password: el.target.value,
                  });
                }}
              />
            </div>
            {/* ========= */}
            <div className={inputStyles.input_container}>
              <span
                style={{ color: "red", marginTop: "45px", marginRight: "5px" }}
              >
                *
              </span>
              <Input
                value={rePassword}
                type="password"
                label={t("input.re_password.label")}
                placeholder={t("input.re_password.placeholder")}
                onChange={(el) => {
                  registrationActions.setRegistrationData({
                    rePassword: el.target.value,
                  });
                }}
              />
            </div>
            {/* ========= */}
            <div className={styles.button_wrapper}>
              <Button
                isLoading={createCompanyLoading}
                fullWidth
                type="submit"
                text={t("button.registration")}
                size="large"
                onClick={this.onSubmit}
              />
            </div>
            {/* ========= */}
          </FormWrapper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  registrationData: store.registration.registrationData,
  createCompanyLoading: store.registration.createCompanyLoading,
});

const mapDispatchToProps = (dispatch) => ({
  registrationActions: bindActionCreators(
    { setRegistrationData, createCompany,authCompany },
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(Registration));
