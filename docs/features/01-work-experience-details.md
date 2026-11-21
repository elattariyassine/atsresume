# 1. Work experience details

Adds three optional fields to each work experience: how the job was done (work type), where (location), and which technologies were used.

## Data

Each `workExperience[]` item gains:

```json
{
  "workType": "Remote",
  "location": "San Francisco, CA",
  "technologies": [
    { "category": "Frontend", "tech": "React, TypeScript, CSS3" },
    { "category": "Backend", "tech": "Node.js, Express, MongoDB" }
  ]
}
```

- `workType`: one of `"None"`, `"Remote"`, `"In-Office"`, `"Hybrid"`. `"None"` means "don't show". Default `"None"`.
- `location`: free text. Default `""`.
- `technologies`: list of `{ category, tech }` rows. Default `[]`.

Older resume files without these fields must load without errors (see [03-load-save-refresh.md](03-load-save-refresh.md)).

## Form

Inside each work experience block, after Job Title:

1. **Work type** select: None / Remote / In-Office / Hybrid.
2. **Location** text input.

After Key Achievements, a **Technologies Used** sub-section:

- one row per technology with two inputs side by side: *Category (e.g. Frontend, Backend)* and *Technologies (e.g. React, Node.js)*
- add and remove buttons; new work experiences start with no technology rows

## Preview (two-column layout)

- Under the company/date line, the position is shown on the left and, on the right, `location · work type` (only the parts that are set; work type hidden when `"None"`).
- After the key achievements, if there are technologies: a **Technologies** label, then one line per row: `Category: tech`, category underlined.

## Default resume

The sample resume includes realistic values for all three fields on each sample job, so the feature is visible on first load.
