import React, {useContext} from 'react';
import {handleProject} from "../utils/handleProject";
import {ResumeContext} from "../../../../builder";
import {removeLanguage} from "../../languages/utils/removeLanguage";
import {BsTrash3} from "react-icons/bs";
import {removeProject} from "../utils/removeProject";
import {useTranslation} from "../../../../../i18n/useTranslation";

const Project = ({project, index}) => {
  const {t} = useTranslation();
  const {resumeData, setResumeData} = useContext(ResumeContext);
  // TODO add a title for each input
  // TODO change the "start year" to the "start date" for clarity (also in the name of variable)
  // TODO change the "end year" to the "end date" for clarity  (also in the name of variable)

  return (
    <div
      className="flex w-fill gap-5 items-top"
    >
      <div
        className="flex-1"
      >
        {/* Project name */}
        <input
          type="text"
          placeholder={t('projectName')}
          name="name"
          className="w-full other-input"
          value={project.name}
          onChange={(e) => handleProject(resumeData, setResumeData, e, index)}
        />
        {/* Link */}
        <input
          type="text"
          placeholder={t('link')}
          name="link"
          className="w-full other-input"
          value={project.link}
          onChange={(e) => handleProject(resumeData, setResumeData, e, index)}
        />
        {/* Description */}
        <textarea
          type="text"
          placeholder={t('description')}
          name="description"
          className="w-full other-input h-32"
          value={project.description}
          maxLength="250"
          onChange={(e) => handleProject(resumeData, setResumeData, e, index)}
        />
        {/* Key achievements */}
        <textarea
          type="text"
          placeholder={t('keyAchievements')}
          name="keyAchievements"
          className="w-full other-input h-40"
          value={project.keyAchievements}
          onChange={(e) => handleProject(resumeData, setResumeData, e, index)}
        />
        {/* Start date */}
        <div className="flex-wrap-gap-2">
          <input
            type="date"
            placeholder={t('startYear')}
            name="startYear"
            className="flex-1 m-0 other-input"
            value={project.startYear}
            onChange={(e) => handleProject(resumeData, setResumeData, e, index)}
          />
          {/* End data */}
          <input
            type="date"
            placeholder={t('endYear')}
            name="endYear"
            className="flex-1 m-0 other-input"
            value={project.endYear}
            onChange={(e) => handleProject(resumeData, setResumeData, e, index)}
          />
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          removeProject(resumeData, setResumeData, index)
        }}
        aria-label={t('remove')}
        className="p-2 h-fit text-white bg-fuchsia-700 rounded text-xl"
      >
        <BsTrash3/>
      </button>
    </div>
  );
};

export default Project;
