import { FaCloudUploadAlt, FaCloudDownloadAlt, FaRedoAlt } from "react-icons/fa";
import React, { useContext, useRef } from "react";
import {ResumeContext} from "../../builder";
import {useTranslation} from "../../../i18n/useTranslation";

const JSON_PICKER_OPTIONS = {
  types: [{ description: "JSON resume", accept: { "application/json": [".json"] } }],
  excludeAcceptAllOption: true,
  multiple: false,
};

const readJsonFile = async (file) => JSON.parse(await file.text());

const LoadUnload = () => {
  const {t} = useTranslation();
  const { resumeData, loadedResume, loadResume, restoreLoadedResume } = useContext(ResumeContext);
  const fileInputRef = useRef(null);

  const loadFile = async (file, handle = null) => {
    try {
      loadResume(await readJsonFile(file), { file, handle });
    } catch (error) {
      console.error("Unable to load resume JSON", error);
      alert(t('invalidFile', {file: file.name}));
    }
  };

  // Prefer the File System Access API: its handle lets Refresh re-read the
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

  const handleRefresh = async () => {
    if (!loadedResume) return;
    try {
      if (loadedResume.handle) {
        await loadFile(await loadedResume.handle.getFile(), loadedResume.handle);
        return;
      }
      if (loadedResume.file) {
        await loadFile(loadedResume.file);
        return;
      }
    } catch (error) {
      console.error("Unable to re-read resume file", error);
    }
    restoreLoadedResume();
  };

  // download resume data
  const handleDownload = (data, filename, event) => {
    event.preventDefault();
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <div className="flex flex-wrap gap-4 mb-2 justify-center">
      <div className="inline-flex flex-row items-center gap-2">
        <h2 className="text-[1.2rem] text-white">{t('loadData')}</h2>
        <button
          type="button"
          aria-label={t('loadData')}
          className="p-2 text-white bg-fuchsia-700 rounded cursor-pointer"
          onClick={handleOpen}
        >
          <FaCloudUploadAlt className="text-[1.2rem] text-white" />
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
      <div className="inline-flex flex-row items-center gap-2">
        <h2 className="text-[1.2rem] text-white">{t('saveData')}</h2>
        <button
          type="button"
          aria-label={t('saveData')}
          className="p-2 text-white bg-fuchsia-700 rounded"
          onClick={(event) =>
            handleDownload(
              resumeData,
              resumeData.name + " by ATSResume.json",
              event
            )
          }
        >
          <FaCloudDownloadAlt className="text-[1.2rem] text-white" />
        </button>
      </div>
      <div className="inline-flex flex-row items-center gap-2">
        <h2 className="text-[1.2rem] text-white">{t('refreshData')}</h2>
        <button
          type="button"
          aria-label={t('refreshData')}
          title={loadedResume ? t('refreshFile', {file: loadedResume.file?.name ?? ''}) : t('refreshDisabled')}
          className="p-2 text-white bg-fuchsia-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleRefresh}
          disabled={!loadedResume}
        >
          <FaRedoAlt className="text-[1.2rem] text-white" />
        </button>
      </div>
    </div>
  );
};

export default LoadUnload;
