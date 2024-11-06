import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import "./privacy-policy.css";
import SmallBtn from "../buttons/small-btn";

interface PrivacyPolicyProps extends WithTranslation {}

class PrivacyPolicy extends React.Component<PrivacyPolicyProps> {
  render() {
    const { t } = this.props;

    return (
      <div className="privacy-policy">
        <div className="privacy-policy-header">
          <h2>{t("privacy-policy.headline")}</h2>
          <SmallBtn
            image="back.svg"
            onClick={() => window.history.back()}
          ></SmallBtn>
        </div>
        <h3 id="content0">{t("privacy-policy.preambleHeadline")}</h3>
        <p>{t("privacy-policy.preambleDescription")}</p>

        <h3>{t("privacy-policy.ContentHeadline")}</h3>
        <ul className="index">
          {Array.from({ length: 9 }).map((_, index) => (
            <li key={index}>
              <a href={`privacy-policy#content${index}`}>
                {t(`privacy-policy.Content${index}`)}
              </a>
            </li>
          ))}
        </ul>

        <h3 id="content1">{t("privacy-policy.Content1")}</h3>
        <p>Andre Kempf</p>
        <p>Großschneidersweg 2a</p>
        <p>76149 Karlsruhe</p>
        <p>
          {t("privacy-policy.tel")}
          <a href="tel:+491724180328">+49 172 4180328</a>
        </p>
        <p>
          {t("privacy-policy.mail")}
          <a href="mailto:mail@andre-kempf.com">mail&#64;andre-kempf.com</a>
        </p>

        <h3 id="content2">{t("privacy-policy.Content2")}</h3>
        <p>{t("privacy-policy.Content2Description")}</p>
        {[...Array(3)].map((_, sectionIndex) => (
          <React.Fragment key={sectionIndex}>
            <h4>{t(`privacy-policy.Content2Section${sectionIndex}`)}</h4>
            <ul>
              <li>{t(`privacy-policy.Content2Section${sectionIndex}List`)}</li>
            </ul>
          </React.Fragment>
        ))}

        <h3 id="content3">{t("privacy-policy.Content3")}</h3>
        <p>
          <strong>{t("privacy-policy.Content3Header0")}</strong>
          <br />
          {t("privacy-policy.Content3Description0")}
        </p>
        <ul>
          <li>
            <strong>{t("privacy-policy.Content3Header1")}</strong>
            <br />
            {t("privacy-policy.Content3Description1")}
          </li>
        </ul>
        <p>
          <strong>{t("privacy-policy.Content3Header2")}</strong>
          <br />
          {t("privacy-policy.Content3Description2")}
        </p>

        <h3 id="content4">{t("privacy-policy.Content4")}</h3>
        {[...Array(3)].map((_, descIndex) => (
          <p key={descIndex}>
            {t(`privacy-policy.Content4Description${descIndex}`)}
          </p>
        ))}

        <h3 id="content5">{t("privacy-policy.Content5")}</h3>
        <p>{t("privacy-policy.Content5Description")}</p>

        <h3 id="content6">{t("privacy-policy.Content6")}</h3>
        <p>{t("privacy-policy.Content6Description0")}</p>
        <strong>{t("privacy-policy.Content6Description1")}</strong>
        <ul>
          {[...Array(6)].map((_, listIndex) => (
            <li key={listIndex}>
              <strong>{t(`privacy-policy.Content6Section${listIndex}`)}</strong>
              <br />
              {t(`privacy-policy.Content6Section${listIndex}List`)}
            </li>
          ))}
        </ul>

        <h3 id="content7">{t("privacy-policy.Content7")}</h3>
        <p>{t("privacy-policy.Content7Description0")}</p>
        <p>{t("privacy-policy.Content7Description1")}</p>

        <h3 id="content8">{t("privacy-policy.Content8")}</h3>
        <p>{t("privacy-policy.Content8Description0")}</p>
        <ul>
          {[...Array(3)].map((_, sectionIndex) => (
            <li key={sectionIndex}>
              <strong>
                {t(`privacy-policy.Content8Section${sectionIndex}`)}
              </strong>
              <br />
              {t(`privacy-policy.Content8Section${sectionIndex}List`)}
            </li>
          ))}
        </ul>

        <p>
          <a
            href="https://datenschutz-generator.de/"
            title="Rechtstext von Dr. Schwenke - für weitere Informationen bitte anklicken."
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {t("privacy-policy.sourceText")}
          </a>
        </p>
      </div>
    );
  }
}

export default withTranslation()(PrivacyPolicy);
