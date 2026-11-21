import React, {useContext} from "react";
import {BsTrash3} from "react-icons/bs";
import {MdAddCircle} from "react-icons/md";
import {ResumeContext} from "../../../../builder";
import {addSkillGroup, handleSkillGroup, removeSkillGroup} from "../utlis/groupedSkills";

const SkillGroupsSection = ({section}) => {
  const {resumeData, setResumeData} = useContext(ResumeContext);
  const {title, groups = []} = section;

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">{title}</h2>
      {groups.map((group, groupIndex) => (
        <div key={groupIndex} className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Group name (e.g. Frontend)"
            aria-label={`${title} group name`}
            className="flex-1 min-w-0 mb-0 other-input"
            value={group.groupName}
            onChange={(e) =>
              handleSkillGroup(resumeData, setResumeData, title, groupIndex, "groupName", e.target.value)
            }
          />
          <input
            type="text"
            placeholder="Skills (e.g. React, Vue.js)"
            aria-label={`${title} group skills`}
            className="flex-[2] min-w-0 mb-0 other-input"
            value={group.skills}
            onChange={(e) =>
              handleSkillGroup(resumeData, setResumeData, title, groupIndex, "skills", e.target.value)
            }
          />
          <button
            type="button"
            onClick={() => removeSkillGroup(resumeData, setResumeData, title, groupIndex)}
            aria-label={`Remove ${title} group`}
            className="p-2 text-white bg-fuchsia-700 rounded text-xl"
          >
            <BsTrash3/>
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addSkillGroup(resumeData, setResumeData, title)}
        aria-label={`Add ${title} group`}
        className="p-2 w-[37px] text-white bg-fuchsia-700 rounded text-xl"
      >
        <MdAddCircle/>
      </button>
    </div>
  );
};

export default SkillGroupsSection;
