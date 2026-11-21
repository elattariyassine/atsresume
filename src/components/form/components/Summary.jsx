import React, {useContext} from "react";
import {ResumeContext} from "../../builder";
import {useTranslation} from "../../../i18n/useTranslation";
import {Field, Section, TextArea} from "../ui/kit";

const SUMMARY_MAX = 500;

const Summary = () => {
  const {t} = useTranslation();
  const {resumeData, handleChange} = useContext(ResumeContext);

  return (
    <Section title={t("summary")}>
      <Field label={t("summary")} counter={{value: resumeData.summary.length, max: SUMMARY_MAX}}>
        <TextArea name="summary" rows={6} value={resumeData.summary} onChange={handleChange} maxLength={SUMMARY_MAX}/>
      </Field>
    </Section>
  );
};

export default Summary;
