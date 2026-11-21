import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import {addCertificate} from "../utils/addCertificate";
import TestAndCertificateLine from "../components/TestAndCertificateLine";
import {useTranslation} from "../../../../../i18n/useTranslation";
import {AddButton, Section} from "../../../ui/kit";

const TestsAndCertifications = () => {
  const {t} = useTranslation();
  const {resumeData, setResumeData} = useContext(ResumeContext);

  return (
    <Section title={t("testsAndCertifications")} count={resumeData.certifications.length}>
      {resumeData.certifications.map((cert, index) => (
        <TestAndCertificateLine
          key={index}
          resumeData={resumeData}
          setResumeData={setResumeData}
          cert={cert}
          index={index}
        />
      ))}
      <AddButton label={t("addCertificate")} onClick={() => addCertificate(resumeData, setResumeData)}/>
    </Section>
  );
};

export default TestsAndCertifications;
