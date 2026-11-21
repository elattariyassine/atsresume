import {useContext} from "react";
import {ResumeContext} from "../components/builder";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

export const LOCALES = [
  {value: "en", label: "English", dateLocale: "en-US"},
  {value: "fr", label: "Français", dateLocale: "fr-FR"},
];

const DICTIONARIES = {en, fr};

const SKILL_TITLE_KEYS = {
  "Technical Skills": "technicalSkills",
  "Soft Skills": "softSkills",
  "Additional Skills": "additionalSkills",
};

const WORK_TYPE_KEYS = {
  None: "workTypeNone",
  Remote: "remote",
  "In-Office": "inOffice",
  Hybrid: "hybrid",
};

/**
 * Builds the translation helpers for a locale. Kept separate from the hook so
 * it can be used (and tested) without React.
 */
export const createTranslator = (locale) => {
  const dictionary = DICTIONARIES[locale] || en;
  const {dateLocale} = LOCALES.find((l) => l.value === locale) || LOCALES[0];

  // t("refreshFile", {file: "cv.json"}) -> "Re-read cv.json"
  const t = (key, params) => {
    const template = dictionary[key] ?? en[key] ?? key;
    return params
      ? template.replace(/\{(\w+)\}/g, (match, name) => params[name] ?? match)
      : template;
  };

  // Default skill sections are stored with English titles; renamed ones are shown as typed.
  const skillTitle = (title) => (SKILL_TITLE_KEYS[title] ? t(SKILL_TITLE_KEYS[title]) : title);

  const workTypeLabel = (workType) => t(WORK_TYPE_KEYS[workType] || "workTypeNone");

  const formatMonthYear = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    const month = date.toLocaleString(dateLocale, {month: "short"});
    return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${date.getFullYear()}`;
  };

  // "Feb 2023 - Mar 2023", "févr. 2023 - Présent"; empty when there is no valid start.
  const formatDateRange = (startYear, endYear, separator = " - ") => {
    const start = formatMonthYear(startYear);
    if (!start) return "";
    return `${start}${separator}${formatMonthYear(endYear) || t("present")}`;
  };

  return {t, locale, dateLocale, skillTitle, workTypeLabel, formatDateRange};
};

export const useTranslation = () => {
  const {resumeData, setResumeData} = useContext(ResumeContext);
  const locale = resumeData?.locale || "en";

  const setLocale = (value) => setResumeData({...resumeData, locale: value});

  return {...createTranslator(locale), setLocale};
};
