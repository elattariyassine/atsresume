import React from 'react';

// The header and footer rows repeat on every printed page, giving each page a
// top and bottom margin while the @page margin stays 0 (see globals.css), which
// leaves browsers no room to print the URL, title and date.
const A4PageWrapper = ({children}) => {
  const alertA4Size = () => {
    const preview = document.querySelector(".preview");
    const previewHeight = preview.offsetHeight;
    if (previewHeight > 1122) {
      alert("A4 size exceeded");
    }
  };

  return (
    <div className="w-8.5in" onLoad={alertA4Size}>
      <table className="print-sheet">
        <thead aria-hidden="true">
          <tr><td className="print-sheet-gap"/></tr>
        </thead>
        <tbody>
          <tr><td>{children}</td></tr>
        </tbody>
        <tfoot aria-hidden="true">
          <tr><td className="print-sheet-gap"/></tr>
        </tfoot>
      </table>
    </div>
  );
};

export default A4PageWrapper;
