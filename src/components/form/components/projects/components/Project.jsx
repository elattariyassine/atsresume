import React, {useContext} from 'react';
import {handleProject} from "../utils/handleProject";
import {ResumeContext} from "../../../../builder";
import {removeProject} from "../utils/removeProject";
import {useTranslation} from "../../../../../i18n/useTranslation";
import {Field, ItemCard, TextArea, TextInput, isBlankItem} from "../../../ui/kit";

const DESCRIPTION_MAX = 250;

const Project = ({project, index, total, onMove, card, onRemoved}) => {
  const {t, formatDateRange} = useTranslation();
  const {resumeData, setResumeData} = useContext(ResumeContext);
  const onChange = (e) => handleProject(resumeData, setResumeData, e, index);

  return (
    <ItemCard
      title={project.name || t("untitled")}
      subtitle={formatDateRange(project.startYear, project.endYear)}
      index={index}
      total={total}
      onMove={onMove}
      onRemove={() => { removeProject(resumeData, setResumeData, index); onRemoved(); }}
      {...card(isBlankItem(project))}
    >
      <div className="form-grid">
        <Field label={t("projectName")}>
          <TextInput name="name" value={project.name} onChange={onChange}/>
        </Field>
        <Field label={t("link")}>
          <TextInput name="link" value={project.link} onChange={onChange}/>
        </Field>
        <Field label={t("startYear")}>
          <TextInput type="date" name="startYear" value={project.startYear} onChange={onChange}/>
        </Field>
        <Field label={t("endYear")}>
          <TextInput type="date" name="endYear" value={project.endYear} onChange={onChange}/>
        </Field>
      </div>
      <Field label={t("description")} counter={{value: (project.description || "").length, max: DESCRIPTION_MAX}}>
        <TextArea name="description" rows={3} value={project.description} maxLength={DESCRIPTION_MAX} onChange={onChange}/>
      </Field>
      <Field label={t("keyAchievements")}>
        <TextArea name="keyAchievements" rows={5} value={project.keyAchievements} onChange={onChange}/>
      </Field>
    </ItemCard>
  );
};

export default Project;
