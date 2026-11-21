import React, {useContext} from 'react';
import {handleSocialMedia} from "../units/handleSocialMedia";
import {ResumeContext} from "../../../../builder";
import {removeSocialMedia} from "../units/removeSocialMedia";
import {useTranslation} from "../../../../../i18n/useTranslation";
import {ListRow, TextInput} from "../../../ui/kit";

const SocialMedia = ({socialMedia, index}) => {
  const {t} = useTranslation();
  const {resumeData, setResumeData} = useContext(ResumeContext);
  const onChange = (e) => handleSocialMedia(resumeData, setResumeData, e, index);

  return (
    <ListRow removeLabel={t("remove")} onRemove={() => removeSocialMedia(resumeData, setResumeData, index)}>
      <TextInput
        name="socialMedia"
        aria-label={t("network")}
        placeholder={t("network")}
        className="basis-28 shrink-0"
        value={socialMedia.socialMedia}
        onChange={onChange}
      />
      <TextInput
        name="link"
        aria-label={t("link")}
        placeholder="github.com/username"
        value={socialMedia.link}
        onChange={onChange}
      />
    </ListRow>
  );
};

export default SocialMedia;
