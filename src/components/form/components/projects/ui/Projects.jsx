import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import {addProject} from "../utils/addProject";
import Project from "../components/Project";
import {useTranslation} from "../../../../../i18n/useTranslation";
import {AddButton, Section, moveItem, useItemCards} from "../../../ui/kit";

const Projects = () => {
  const {t} = useTranslation();
  const {resumeData, setResumeData} = useContext(ResumeContext);
  const items = resumeData.projects;
  const cards = useItemCards();

  const move = (from, to) => {
    cards.move(items.length, from, to);
    setResumeData({...resumeData, projects: moveItem(items, from, to)});
  };

  return (
    <Section title={t("projects")} count={items.length}>
      {items.map((project, index) => (
        <Project key={index} project={project} index={index} total={items.length} onMove={move}
          card={(defaultOpen) => cards.props(index, defaultOpen)}
          onRemoved={() => cards.remove(items.length, index)}/>
      ))}
      <AddButton label={t("addProject")} onClick={() => addProject(resumeData, setResumeData)}/>
    </Section>
  );
};

export default Projects;
