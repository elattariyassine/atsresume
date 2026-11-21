# 3. Load, save and refresh resume files

Makes editing a resume JSON file outside the app (in a text editor) a smooth workflow, and keeps old files loadable after new fields were added.

## Load

- The **Load Data** button opens a file picker for `.json` files.
- In browsers with the File System Access API (Chrome, Edge), it uses `showOpenFilePicker`, which returns a handle to the file on disk. Elsewhere, it falls back to a hidden `<input type="file">`.
- Cancelling the picker does nothing.
- Invalid JSON shows an alert naming the file, is logged to the console, and leaves the current resume unchanged.
- The fallback input is cleared after each pick, so choosing the same file again reloads it.

## Save

Unchanged from upstream: **Save Data** downloads the current resume as `<name> by ATSResume.json`.

## Refresh

A third button, **Refresh Data**, re-reads the last loaded file:

1. If the file was opened through a file handle, it re-reads the file from disk, so edits made in another editor appear immediately.
2. Otherwise, it re-reads the `File` object from the fallback input.
3. As a last resort, it restores the snapshot taken when the file was loaded, discarding in-app edits.

The button is disabled (dimmed, not clickable) until a file has been loaded; its tooltip names the file it will re-read. The loaded-file state lives in the builder, so it survives hiding and re-opening the form.

## Backward compatibility

Every loaded file is normalized before use. Missing fields are filled with defaults:

| Field | Default |
|---|---|
| `groupedSkills` | the default grouped skills |
| `useGroupedSkills` | `false` |
| `workExperience[].workType` | `"None"` |
| `workExperience[].location` | `""` |
| `workExperience[].technologies` | `[]` |
| `locale` (see [05](05-resume-language.md)) | `"en"` |
| `layout` (see [04](04-one-column-layout.md)) | `"two-column"` |
| `projects[].name` | taken from `projects[].title` if present (upstream bug), else `""` |
| missing text fields / lists | `""` / `[]` |

The same normalization applies to the built-in default resume, and is implemented once and shared.
