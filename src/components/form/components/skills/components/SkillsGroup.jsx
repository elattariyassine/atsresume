import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import {addSkill} from "../utlis/addSkill";
import SkillLine from "./SkillLine";
import {useTranslation} from "../../../../../i18n/useTranslation";
import {AddButton} from "../../../ui/kit";

const SkillsGroup = ({title}) => {
  const {t, skillTitle} = useTranslation();
  const {resumeData, setResumeData} = useContext(ResumeContext);

  const skillType = resumeData.skills.find(
    (skillType) => skillType.title === title
  );

  return (
    <div className="flex flex-col gap-2">
      <h3 className="sub-heading">{skillTitle(title)}</h3>
      {skillType.skills.map((skill, index) => (
        <SkillLine key={index} skill={skill} title={title} index={index}/>
      ))}
      <AddButton label={t("addSkill")} onClick={() => addSkill(title, setResumeData)}/>
    </div>
  );
};

export default SkillsGroup;
