import React, {useContext} from 'react';
import {handleSkill} from "../utlis/handleSkill";
import {ResumeContext} from "../../../../builder";
import {removeSkill} from "../utlis/removeSkill";
import {useTranslation} from "../../../../../i18n/useTranslation";
import {ListRow, TextInput} from "../../../ui/kit";

const SkillLine = ({skill, title, index}) => {
  const {t, skillTitle} = useTranslation();
  const {resumeData, setResumeData} = useContext(ResumeContext);

  return (
    <ListRow removeLabel={t("remove")} onRemove={() => removeSkill(title, setResumeData, index)}>
      <TextInput
        aria-label={`${skillTitle(title)}: ${t("skill")}`}
        placeholder={t("skill")}
        name={title}
        value={skill}
        onChange={(e) => handleSkill(e, index, title, resumeData, setResumeData)}
      />
    </ListRow>
  );
};

export default SkillLine;
