import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import WorkExperience from "../components/WorkExperience";
import {addWorkExperience} from "../units/addWorkExperience";
import {useTranslation} from "../../../../../i18n/useTranslation";
import {AddButton, Section, moveItem, useItemCards} from "../../../ui/kit";

const WorkExperiences = () => {
  const {t} = useTranslation();
  const {resumeData, setResumeData} = useContext(ResumeContext);
  const items = resumeData.workExperience;
  const cards = useItemCards();

  const move = (from, to) => {
    cards.move(items.length, from, to);
    setResumeData({...resumeData, workExperience: moveItem(items, from, to)});
  };

  return (
    <Section title={t("workExperience")} count={items.length}>
      {items.map((workExperience, index) => (
        <WorkExperience
          key={index}
          workExperience={workExperience}
          index={index}
          total={items.length}
          onMove={move}
          card={(defaultOpen) => cards.props(index, defaultOpen)}
          onRemoved={() => cards.remove(items.length, index)}
        />
      ))}
      <AddButton label={t("addExperience")} onClick={() => addWorkExperience(resumeData, setResumeData)}/>
    </Section>
  );
};

export default WorkExperiences;
