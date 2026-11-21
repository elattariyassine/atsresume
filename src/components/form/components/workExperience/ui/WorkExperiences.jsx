import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import WorkExperience from "../components/WorkExperience";
import {MdAddCircle} from "react-icons/md";
import {addWorkExperience} from "../units/addWorkExperience";
import {useTranslation} from "../../../../../i18n/useTranslation";

const WorkExperiences = () => {
  const {t} = useTranslation();
  const {
    resumeData,
    setResumeData,
  } = useContext(ResumeContext);

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">{t('workExperience')}</h2>
      {resumeData.workExperience.map((workExperience, index) => (
        <WorkExperience
          key={index}
          workExperience={workExperience}
          index={index}
        />
      ))}
      <button type="button"
              onClick={() => {
                // TODO add index
                addWorkExperience(resumeData, setResumeData)
              }}
              aria-label={t('add')}
              className="p-2 w-[37px] text-white bg-fuchsia-700 rounded text-xl">
        <MdAddCircle/>
      </button>
    </div>
  );
};

export default WorkExperiences;
