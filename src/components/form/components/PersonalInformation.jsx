import React, {useContext} from "react";
import {ResumeContext} from "../../builder";
import {useTranslation} from "../../../i18n/useTranslation";

const PersonalInformation = ({}) => {
  const {t} = useTranslation();
  const {resumeData, setResumeData, handleProfilePicture, handleChange} =
    useContext(ResumeContext);

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">{t('personalInformation')}</h2>
      <div className="grid-4">
        <input
          type="text"
          placeholder={t('fullName')}
          name="name"
          className="pi"
          value={resumeData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder={t('jobTitle')}
          name="position"
          className="pi"
          value={resumeData.position}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder={t('contactInformation')}
          name="contactInformation"
          className="pi"
          value={resumeData.contactInformation}
          onChange={handleChange}
          minLength="10"
          maxLength="15"
        />
        <input
          type="email"
          placeholder={t('email')}
          name="email"
          className="pi"
          value={resumeData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder={t('address')}
          name="address"
          className="pi"
          value={resumeData.address}
          onChange={handleChange}
        />
        <input
          type="file"
          name="profileImage"
          accept="image/*"
          className="profileInput"
          onChange={handleProfilePicture}
          placeholder={t('profilePicture')}
        />
      </div>
    </div>
  );
};

export default PersonalInformation;
