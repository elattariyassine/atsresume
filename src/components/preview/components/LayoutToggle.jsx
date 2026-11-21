import React, {useContext} from "react";
import {ResumeContext} from "../../builder";
import {useTranslation} from "../../../i18n/useTranslation";

const LAYOUTS = [
  {value: "two-column", labelKey: "twoColumns"},
  {value: "one-column", labelKey: "oneColumn"},
];

const LayoutToggle = () => {
  const {t} = useTranslation();
  const {resumeData, setResumeData} = useContext(ResumeContext);
  const current = resumeData.layout || "two-column";

  return (
    <div
      className="exclude-print flex items-center justify-end gap-1 mb-3"
      role="group"
      aria-label={t('layout')}
    >
      <span className="mr-2 text-sm font-semibold text-gray-700">{t('layout')}</span>
      {LAYOUTS.map(({value, labelKey}, index) => (
        <button
          key={value}
          type="button"
          aria-pressed={current === value}
          onClick={() => setResumeData({...resumeData, layout: value})}
          className={`px-3 py-1 text-sm border border-fuchsia-600 ${
            index === 0 ? "rounded-l" : "rounded-r"
          } ${
            current === value
              ? "bg-fuchsia-600 text-white"
              : "bg-white text-fuchsia-700"
          }`}
        >
          {t(labelKey)}
        </button>
      ))}
    </div>
  );
};

export default LayoutToggle;
