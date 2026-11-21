import React, {useContext} from 'react';
import {handleWorkExperience} from "../units/handleWorkExperience";
import {ResumeContext} from "../../../../builder";
import {BsTrash3} from "react-icons/bs";
import {removeWorkExperience} from "../units/removeResumeExperience";
import Technologies from "./Technologies";
import {useTranslation} from "../../../../../i18n/useTranslation";

const WORK_TYPES = ["None", "Remote", "In-Office", "Hybrid"];

const WorkExperience = ({workExperience, index}) => {
  const {t, workTypeLabel} = useTranslation();
  const {resumeData, setResumeData,} = useContext(ResumeContext);

  return (
    <div
      className="flex w-fill gap-5 items-top"
    >
      <div
        className="flex-1"
      >
        <input
          type="text"
          placeholder={t('company')}
          name="company"
          className="w-full other-input"
          value={workExperience.company}
          onChange={(e) =>
            handleWorkExperience(resumeData, setResumeData, e, index)
          }
        />
        <input
          type="text"
          placeholder={t('jobTitle')}
          name="position"
          className="w-full other-input"
          value={workExperience.position}
          onChange={(e) =>
            handleWorkExperience(resumeData, setResumeData, e, index)
          }
        />
        <div className="flex gap-2">
          <select
            name="workType"
            aria-label={t('workType')}
            className="flex-1 min-w-0 other-input"
            value={workExperience.workType || "None"}
            onChange={(e) =>
              handleWorkExperience(resumeData, setResumeData, e, index)
            }
          >
            {WORK_TYPES.map((value) => (
              <option key={value} value={value}>{workTypeLabel(value)}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder={t('location')}
            name="location"
            className="flex-1 min-w-0 other-input"
            value={workExperience.location || ""}
            onChange={(e) =>
              handleWorkExperience(resumeData, setResumeData, e, index)
            }
          />
        </div>
        <textarea
          type="text"
          placeholder={t('description')}
          name="description"
          className="w-full other-input h-32"
          value={workExperience.description}
          maxLength="250"
          onChange={(e) =>
            handleWorkExperience(resumeData, setResumeData, e, index)
          }
        />
        <textarea
          type="text"
          placeholder={t('keyAchievements')}
          name="keyAchievements"
          className="w-full other-input h-40"
          value={workExperience.keyAchievements}
          onChange={(e) =>
            handleWorkExperience(resumeData, setResumeData, e, index)
          }
        />
        <Technologies technologies={workExperience.technologies} workIndex={index}/>
        <div
          className={"w-fill flex-wrap-gap-2"}
        >
          <input
            type="date"
            placeholder={t('startYear')}
            name="startYear"
            className="flex-1 m-0 other-input"
            value={workExperience.startYear}
            onChange={(e) =>
              handleWorkExperience(resumeData, setResumeData, e, index)
            }
          />
          <input
            type="date"
            placeholder={t('endYear')}
            name="endYear"
            className="flex-1 m-0 other-input"
            value={workExperience.endYear}
            onChange={(e) =>
              handleWorkExperience(resumeData, setResumeData, e, index)
            }
          />
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          removeWorkExperience(resumeData, setResumeData, index)
        }}
        aria-label={t('remove')}
        className="p-2 h-fit text-white bg-fuchsia-700 rounded text-xl"
      >
        <BsTrash3/>
      </button>
    </div>
  );
};

export default WorkExperience;
