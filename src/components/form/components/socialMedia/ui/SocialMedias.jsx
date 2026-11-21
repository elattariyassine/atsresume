import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import {addSocialMedia} from "../units/addSocialMedia";
import SocialMedia from "../components/SocialMedia";
import {MdAddCircle} from "react-icons/md";
import {useTranslation} from "../../../../../i18n/useTranslation";

const SocialMedias = () => {
  const {t} = useTranslation();
  const {resumeData, setResumeData} = useContext(ResumeContext);

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">{t('socialMedia')}</h2>
      {resumeData.socialMedia.map((socialMedia, index) => (
        <SocialMedia
          key={index}
          socialMedia={socialMedia}
          index={index}
        />
      ))}
      <button type="button"
              onClick={() => {
                addSocialMedia(resumeData, setResumeData)
              }}
              aria-label={t('add')}
              className="p-2 w-[37px] text-white bg-fuchsia-700 rounded text-xl">
        <MdAddCircle/>
      </button>
    </div>
  );
};

export default SocialMedias;
