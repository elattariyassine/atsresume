import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import {addSkillGroup, handleSkillGroup, removeSkillGroup} from "../utlis/groupedSkills";
import {useTranslation} from "../../../../../i18n/useTranslation";
import {AddButton, ListRow, TextInput} from "../../../ui/kit";

const SkillGroupsSection = ({section}) => {
  const {t, skillTitle} = useTranslation();
  const {resumeData, setResumeData} = useContext(ResumeContext);
  const {title, groups = []} = section;
  const update = (groupIndex, field) => (e) =>
    handleSkillGroup(resumeData, setResumeData, title, groupIndex, field, e.target.value);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="sub-heading">{skillTitle(title)}</h3>
      {groups.map((group, groupIndex) => (
        <ListRow
          key={groupIndex}
          removeLabel={`${t("remove")}: ${skillTitle(title)}`}
          onRemove={() => removeSkillGroup(resumeData, setResumeData, title, groupIndex)}
        >
          <TextInput
            placeholder={t("skillGroupName")}
            aria-label={`${skillTitle(title)}: ${t("skillGroupName")}`}
            className="basis-2/5 shrink-0"
            value={group.groupName}
            onChange={update(groupIndex, "groupName")}
          />
          <TextInput
            placeholder={t("skillGroupSkills")}
            aria-label={`${skillTitle(title)}: ${t("skillGroupSkills")}`}
            value={group.skills}
            onChange={update(groupIndex, "skills")}
          />
        </ListRow>
      ))}
      <AddButton
        label={`${t("addSkillGroup")} · ${skillTitle(title)}`}
        onClick={() => addSkillGroup(resumeData, setResumeData, title)}
      />
    </div>
  );
};

export default SkillGroupsSection;
