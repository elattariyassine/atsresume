import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import {addLanguage} from "../utils/addLanguage";
import LanguageLine from "../components/LanguageLine";
import {useTranslation} from "../../../../../i18n/useTranslation";
import {AddButton, Section} from "../../../ui/kit";

const Languages = () => {
  const {t} = useTranslation();
  const {resumeData, setResumeData} = useContext(ResumeContext);

  return (
    <Section title={t("languages")} count={resumeData.languages.length}>
      {resumeData.languages.map((lang, index) => (
        <LanguageLine
          key={index}
          lang={lang}
          resumeData={resumeData}
          setResumeData={setResumeData}
          index={index}
        />
      ))}
      <AddButton label={t("addLanguage")} onClick={() => addLanguage(resumeData, setResumeData, "languages")}/>
    </Section>
  );
};

export default Languages;
