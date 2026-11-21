# 6. Small changes

- **No watermark in print.** Upstream adds "Created using https://atsresume.vercel.app/" to printed pages via `.preview::after`. The fork removes it so the PDF contains only the resume.
- **Certification items in the preview** can be edited in place (and formatted with the highlight menu), like key achievements.
- **Always light.** The page declares `color-scheme: light` and a white background, so the preview looks like paper even when the browser is in dark mode.
- **`.i-semi-bold` utility class** (font-weight 600), used by the new sections.
- **`.idea` in `.gitignore`.**
