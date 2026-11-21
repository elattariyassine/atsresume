# 0. Baseline fixes to upstream

Upstream's refactor (Sep 2025) left a few regressions that the fork's features depend on. They are fixed first so every later feature is tested on a working base.

## Drag and drop does nothing

`DragDropContext` calls `onDragEnd(result)` with one argument, but upstream's `onDragEndHandler(result, resumeData, setResumeData)` needs the resume state. Every drop therefore throws or is ignored.

**Expected:** dragging work experiences, projects, skill sections and individual key achievements in the preview reorders them, as it did before the refactor.

## Work experience items have no index

The preview's `WorkExperiences` renders `<WorkExperience item={item} />` without `index`, so every draggable gets the id `WORK_EXPERIENCE-undefined` and drag ids collide.

**Expected:** each item receives its index; ids are unique.

## Debug logging

`console.log` calls left in `handleChange`, `onDragEndHandler` and `SkillLine` are removed.
