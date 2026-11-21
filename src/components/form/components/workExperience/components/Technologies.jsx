import React, {useContext} from "react";
import {BsTrash3} from "react-icons/bs";
import {MdAddCircle} from "react-icons/md";
import {ResumeContext} from "../../../../builder";
import {addTechnology, handleTechnology, removeTechnology} from "../units/technologies";

const Technologies = ({technologies = [], workIndex}) => {
  const {resumeData, setResumeData} = useContext(ResumeContext);

  return (
    <div className="flex-col-gap-2 mb-2">
      <h3 className="text-white font-semibold">Technologies Used</h3>
      {technologies.map((technology, techIndex) => (
        <div key={techIndex} className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Category (e.g. Frontend)"
            aria-label="Technology category"
            className="flex-1 min-w-0 mb-0 other-input"
            value={technology.category}
            onChange={(e) =>
              handleTechnology(resumeData, setResumeData, workIndex, techIndex, "category", e.target.value)
            }
          />
          <input
            type="text"
            placeholder="Technologies (e.g. React, Node.js)"
            aria-label="Technologies"
            className="flex-[2] min-w-0 mb-0 other-input"
            value={technology.tech}
            onChange={(e) =>
              handleTechnology(resumeData, setResumeData, workIndex, techIndex, "tech", e.target.value)
            }
          />
          <button
            type="button"
            onClick={() => removeTechnology(resumeData, setResumeData, workIndex, techIndex)}
            aria-label="Remove technology"
            className="p-2 text-white bg-fuchsia-700 rounded text-xl"
          >
            <BsTrash3/>
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addTechnology(resumeData, setResumeData, workIndex)}
        aria-label="Add technology"
        className="p-2 w-[37px] text-white bg-fuchsia-700 rounded text-xl"
      >
        <MdAddCircle/>
      </button>
    </div>
  );
};

export default Technologies;
