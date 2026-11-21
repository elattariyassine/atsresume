import React, {useContext} from 'react';
import {ResumeContext} from "../../../../builder";
import SkillsGroup from "../components/SkillsGroup";
import SkillGroupsSection from "../components/SkillGroupsSection";
import {useTranslation} from "../../../../../i18n/useTranslation";
import {Section} from "../../../ui/kit";

// The Simple / Grouped choice lives in the resume settings card.
const Skills = () => {
  const {t} = useTranslation();
  const {resumeData} = useContext(ResumeContext);
  const grouped = Boolean(resumeData.useGroupedSkills);

  return (
    <Section title={`${t("skills")} · ${grouped ? t("groupedSkills") : t("simpleSkills")}`}>
      {grouped
        ? (resumeData.groupedSkills || []).map((section, index) => (
          <SkillGroupsSection key={index} section={section}/>
        ))
        : resumeData.skills.map((skill, index) => (
          <SkillsGroup title={skill.title} key={index}/>
        ))}
    </Section>
  );
};

export default Skills;
