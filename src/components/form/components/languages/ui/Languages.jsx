import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import {addLanguage} from "../utils/addLanguage";
import LanguageLine from "../components/LanguageLine";
import {MdAddCircle} from "react-icons/md";
import {useTranslation} from "../../../../../i18n/useTranslation";

const Languages = () => {
  const {t} = useTranslation();
  const {resumeData, setResumeData} = useContext(ResumeContext);
  // TODO replace hardcoded variables

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">{t('languages')}</h2>
      {resumeData["languages"].map((lang, index) => (
        <LanguageLine
          key={index}
          lang={lang}
          resumeData={resumeData}
          setResumeData={setResumeData}
          index={index}
        />
      ))}
      <button type="button"
              onClick={() => {
                addLanguage(resumeData, setResumeData, "languages")
              }}
              aria-label={t('add')}
              className="p-2 w-[37px] text-white bg-fuchsia-700 rounded text-xl">
        <MdAddCircle/>
      </button>
    </div>
  );
};

export default Languages;
