# 0. Baseline fixes to upstream

Upstream's refactor (Sep 2025) left a few regressions that the fork's features depend on. They are fixed first so every later feature is tested on a working base.

## Drag and drop does nothing

`DragDropContext` calls `onDragEnd(result)` with one argument, but upstream's `onDragEndHandler(result, resumeData, setResumeData)` needs the resume state. Every drop therefore throws or is ignored.

**Expected:** dragging work experiences, projects, skill sections and individual key achievements in the preview reorders them, as it did before the refactor.

## Work experience items have no index

The preview's `WorkExperiences` renders `<WorkExperience item={item} />` without `index`, so every draggable gets the id `WORK_EXPERIENCE-undefined` and drag ids collide.

**Expected:** each item receives its index; ids are unique.

## Drag and drop library is incompatible with React 19

The App Router runs on React 19, which drops `defaultProps` for function components. `react-beautiful-dnd` (unmaintained since 2022) depends on them, so every `Droppable` fails with "isDropDisabled must be a boolean".

**Fix:** replace it with [`@hello-pangea/dnd`](https://github.com/hello-pangea/dnd), the maintained drop-in fork with the same API.

## Stale lockfile

Upstream bumped `next` to 15.5.9 (security fix) in `package.json` but not in `yarn.lock`, which still resolved 15.5.2. The lockfile is regenerated.

## Debug logging

Leftover `console.log` calls are removed.
