# 4. One-column ATS layout

A second preview layout: a single column in plain document order. Applicant tracking systems parse single-column resumes more reliably than multi-column ones, because text is read top to bottom without having to guess the column order.

## Switching

- A **Layout** toggle above the preview with two buttons: *2 Columns* (default, upstream's layout) and *1 Column*.
- The toggle is excluded from print.
- The chosen layout is stored in the resume (`"layout": "two-column" | "one-column"`), so a saved file reopens in the same layout.

## Section order

1. **Header**: name (large, bold), position, then a line of contact items separated by ` · ` (email as `mailto:`, phone as `tel:`, address), then a line of social links (link text, no icons). Profile picture, if set, as a small circle on the right.
2. Dashed divider.
3. **Summary**
4. **Work Experience**: per job, the company in bold; a meta line `position · location · work type · date range`; description; key achievements as bullets; a `Technologies: Category: tech · Category: tech` line.
5. **Projects**: name in bold; date range; link; description; key achievements as bullets.
6. **Main skills**: the first skill section (Technical Skills by default, under whatever title the user gave it), one line per list or group, `Label: values`, label semibold.
7. **Education**: `School - Degree` in bold, date range below.
8. **Certifications**: bulleted list.
9. **Languages**: values joined with ` · `.
10. **Other skill sections**: same format. Grouped skills get one section per skill section, under its own title; simple skills share one section titled with the section names joined by " / ", each line prefixed with its section name.

## Rules

- Empty sections and empty items are hidden. Empty fields inside an item produce no stray separators.
- Skills follow the Simple / Grouped choice from [02](02-grouped-skills.md).
- Links without a protocol get `http://` prepended.
- Work experiences, projects and their key achievements can be reordered by drag and drop, like the two-column layout. Key achievements and certifications stay editable in place.
- Section titles: uppercase, small, letter-spaced, fuchsia, thin bottom border.
- Print: a long job or project may continue on the next page, but its company/meta lines stay with what follows, a bullet is never split, and a section title is never the last line of a page.
- Dates use the resume language (see [05](05-resume-language.md)) and the format `Mon YYYY - Mon YYYY` or `... - Present`.
