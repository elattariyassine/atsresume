import React, {useContext, useRef} from "react";
import {BsPersonCircle} from "react-icons/bs";
import {ResumeContext} from "../../builder";
import {useTranslation} from "../../../i18n/useTranslation";
import {Field, Section, TextInput} from "../ui/kit";

const PhotoPicker = () => {
  const {t} = useTranslation();
  const {resumeData, setResumeData, handleProfilePicture} = useContext(ResumeContext);
  const inputRef = useRef(null);
  const photo = resumeData.profilePicture;

  return (
    <div className="field sm:col-span-2">
      <span className="field-label">{t("photo")}</span>
      <div className="photo-picker">
        {photo
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={photo} alt="" className="photo-thumb"/>
          : <BsPersonCircle className="photo-thumb p-2 text-slate-400" aria-hidden="true"/>}
        <button type="button" className="toolbar-button" onClick={() => inputRef.current?.click()}>
          {photo ? t("changePhoto") : t("uploadPhoto")}
        </button>
        {photo && (
          <button
            type="button"
            className="text-sm text-slate-600 underline hover:text-red-700"
            onClick={() => setResumeData({...resumeData, profilePicture: ""})}
          >
            {t("removePhoto")}
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          aria-label={t("uploadPhoto")}
          onChange={(e) => {
            handleProfilePicture(e);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
};

const PersonalInformation = () => {
  const {t} = useTranslation();
  const {resumeData, handleChange} = useContext(ResumeContext);

  return (
    <Section title={t("personalInformation")}>
      <div className="form-grid">
        <Field label={t("fullName")}>
          <TextInput name="name" autoComplete="name" value={resumeData.name} onChange={handleChange}/>
        </Field>
        <Field label={t("jobTitle")}>
          <TextInput name="position" value={resumeData.position} onChange={handleChange}/>
        </Field>
        <Field label={t("email")}>
          <TextInput type="email" name="email" autoComplete="email" value={resumeData.email} onChange={handleChange}/>
        </Field>
        <Field label={t("contactInformation")}>
          <TextInput type="tel" name="contactInformation" autoComplete="tel" value={resumeData.contactInformation} onChange={handleChange}/>
        </Field>
        <Field label={t("address")} className="sm:col-span-2">
          <TextInput name="address" value={resumeData.address} onChange={handleChange}/>
        </Field>
        <PhotoPicker/>
      </div>
    </Section>
  );
};

export default PersonalInformation;
