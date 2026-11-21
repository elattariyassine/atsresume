import React, {useContext} from "react";
import {BsFilePdf, BsLayoutSidebarInsetReverse} from "react-icons/bs";
import {ResumeContext} from "../../builder";
import {useTranslation} from "../../../i18n/useTranslation";

/** Actions above the preview; never printed. */
const PreviewToolbar = () => {
  const {formClose, setFormClose} = useContext(ResumeContext);
  const {t} = useTranslation();

  return (
    <div className="exclude-print flex items-center gap-2 mb-3">
      {formClose && (
        <button type="button" className="toolbar-button" onClick={() => setFormClose(false)}>
          <BsLayoutSidebarInsetReverse aria-hidden="true"/>{t("showEditor")}
        </button>
      )}
      <button
        type="button"
        className="toolbar-button toolbar-button-primary ml-auto"
        onClick={() => window.print()}
      >
        <BsFilePdf aria-hidden="true"/>{t("downloadPdf")}
      </button>
    </div>
  );
};

export default PreviewToolbar;
