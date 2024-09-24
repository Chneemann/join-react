import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import "./help.css";

interface HelpProps extends WithTranslation {}

interface HelpState {}

class Help extends React.Component<HelpProps, HelpState> {
  state = {};
  render() {
    const { t } = this.props;

    return (
      <div className="help">
        {" "}
        <div className="header">
          <h1>{t("help.header")}</h1>
          {/* 
          TODO Add Button
          <app-btn-back></app-btn-back> 
          */}
        </div>
        <p>{t("help.welcome")}</p>
        <h2>{t("help.question0")}</h2>
        <p>
          {t("help.question0answer0")}
          <br />
          <br />
          {t("help.question0answer1")}
          <br />
          <br />
          {t("help.question0answer2")}
        </p>
        <h2>{t("help.question1")}</h2>
        <p>{t("help.question1description")}</p>
        <table className="content-table">
          <tbody>
            <tr>
              <td>1.</td>
              <td>
                <h3>{t("help.question1header0")}</h3>
                <p>{t("help.question1header0description")}</p>
              </td>
            </tr>
            <tr>
              <td>2.</td>
              <td>
                <h3>{t("help.question1header1")}</h3>
                <p>{t("help.question1header1description")}</p>
              </td>
            </tr>
            <tr>
              <td>3.</td>
              <td>
                <h3>{t("help.question1header2")}</h3>
                <p>{t("help.question1header2description")}</p>
              </td>
            </tr>
            <tr>
              <td>4.</td>
              <td>
                <h3>{t("help.question1header3")}</h3>
                <p>{t("help.question1header3description")}</p>
              </td>
            </tr>
            <tr>
              <td>5.</td>
              <td>
                <h3>{t("help.question1header4")}</h3>
                <p>
                  {t("help.question1header4description0")}
                  <br />
                  <br />
                  {t("help.question1header4description1")}
                  <br />
                  <br />
                  {t("help.question1header4description2")}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <h2>{t("help.footer")}</h2>
      </div>
    );
  }
}

export default withTranslation()(Help);
