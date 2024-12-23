import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import "./help.css";
import SmallBtn from "../buttons/small-btn";

interface HelpProps extends WithTranslation {}

interface HelpState {}

class Help extends React.Component<HelpProps, HelpState> {
  state = {};

  // Helper function to replace the word “Join” with a span with className
  highlightJoin(text: string) {
    const parts = text.split(/(Join)/g);
    return parts.map((part, index) =>
      part === "Join" ? (
        <span key={index} className="blue-color">
          {part}
        </span>
      ) : (
        part
      )
    );
  }

  render() {
    const { t } = this.props;

    return (
      <div className="help">
        <div className="help-header">
          <h2>{this.highlightJoin(t("help.header"))}</h2>
          <SmallBtn
            image="back.svg"
            onClick={() => window.history.back()}
          ></SmallBtn>
        </div>
        <p>{this.highlightJoin(t("help.welcome"))}</p>
        <h3 className="blue-color">
          {this.highlightJoin(t("help.question0"))}
        </h3>
        <p>
          {this.highlightJoin(t("help.question0answer0"))}
          <br />
          <br />
          {this.highlightJoin(t("help.question0answer1"))}
          <br />
          <br />
          {this.highlightJoin(t("help.question0answer2"))}
        </p>
        <h3 className="blue-color">
          {this.highlightJoin(t("help.question1"))}
        </h3>
        <p>{this.highlightJoin(t("help.question1description"))}</p>
        <table className="content-table">
          <tbody>
            <tr>
              <td className="blue-color">1.</td>
              <td>
                <h4 className="blue-color">
                  {this.highlightJoin(t("help.question1header0"))}
                </h4>
                <p>
                  {this.highlightJoin(t("help.question1header0description"))}
                </p>
              </td>
            </tr>
            <tr>
              <td className="blue-color">2.</td>
              <td>
                <h4 className="blue-color">
                  {this.highlightJoin(t("help.question1header1"))}
                </h4>
                <p>
                  {this.highlightJoin(t("help.question1header1description"))}
                </p>
              </td>
            </tr>
            <tr>
              <td className="blue-color">3.</td>
              <td>
                <h4 className="blue-color">
                  {this.highlightJoin(t("help.question1header2"))}
                </h4>
                <p>
                  {this.highlightJoin(t("help.question1header2description"))}
                </p>
              </td>
            </tr>
            <tr>
              <td className="blue-color">4.</td>
              <td>
                <h4 className="blue-color">
                  {this.highlightJoin(t("help.question1header3"))}
                </h4>
                <p>
                  {this.highlightJoin(t("help.question1header3description"))}
                </p>
              </td>
            </tr>
            <tr>
              <td className="blue-color">5.</td>
              <td>
                <h4 className="blue-color">
                  {this.highlightJoin(t("help.question1header4"))}
                </h4>
                <p>
                  {this.highlightJoin(t("help.question1header4description0"))}
                  <br />
                  <br />
                  {this.highlightJoin(t("help.question1header4description1"))}
                  <br />
                  <br />
                  {this.highlightJoin(t("help.question1header4description2"))}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <h2>{this.highlightJoin(t("help.footer"))}</h2>
      </div>
    );
  }
}

export default withTranslation()(Help);
