import React from "react";
import {LOCALES, useTranslation} from "../../../i18n/useTranslation";

const ResumeLanguage = () => {
  const {t, locale, setLocale} = useTranslation();

  return (
    <div className="flex-col-gap-2">
      <label htmlFor="resume-language" className="input-title">{t('resumeLanguage')}</label>
      <select
        id="resume-language"
        className="w-full other-input"
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
      >
        {LOCALES.map(({value, label}) => (
          <option key={value} value={value} lang={value}>{label}</option>
        ))}
      </select>
    </div>
  );
};

export default ResumeLanguage;
