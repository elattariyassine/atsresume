import React, { useContext } from "react";
import {ResumeContext} from "../../builder";
import {useTranslation} from "../../../i18n/useTranslation";

const Summary = () => {
  const {t} = useTranslation();
  const { resumeData, setResumeData, handleChange } = useContext(ResumeContext);
  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">{t('summary')}</h2>
      <div className="grid-4">
        <textarea
          placeholder={t('summary')}
          name="summary"
          className="w-full other-input h-40"
          value={resumeData.summary}
          onChange={handleChange}
          maxLength="500"
        />
      </div>
    </div>
  );
};

export default Summary;
