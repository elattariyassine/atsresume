import React from 'react';
import {handleLanguage} from "../utils/handleLanguage";
import {removeLanguage} from "../utils/removeLanguage";
import {useTranslation} from "../../../../../i18n/useTranslation";
import {ListRow, TextInput} from "../../../ui/kit";

const LanguageLine = ({resumeData, setResumeData, lang, index}) => {
  const {t} = useTranslation();

  return (
    <ListRow removeLabel={t("remove")} onRemove={() => removeLanguage(resumeData, setResumeData, index)}>
      <TextInput
        aria-label={t("language")}
        placeholder={t("language")}
        name="language"
        value={lang}
        onChange={(e) => handleLanguage(resumeData, setResumeData, e, index, "languages")}
      />
    </ListRow>
  );
};

export default LanguageLine;
