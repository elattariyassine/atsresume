import DefaultResumeData from "./DefaultResumeData";

const clone = (value) => JSON.parse(JSON.stringify(value));

const LOCALES = ["en", "fr"];
const LAYOUTS = ["two-column", "one-column"];
const WORK_TYPES = ["None", "Remote", "In-Office", "Hybrid"];

/**
 * Returns a deep copy of a resume with every field the app relies on present.
 * Older files (from upstream or earlier versions of this fork) miss the newer
 * fields; they get the defaults below instead of crashing the UI.
 */
export const normalizeResumeData = (data) => {
  const resume = clone(data || {});
  const defaults = clone(DefaultResumeData);

  for (const key of ["name", "position", "contactInformation", "email", "address", "profilePicture", "summary"]) {
    if (typeof resume[key] !== "string") resume[key] = "";
  }
  for (const key of ["socialMedia", "education", "workExperience", "projects", "skills", "languages", "certifications"]) {
    if (!Array.isArray(resume[key])) resume[key] = [];
  }

  resume.workExperience = resume.workExperience.map((work) => ({
    ...work,
    workType: WORK_TYPES.includes(work.workType) ? work.workType : "None",
    location: typeof work.location === "string" ? work.location : "",
    technologies: Array.isArray(work.technologies) ? work.technologies : [],
  }));

  if (!Array.isArray(resume.groupedSkills)) resume.groupedSkills = defaults.groupedSkills;
  resume.useGroupedSkills = resume.useGroupedSkills === true;

  if (!LOCALES.includes(resume.locale)) resume.locale = "en";
  if (!LAYOUTS.includes(resume.layout)) resume.layout = "two-column";

  return resume;
};
