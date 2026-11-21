import React, {useContext} from "react";
import {ResumeContext} from "../../builder";

const LAYOUTS = [
  {value: "two-column", label: "2 Columns"},
  {value: "one-column", label: "1 Column"},
];

const LayoutToggle = () => {
  const {resumeData, setResumeData} = useContext(ResumeContext);
  const current = resumeData.layout || "two-column";

  return (
    <div
      className="exclude-print flex items-center justify-end gap-1 mb-3"
      role="group"
      aria-label="Resume layout"
    >
      <span className="mr-2 text-sm font-semibold text-gray-700">Layout</span>
      {LAYOUTS.map(({value, label}, index) => (
        <button
          key={value}
          type="button"
          aria-pressed={current === value}
          onClick={() => setResumeData({...resumeData, layout: value})}
          className={`px-3 py-1 text-sm border border-fuchsia-600 ${
            index === 0 ? "rounded-l" : "rounded-r"
          } ${
            current === value
              ? "bg-fuchsia-600 text-white"
              : "bg-white text-fuchsia-700"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default LayoutToggle;
