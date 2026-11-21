# 6. Small changes

- **No watermark in print.** Upstream adds "Created using https://atsresume.vercel.app/" to printed pages via `.preview::after`. The fork removes it so the PDF contains only the resume.
- **Certifications and languages in the preview** render their content without an extra wrapper `div`, matching the other left-column sections; certification items can be edited in place, like key achievements.
- **`.i-semi-bold` utility class** (font-weight 600), used by the new sections.
- **`.idea` in `.gitignore`.**
