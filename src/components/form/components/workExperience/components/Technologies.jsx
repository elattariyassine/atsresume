import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import {addTechnology, handleTechnology, removeTechnology} from "../units/technologies";
import {useTranslation} from "../../../../../i18n/useTranslation";
import {AddButton, ListRow, TextInput} from "../../../ui/kit";

const Technologies = ({technologies = [], workIndex}) => {
  const {t} = useTranslation();
  const {resumeData, setResumeData} = useContext(ResumeContext);
  const update = (techIndex, field) => (e) =>
    handleTechnology(resumeData, setResumeData, workIndex, techIndex, field, e.target.value);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="field-label">{t("technologiesUsed")}</h3>
      {technologies.map((technology, techIndex) => (
        <ListRow
          key={techIndex}
          removeLabel={`${t("remove")}: ${t("technologies")}`}
          onRemove={() => removeTechnology(resumeData, setResumeData, workIndex, techIndex)}
        >
          <TextInput
            placeholder={t("technologyCategory")}
            aria-label={t("technologyCategory")}
            className="basis-2/5 shrink-0"
            value={technology.category}
            onChange={update(techIndex, "category")}
          />
          <TextInput
            placeholder={t("technologyList")}
            aria-label={t("technologyList")}
            value={technology.tech}
            onChange={update(techIndex, "tech")}
          />
        </ListRow>
      ))}
      <AddButton
        label={t("addTechnology")}
        onClick={() => addTechnology(resumeData, setResumeData, workIndex)}
      />
    </div>
  );
};

export default Technologies;
