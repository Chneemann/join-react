import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import "./legal-notice.css";
import SmallBtn from "../buttons/small-btn";

interface LegalNoticeProps extends WithTranslation {}

interface LegalNoticeState {}

class LegalNotice extends React.Component<LegalNoticeProps, LegalNoticeState> {
  render() {
    const { t } = this.props;

    return (
      <div className="legal-notice">
        <div className="legal-notice-header">
          <h2>{t("legal-notice.headline")}</h2>
          <SmallBtn
            image="back.svg"
            onClick={() => window.history.back()}
          ></SmallBtn>
        </div>
        <p>{t("legal-notice.tmg")}</p>
        <br />
        <span>Andre Kempf</span>
        <br />
        <span>Großschneidersweg 2a</span>
        <br />
        <span>76149 Karlsruhe</span>
        <h4>{t("legal-notice.contact")}</h4>
        <span>
          {t("legal-notice.tel")}
          <a href="tel:+491724180328">+49 172 4180328</a>
        </span>
        <br />
        <span>
          {t("legal-notice.mail")}
          <a href="mailto:mail@andre-kempf.com">mail&#64;andre-kempf.com</a>
        </span>
        <br />
        <h3>{t("legal-notice.disclaimer")}:</h3>

        <h4>{t("legal-notice.liabilityContentHeadline")}</h4>

        <p>{t("legal-notice.liabilityContentDescription")}</p>

        <h4>{t("legal-notice.liabilityLinksHeadline")}</h4>

        <p>{t("legal-notice.liabilityLinksDescription")}</p>

        <h4>{t("legal-notice.copyrightHeadline")}</h4>

        <p>{t("legal-notice.copyrightDescription")}</p>

        <h4>{t("legal-notice.dataProtectionHeadline")}</h4>

        <p>{t("legal-notice.dataProtectionDescription")}</p>
        <br />
        {t("legal-notice.sourceText0")}
        <a href="https://www.impressum-generator.de/" target="_blank">
          {t("legal-notice.sourceLink0")}
        </a>
        {t("legal-notice.sourceText1")}
        <a href="https://www.kanzlei-hasselbach.de/" target="_blank">
          {t("legal-notice.sourceLink1")}
        </a>
      </div>
    );
  }
}

export default withTranslation()(LegalNotice);
