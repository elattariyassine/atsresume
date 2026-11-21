import React, {useContext} from 'react';
import {ResumeContext} from "../../../../builder";
import SkillsGroup from "../components/SkillsGroup";
import SkillGroupsSection from "../components/SkillGroupsSection";
import {setUseGroupedSkills} from "../utlis/groupedSkills";

const FORMATS = [
  {value: false, label: "Simple Skills"},
  {value: true, label: "Grouped Skills"},
];

const Skills = () => {
  const {resumeData, setResumeData} = useContext(ResumeContext);
  const grouped = Boolean(resumeData.useGroupedSkills);

  return (
    <div>
      <div className="flex-col-gap-2 mb-2">
        <h2 className="input-title">Skills Format</h2>
        <div className="flex gap-4" role="radiogroup" aria-label="Skills format">
          {FORMATS.map(({value, label}) => (
            <label key={label} className="flex items-center gap-2 text-white cursor-pointer">
              <input
                type="radio"
                name="skillsFormat"
                checked={grouped === value}
                onChange={() => setUseGroupedSkills(resumeData, setResumeData, value)}
              />
              {label}
            </label>
          ))}
        </div>
      </div>
      {grouped
        ? (resumeData.groupedSkills || []).map((section, index) => (
          <SkillGroupsSection key={index} section={section}/>
        ))
        : resumeData.skills.map((skill, index) => (
          <SkillsGroup
            title={skill.title}
            key={index}
          />
        ))}
    </div>
  );
};

export default Skills;
