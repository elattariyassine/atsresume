import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import {addSocialMedia} from "../units/addSocialMedia";
import SocialMedia from "../components/SocialMedia";
import {useTranslation} from "../../../../../i18n/useTranslation";
import {AddButton, Section} from "../../../ui/kit";

const SocialMedias = () => {
  const {t} = useTranslation();
  const {resumeData, setResumeData} = useContext(ResumeContext);

  return (
    <Section title={t("socialMedia")} count={resumeData.socialMedia.length}>
      {resumeData.socialMedia.map((socialMedia, index) => (
        <SocialMedia key={index} socialMedia={socialMedia} index={index}/>
      ))}
      <AddButton label={t("addSocialLink")} onClick={() => addSocialMedia(resumeData, setResumeData)}/>
    </Section>
  );
};

export default SocialMedias;
