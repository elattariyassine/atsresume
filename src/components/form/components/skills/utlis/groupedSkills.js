const updateGroups = (resumeData, setResumeData, title, update) => {
  const groupedSkills = resumeData.groupedSkills.map((section) =>
    section.title === title
      ? {...section, groups: update(section.groups || [])}
      : section
  );
  setResumeData({...resumeData, groupedSkills});
};

export const addSkillGroup = (resumeData, setResumeData, title) =>
  updateGroups(resumeData, setResumeData, title, (groups) => [
    ...groups,
    {groupName: "", skills: ""},
  ]);

export const handleSkillGroup = (resumeData, setResumeData, title, groupIndex, field, value) =>
  updateGroups(resumeData, setResumeData, title, (groups) =>
    groups.map((group, index) =>
      index === groupIndex ? {...group, [field]: value} : group
    )
  );

export const removeSkillGroup = (resumeData, setResumeData, title, groupIndex) =>
  updateGroups(resumeData, setResumeData, title, (groups) =>
    groups.filter((_, index) => index !== groupIndex)
  );

export const setUseGroupedSkills = (resumeData, setResumeData, useGroupedSkills) =>
  setResumeData({...resumeData, useGroupedSkills});
