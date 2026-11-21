import React, {useContext} from 'react';
import {handleWorkExperience} from "../units/handleWorkExperience";
import {ResumeContext} from "../../../../builder";
import {removeWorkExperience} from "../units/removeResumeExperience";
import Technologies from "./Technologies";
import {useTranslation} from "../../../../../i18n/useTranslation";
import {Field, ItemCard, Select, TextArea, TextInput, isBlankItem} from "../../../ui/kit";

const WORK_TYPES = ["None", "Remote", "In-Office", "Hybrid"];
const DESCRIPTION_MAX = 250;

const WorkExperience = ({workExperience, index, total, onMove, card, onRemoved}) => {
  const {t, workTypeLabel, formatDateRange} = useTranslation();
  const {resumeData, setResumeData} = useContext(ResumeContext);
  const onChange = (e) => handleWorkExperience(resumeData, setResumeData, e, index);

  const subtitle = [
    workExperience.position,
    formatDateRange(workExperience.startYear, workExperience.endYear),
  ].filter(Boolean).join(" · ");

  return (
    <ItemCard
      title={workExperience.company || t("untitled")}
      subtitle={subtitle}
      index={index}
      total={total}
      onMove={onMove}
      onRemove={() => { removeWorkExperience(resumeData, setResumeData, index); onRemoved(); }}
      {...card(isBlankItem(workExperience, ["workType"]))}
    >
      <div className="form-grid">
        <Field label={t("company")}>
          <TextInput name="company" value={workExperience.company} onChange={onChange}/>
        </Field>
        <Field label={t("jobTitle")}>
          <TextInput name="position" value={workExperience.position} onChange={onChange}/>
        </Field>
        <Field label={t("workType")}>
          <Select name="workType" value={workExperience.workType || "None"} onChange={onChange}>
            {WORK_TYPES.map((value) => (
              <option key={value} value={value}>{workTypeLabel(value)}</option>
            ))}
          </Select>
        </Field>
        <Field label={t("location")}>
          <TextInput name="location" value={workExperience.location || ""} onChange={onChange}/>
        </Field>
        <Field label={t("startYear")}>
          <TextInput type="date" name="startYear" value={workExperience.startYear} onChange={onChange}/>
        </Field>
        <Field label={t("endYear")}>
          <TextInput type="date" name="endYear" value={workExperience.endYear} onChange={onChange}/>
        </Field>
      </div>
      <Field
        label={t("description")}
        counter={{value: (workExperience.description || "").length, max: DESCRIPTION_MAX}}
      >
        <TextArea
          name="description"
          rows={3}
          value={workExperience.description}
          maxLength={DESCRIPTION_MAX}
          onChange={onChange}
        />
      </Field>
      <Field label={t("keyAchievements")}>
        <TextArea name="keyAchievements" rows={7} value={workExperience.keyAchievements} onChange={onChange}/>
      </Field>
      <Technologies technologies={workExperience.technologies} workIndex={index}/>
    </ItemCard>
  );
};

export default WorkExperience;
