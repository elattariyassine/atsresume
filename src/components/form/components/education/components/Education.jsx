import React, {useContext} from 'react';
import {handleEducation} from "../units/handleEducation";
import {ResumeContext} from "../../../../builder";
import {removeEducation} from "../units/removeEducation";
import {useTranslation} from "../../../../../i18n/useTranslation";
import {Field, ItemCard, TextInput, isBlankItem} from "../../../ui/kit";

const Education = ({education, index, total, onMove, card, onRemoved}) => {
  const {t, formatDateRange} = useTranslation();
  const {resumeData, setResumeData} = useContext(ResumeContext);
  const onChange = (e) => handleEducation(resumeData, setResumeData, e, index);

  return (
    <ItemCard
      title={education.school || education.degree || t("untitled")}
      subtitle={[education.degree, formatDateRange(education.startYear, education.endYear)].filter(Boolean).join(" · ")}
      index={index}
      total={total}
      onMove={onMove}
      onRemove={() => { removeEducation(resumeData, setResumeData, index); onRemoved(); }}
      {...card(isBlankItem(education))}
    >
      <div className="form-grid">
        <Field label={t("school")} className="sm:col-span-2">
          <TextInput name="school" value={education.school} onChange={onChange}/>
        </Field>
        <Field label={t("degree")} className="sm:col-span-2">
          <TextInput name="degree" value={education.degree} onChange={onChange}/>
        </Field>
        <Field label={t("startYear")}>
          <TextInput type="date" name="startYear" value={education.startYear} onChange={onChange}/>
        </Field>
        <Field label={t("endYear")}>
          <TextInput type="date" name="endYear" value={education.endYear} onChange={onChange}/>
        </Field>
      </div>
    </ItemCard>
  );
};

export default Education;
