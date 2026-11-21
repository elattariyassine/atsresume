# 5. Resume language (English / French)

Lets the user produce the resume in English or French: section titles, labels, work-type names, "Present", and month names in dates. The form's labels and placeholders follow the same language.

## Previous implementation (pre-rebuild)

Used Next.js Pages Router i18n (`i18n` in `next.config.js`) and changed the URL locale on switch. The App Router doesn't support that option, and a resume's language is a property of the document rather than of the page, so it is redesigned.

## New design

- The language is stored in the resume: `"locale": "en" | "fr"`. A saved file reopens in its language; files without it default to `"en"`.
- No routing or URL changes. Switching is instant and client-side.
- Translations live in `src/locales/en.json` and `src/locales/fr.json`, which must have the same keys.
- A `useTranslation()` hook returns `{ t, locale, setLocale }`. `t(key)` falls back to English, then to the key itself, so a missing translation never shows a blank.
- The page's `<html lang>` follows the resume language, so a printed or saved PDF carries the right language tag.

## Form

A **Resume Language** select near the top of the form: *English* / *Français*.

## What is translated

- Form section titles, placeholders and button labels
- Preview section titles in both layouts (Summary, Education, Work Experience, Projects, Languages, Certifications, skill section names, Technologies)
- Work type names (Remote, In-Office, Hybrid)
- Dates: month names use the locale (`en-US` / `fr-FR`), and an open end date reads "Present" / "Présent"

User-entered content is never translated.

## Skill section titles

Skill sections are identified by their stored English titles (`Technical Skills`, `Soft Skills`, `Additional Skills`). These three are shown translated; any other (user-renamed) title is shown as typed.
