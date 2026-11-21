import React, { useContext } from "react";
import {ResumeContext} from "../../builder";
import {useTranslation} from "../../../i18n/useTranslation";

const Skills = ({ title, skills }) => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const { skillTitle } = useTranslation();
  const displayedTitle = skillTitle(title);

  // Only rename when the user actually changed the text, so blurring a
  // translated default title doesn't overwrite its stored English key.
  const handleTitleChange = (e) => {
    const newTitle = e.target.innerText.trim();
    if (!newTitle || newTitle === displayedTitle) return;
    const newSkills = resumeData.skills.map((skillType) =>
      skillType.title === title ? { ...skillType, title: newTitle } : skillType
    );
    setResumeData({ ...resumeData, skills: newSkills });
  };

  return (
    skills && skills.length > 0 && (
      <>
        <h2 className="section-title mb-1 border-b-2 border-gray-300 editable" contentEditable suppressContentEditableWarning onBlur={handleTitleChange}>
          {displayedTitle}
        </h2>
        <p className="sub-content">{skills.join(", ")}</p>
      </>
    )
  );
};

export default Skills;
