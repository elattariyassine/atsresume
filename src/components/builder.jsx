"use client"

import React, {createContext, useCallback, useEffect, useMemo, useRef, useState} from "react";
import Meta from "../components/meta/Meta";
import Preview from "../components/preview/ui/Preview";
import DefaultResumeData from "../components/utility/DefaultResumeData";
import Form from "../components/form/ui/Form";
import {normalizeResumeData} from "../components/utility/normalizeResumeData";

const ResumeContext = createContext(DefaultResumeData);

const serialize = (data) => JSON.stringify(data);

export default function Builder() {
  // resume data
  const [resumeData, setResumeData] = useState(() => normalizeResumeData(DefaultResumeData));

  // last loaded resume file, so it can be re-read after external edits
  const [loadedResume, setLoadedResumeState] = useState(null);

  // what the resume looked like when it was last loaded or saved
  const [savedSnapshot, setSavedSnapshot] = useState(() => serialize(resumeData));
  const isDirty = useMemo(() => serialize(resumeData) !== savedSnapshot, [resumeData, savedSnapshot]);

  // last file action, shown in the toolbar: {action: "loaded" | "reloaded" | "saved", at: Date}
  const [fileStatus, setFileStatus] = useState(null);

  // bumped on every open/reload so the editor starts from a clean view
  const [loadVersion, setLoadVersion] = useState(0);

  const loadResume = (data, source = {}, action = "loaded") => {
    const normalized = normalizeResumeData(data);
    setLoadedResumeState({snapshot: normalized, ...source});
    setResumeData(normalizeResumeData(normalized));
    setSavedSnapshot(serialize(normalized));
    setFileStatus({action, at: new Date()});
    setLoadVersion((version) => version + 1);
    return normalized;
  };

  const restoreLoadedResume = () => {
    if (!loadedResume) return;
    setResumeData(normalizeResumeData(loadedResume.snapshot));
    setSavedSnapshot(serialize(loadedResume.snapshot));
    setFileStatus({action: "reloaded", at: new Date()});
    setLoadVersion((version) => version + 1);
  };

  const markSaved = () => {
    setSavedSnapshot(serialize(resumeData));
    setFileStatus({action: "saved", at: new Date()});
  };

  // short-lived notifications
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);
  const notify = useCallback((message, tone = "info") => {
    const id = ++toastId.current;
    setToasts((current) => [...current, {id, message, tone}]);
    setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 3000);
  }, []);

  // Keep the document language in sync with the resume, so printed PDFs carry it.
  useEffect(() => {
    document.documentElement.lang = resumeData.locale;
  }, [resumeData.locale]);

  // Browsers name a saved PDF after the page title: "Jane Doe - CV.pdf"
  // instead of the server address.
  useEffect(() => {
    const name = resumeData.name?.trim();
    document.title = name ? `${name} - CV` : "ATSResume";
  }, [resumeData.name]);

  // editor panel hide/show
  const [formClose, setFormClose] = useState(false);

  // profile picture
  const handleProfilePicture = (e) => {
    const file = e.target.files[0];

    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeData({...resumeData, profilePicture: event.target.result});
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file type");
    }
  };

  const handleChange = (e) => {
    setResumeData({...resumeData, [e.target.name]: e.target.value});
  };

  return (
    <>
      <ResumeContext.Provider
        value={{
          resumeData,
          setResumeData,
          loadedResume,
          loadResume,
          restoreLoadedResume,
          isDirty,
          fileStatus,
          loadVersion,
          markSaved,
          notify,
          formClose,
          setFormClose,
          handleProfilePicture,
          handleChange,
        }}
      >
        <Meta
          title="ATSResume | Get hired with an ATS-optimized resume"
          description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes. Our platform uses the latest technology to analyze and optimize your resume for maximum visibility and success with applicant tracking systems. Say goodbye to frustration and wasted time spent on manual resume formatting. Create your winning resume with ATSResume today and get noticed by employers."
          keywords="ATS-friendly, Resume optimization, Keyword-rich resume, Applicant Tracking System, ATS resume builder, ATS resume templates, ATS-compliant resume, ATS-optimized CV, ATS-friendly format, ATS resume tips, Resume writing services, Career guidance, Job search in India, Resume tips for India, Professional resume builder, Cover letter writing, Interview preparation, Job interview tips, Career growth, Online job applications, resume builder, free resume builder, resume ats, best free resume builder, resume creator, resume cv, resume design, resume editor, resume maker"
        />
        <div className="builder-layout f-col md:flex-row justify-evenly max-w-7xl md:mx-auto md:h-screen">
          {!formClose && (
            <Form/>
          )}
          <Preview/>
        </div>
        <div className="toast-region exclude-print" role="status" aria-live="polite">
          {toasts.map((toast) => (
            <div key={toast.id} className={`toast ${toast.tone === "error" ? "toast-error" : ""}`}>
              {toast.message}
            </div>
          ))}
        </div>
      </ResumeContext.Provider>
    </>
  );
}
export {ResumeContext};
