import React, {useContext} from 'react';
import {handleWorkExperience} from "../units/handleWorkExperience";
import {ResumeContext} from "../../../../builder";
import {BsTrash3} from "react-icons/bs";
import {removeWorkExperience} from "../units/removeResumeExperience";
import Technologies from "./Technologies";

const WORK_TYPES = [
  {value: "None", label: "Work type: not shown"},
  {value: "Remote", label: "Remote"},
  {value: "In-Office", label: "In-Office"},
  {value: "Hybrid", label: "Hybrid"},
];

const WorkExperience = ({workExperience, index}) => {
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
          placeholder="Company"
          name="company"
          className="w-full other-input"
          value={workExperience.company}
          onChange={(e) =>
            handleWorkExperience(resumeData, setResumeData, e, index)
          }
        />
        <input
          type="text"
          placeholder="Job Title"
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
            aria-label="Work type"
            className="flex-1 min-w-0 other-input"
            value={workExperience.workType || "None"}
            onChange={(e) =>
              handleWorkExperience(resumeData, setResumeData, e, index)
            }
          >
            {WORK_TYPES.map(({value, label}) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Location"
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
          placeholder="Description"
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
          placeholder="Key Achievements"
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
            placeholder="Start Year"
            name="startYear"
            className="flex-1 m-0 other-input"
            value={workExperience.startYear}
            onChange={(e) =>
              handleWorkExperience(resumeData, setResumeData, e, index)
            }
          />
          <input
            type="date"
            placeholder="End Year"
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
        aria-label="Remove"
        className="p-2 h-fit text-white bg-fuchsia-700 rounded text-xl"
      >
        <BsTrash3/>
      </button>
    </div>
  );
};

export default WorkExperience;
