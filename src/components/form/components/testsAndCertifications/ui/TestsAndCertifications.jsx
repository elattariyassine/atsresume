import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import {addCertificate} from "../utils/addCertificate";
import TestAndCertificateLine from "../components/TestAndCertificateLine";
import {MdAddCircle} from "react-icons/md";
import {useTranslation} from "../../../../../i18n/useTranslation";

const TestsAndCertifications = () => {
  const {t} = useTranslation();
  const {resumeData, setResumeData} = useContext(ResumeContext);
  const title = t('testsAndCertifications');

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">{title}</h2>
      {resumeData["certifications"].map((cert, index) => (
        <TestAndCertificateLine
          key={index}
          resumeData={resumeData}
          setResumeData={setResumeData}
          cert={cert}
          index={index}
        />
      ))}
      <button type="button"
              onClick={() => {
                addCertificate(resumeData, setResumeData)
              }}
              aria-label={t('add')}
              className="p-2 w-[37px] text-white bg-fuchsia-700 rounded text-xl">
        <MdAddCircle/>
      </button>
    </div>
  );
};

export default TestsAndCertifications;
