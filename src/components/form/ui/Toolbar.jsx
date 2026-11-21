import React, {useContext, useRef} from "react";
import {BsFolder2Open, BsDownload, BsArrowClockwise, BsLayoutSidebarInset, BsCircleFill} from "react-icons/bs";
import {ResumeContext} from "../../builder";
import {createTranslator, useTranslation} from "../../../i18n/useTranslation";

const JSON_PICKER_OPTIONS = {
  types: [{description: "JSON resume", accept: {"application/json": [".json"]}}],
  excludeAcceptAllOption: true,
  multiple: false,
};

const readJsonFile = async (file) => JSON.parse(await file.text());

const STATUS_KEYS = {loaded: "statusLoaded", reloaded: "statusReloaded", saved: "statusSaved"};

/** Sticky header of the editor: open, save and reload the resume file. */
const Toolbar = () => {
  const {
    resumeData, loadedResume, loadResume, restoreLoadedResume,
    isDirty, fileStatus, markSaved, notify, setFormClose,
  } = useContext(ResumeContext);
  const {t, locale} = useTranslation();
  const fileInputRef = useRef(null);

  const loadFile = async (file, handle = null, action = "loaded") => {
    try {
      const loaded = loadResume(await readJsonFile(file), {file, handle}, action);
      // Speak the language of the file just opened, not the previous one.
      const {t: tLoaded} = createTranslator(loaded.locale);
      notify(tLoaded(action === "reloaded" ? "toastReloaded" : "toastLoaded", {file: file.name}));
    } catch (error) {
      console.error("Unable to load resume JSON", error);
      notify(t("invalidFile", {file: file.name}), "error");
    }
  };

  // Prefer the File System Access API: its handle lets Reload re-read the
  // file from disk after it was edited elsewhere.
  const handleOpen = async () => {
    if (typeof window !== "undefined" && window.showOpenFilePicker) {
      try {
        const [handle] = await window.showOpenFilePicker(JSON_PICKER_OPTIONS);
        await loadFile(await handle.getFile(), handle);
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
        console.error("File picker failed, falling back to file input", error);
      }
    }
    fileInputRef.current?.click();
  };

  // Fallback for browsers without the File System Access API.
  const handleInputChange = (event) => {
    const file = event.target.files[0];
    event.target.value = "";
    if (file) loadFile(file);
  };

  const handleReload = async () => {
    if (!loadedResume) return;
    try {
      if (loadedResume.handle) {
        await loadFile(await loadedResume.handle.getFile(), loadedResume.handle, "reloaded");
        return;
      }
      if (loadedResume.file) {
        await loadFile(loadedResume.file, null, "reloaded");
        return;
      }
    } catch (error) {
      console.error("Unable to re-read resume file", error);
    }
    restoreLoadedResume();
    notify(t("toastReloaded", {file: loadedResume.file?.name ?? ""}));
  };

  const handleSave = () => {
    const filename = loadedResume?.file?.name || `${resumeData.name || "resume"} by ATSResume.json`;
    const blob = new Blob([JSON.stringify(resumeData, null, 2)], {type: "application/json"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
    markSaved();
    notify(t("toastSaved", {file: filename}));
  };

  const fileName = loadedResume?.file?.name;
  const time = fileStatus?.at.toLocaleTimeString(locale, {hour: "2-digit", minute: "2-digit"});
  const status = isDirty
    ? t("unsavedChanges")
    : fileStatus ? t(STATUS_KEYS[fileStatus.action], {time}) : null;

  return (
    <div className="toolbar exclude-print">
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className="toolbar-button" onClick={handleOpen} title={t("openFile")}>
          <BsFolder2Open aria-hidden="true"/>{t("loadData")}
        </button>
        <button type="button" className="toolbar-button" onClick={handleSave} title={t("saveFile")}>
          <BsDownload aria-hidden="true"/>{t("saveData")}
        </button>
        <button
          type="button"
          className="toolbar-button"
          onClick={handleReload}
          disabled={!loadedResume}
          title={loadedResume ? t("refreshFile", {file: fileName ?? ""}) : t("refreshDisabled")}
        >
          <BsArrowClockwise aria-hidden="true"/>{t("refreshData")}
        </button>
        <input
          ref={fileInputRef}
          aria-hidden="true"
          tabIndex={-1}
          type="file"
          className="hidden"
          onChange={handleInputChange}
          accept=".json,application/json"
        />
      </div>
      <button
        type="button"
        className="icon-button ml-auto"
        onClick={() => setFormClose(true)}
        aria-label={t("hideEditor")}
        title={t("hideEditor")}
      >
        <BsLayoutSidebarInset/>
      </button>
      <div className="basis-full">
        <div className={`file-chip ${isDirty ? "file-chip-dirty" : ""}`}>
        {isDirty && <BsCircleFill className="w-1.5 h-1.5 shrink-0" aria-hidden="true"/>}
        <span className="truncate font-medium">{fileName || t("noFile")}</span>
        {status && <span className="shrink-0">· {status}</span>}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
