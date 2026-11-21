import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import {addSkill} from "../utlis/addSkill";
import SkillLine from "./SkillLine";
import {MdAddCircle} from "react-icons/md";
import {useTranslation} from "../../../../../i18n/useTranslation";

const SkillsGroup = ({title}) => {
  const {t, skillTitle} = useTranslation();
  const {resumeData, setResumeData} = useContext(ResumeContext);

  const skillType = resumeData.skills.find(
    (skillType) => skillType.title === title
  );

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">{skillTitle(title)}</h2>
      {skillType.skills.map((skill, index) => (
        <SkillLine key={index} skill={skill} title={title} index={index}/>
      ))}
      {/* Add new skill button */}
      <button type="button" onClick={() => addSkill(title, setResumeData)}
              aria-label={t('add')}
              className="p-2 w-[37px] text-white bg-fuchsia-700 rounded text-xl">
        <MdAddCircle/>
      </button>
    </div>
  );
};

export default SkillsGroup;
