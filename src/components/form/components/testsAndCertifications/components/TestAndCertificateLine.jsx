import React from 'react';
import {handleCertificate} from "../utils/handleCertificate";
import {removeCertificate} from "../utils/removeCertificate";
import {useTranslation} from "../../../../../i18n/useTranslation";
import {ListRow, TextInput} from "../../../ui/kit";

const TestAndCertificateLine = ({resumeData, setResumeData, cert, index}) => {
  const {t} = useTranslation();

  return (
    <ListRow removeLabel={t("remove")} onRemove={() => removeCertificate(resumeData, setResumeData, index)}>
      <TextInput
        aria-label={t("testOrCertificate")}
        placeholder={t("testOrCertificate")}
        name="Certificate"
        value={cert}
        onChange={(e) => handleCertificate(resumeData, setResumeData, e, index)}
      />
    </ListRow>
  );
};

export default TestAndCertificateLine;
