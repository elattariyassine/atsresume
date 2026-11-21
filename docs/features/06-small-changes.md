# 6. Small changes

- **No watermark in print.** Upstream adds "Created using https://atsresume.vercel.app/" to printed pages via `.preview::after`. The fork removes it so the PDF contains only the resume.
- **Certification items in the preview** can be edited in place (and formatted with the highlight menu), like key achievements.
- **Always light.** The page declares `color-scheme: light` and a white background, so the preview looks like paper even when the browser is in dark mode.
- **`.i-semi-bold` utility class** (font-weight 600), used by the new sections.
- **`.idea` in `.gitignore`.**
- **No browser header or footer in printed PDFs.** `@page` margins are 0, so browsers have no room to print the URL, date and title; side margins come from padding and top/bottom margins from table header/footer rows that repeat on every page. The printed preview also takes the full page width (the on-screen 60% split no longer applies).
- **Page metadata.** Upstream's `Meta` component uses `next/head`, which the App Router ignores, so the page had no title, description or favicon. They are now set through the layout's `metadata`, and the title follows the resume (`Jane Doe - CV`), which browsers use as the saved PDF's file name.
