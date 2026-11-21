import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import Education from "../components/Education";
import {addEducation} from "../units/addEducation";
import {useTranslation} from "../../../../../i18n/useTranslation";
import {AddButton, Section, moveItem, useItemCards} from "../../../ui/kit";

const Educations = () => {
  const {t} = useTranslation();
  const {resumeData, setResumeData} = useContext(ResumeContext);
  const items = resumeData.education;
  const cards = useItemCards();

  const move = (from, to) => {
    cards.move(items.length, from, to);
    setResumeData({...resumeData, education: moveItem(items, from, to)});
  };

  return (
    <Section title={t("education")} count={items.length}>
      {items.map((education, index) => (
        <Education key={index} education={education} index={index} total={items.length} onMove={move}
          card={(defaultOpen) => cards.props(index, defaultOpen)}
          onRemoved={() => cards.remove(items.length, index)}/>
      ))}
      <AddButton label={t("addEducation")} onClick={() => addEducation(resumeData, setResumeData)}/>
    </Section>
  );
};

export default Educations;
