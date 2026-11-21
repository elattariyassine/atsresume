# 7. Editor panel

The left panel is redesigned for a calmer, more predictable editing experience. The printed resume is unaffected: the whole panel is excluded from print.

## Layout

From top to bottom:

1. **Toolbar** (sticky): *Open*, *Save*, *Reload*, a button to hide the editor, and a file chip showing the opened file's name and its status (*Opened at 14:32*, *Reloaded at…*, *Saved at…*, or *Unsaved changes* highlighted in amber).
2. **Resume settings** card: the three document-level choices as segmented controls — resume language (English / Français), layout (2 columns / 1 column) and skills format (Simple / Grouped). These used to be spread between the form and the preview.
3. **Sections**, in the order they appear on the resume: Personal information, Social media, Summary, Work experience, Projects, Skills, Education, Tests & certifications, Languages. Each section collapses and shows how many items it has.

Above the preview, a **Download PDF** button (and *Show editor* when the editor is hidden) replaces the two floating round buttons that used to overlap the content.

## Editing

- Every field has a visible label above it; placeholders only give examples.
- Jobs, education and projects are **cards**: collapsed by default with a title and a summary line (e.g. position · dates), and buttons to move the item up or down or delete it. A newly added item opens automatically. A card's open state follows it when it is moved or when an item above it is deleted. Opening or reloading a file resets the view.
- Simple lists (social links, skills, skill groups, technologies, languages, certifications) are rows with a delete button and an *Add …* button below.
- Text areas with a limit show a counter (summary 500, descriptions 250).
- The photo is chosen with a thumbnail preview and can be removed; the browser's native file input is no longer visible.

## Feedback

- Open, Reload and Save show a short message at the bottom of the screen, in the language of the resume (after Open, the language of the file just opened). An invalid file shows an error message instead of a browser alert.
- *Save* downloads the resume under the opened file's name (e.g. `fr.json`, otherwise `<name> by ATSResume.json`), pretty-printed, and marks the resume as saved.

## Implementation

Shared building blocks live in `src/components/form/ui/kit.jsx` (`Section`, `Field`, `TextInput`, `TextArea`, `Select`, `ItemCard`, `ListRow`, `AddButton`, `SegmentedControl`, `useItemCards`, `moveItem`); their styles are under "Editor panel" in `src/styles/globals.css`. The toolbar is `src/components/form/ui/Toolbar.jsx` and the settings card `ResumeSettings.jsx`.
