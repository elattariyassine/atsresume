import React, {useContext} from "react";
import {ResumeContext} from "../../builder";
import {LOCALES, useTranslation} from "../../../i18n/useTranslation";
import {SegmentedControl} from "./kit";

/** Document-level settings: they change how the whole resume renders. */
const ResumeSettings = () => {
  const {resumeData, setResumeData} = useContext(ResumeContext);
  const {t, locale, setLocale} = useTranslation();
  const update = (key) => (value) => setResumeData({...resumeData, [key]: value});

  return (
    <section className="form-section" aria-labelledby="resume-settings-title">
      <div className="form-section-body pt-3">
        <h2 id="resume-settings-title" className="sub-heading">{t("resumeSettings")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <SegmentedControl
            label={t("resumeLanguage")}
            value={locale}
            options={LOCALES.map(({value, label}) => ({value, label}))}
            onChange={setLocale}
          />
          <SegmentedControl
            label={t("layout")}
            value={resumeData.layout || "two-column"}
            options={[
              {value: "two-column", label: t("twoColumns")},
              {value: "one-column", label: t("oneColumn")},
            ]}
            onChange={update("layout")}
          />
          <div className="sm:col-span-2">
            <SegmentedControl
              label={t("skillsFormat")}
              value={Boolean(resumeData.useGroupedSkills)}
              options={[
                {value: false, label: t("simpleShort")},
                {value: true, label: t("groupedShort")},
              ]}
              onChange={update("useGroupedSkills")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSettings;
