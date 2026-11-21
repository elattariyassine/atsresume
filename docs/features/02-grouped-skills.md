# 2. Grouped skills

Lets the user present skills either as the original flat lists or as named groups within each skill section (for example *Frontend: React, Vue.js, HTML5*).

## Data

```json
{
  "useGroupedSkills": false,
  "groupedSkills": [
    {
      "title": "Technical Skills",
      "groups": [
        { "groupName": "Languages & Scripting", "skills": "JavaScript, TypeScript, Python" },
        { "groupName": "Frontend Technologies", "skills": "React, Vue.js, HTML5, CSS3" }
      ]
    },
    { "title": "Soft Skills", "groups": [ ... ] },
    { "title": "Additional Skills", "groups": [ ... ] }
  ]
}
```

- `useGroupedSkills`: `false` shows the flat `skills` lists (upstream behaviour); `true` shows `groupedSkills`.
- Both structures are kept, so switching back and forth loses nothing.
- Section titles are the same three as the flat skills (Technical, Soft, Additional).

## Form

- A **Skills Format** control above the skills with two radio options: *Simple Skills* / *Grouped Skills*.
- Simple: upstream's skills form, unchanged.
- Grouped: for each section, its title, then one row per group with *Group name* and *Skills in group* inputs side by side, plus add/remove buttons.

## Preview (two-column layout)

- Grouped mode replaces the flat skill sections in the left column.
- Each section: title, then for each group the group name (semibold, underlined, followed by a colon) on one line and its skills underneath.
- Sections without any groups are hidden.
- Sections can be reordered by drag and drop, like the flat skills.
