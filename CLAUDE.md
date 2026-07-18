# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal practice guide built while learning French — interactive drill pages per concept. `index.html` at root is the homepage; its lesson cards render from the inline `LESSONS` array (add an entry there when adding a lesson). Each lesson lives in `lessons/<name>/` as static files — no build step, no dependencies, Tailwind via CDN, vanilla JS.

Lessons (homepage order): `lessons/alphabet/` (letter names + IPA + TTS), `lessons/aigu/` (é-only rule, é vs è direction quiz), `lessons/grave/` (è "air" sound, à/ù homograph quiz, è vs é direction quiz), `lessons/circonflexe/` (ghost-S, meaning quiz, mouth mechanics). Each lesson:
- `index.html` — markup shell (tabs, empty exercise containers, progress panels)
- `data.js` — exercise bank (`GHOST_WORDS`, `MEANING_QUESTIONS`)
- `app.js` — renders randomized rounds sampled from the bank, checks answers, tracks scores

## Development

- No build/lint/test tooling. Run by opening in a browser: `open lessons/circonflexe/index.html`.
- Lessons with multiple exercises MUST use the tabbed layout (see circonflexe/grave): a tab button row above sections, `switchTab()` toggling `hidden` + active tab classes — no stacked sections requiring scrolling.
- Conventions: tab switching via `switchTab()` toggling `hidden`; per-exercise feedback `<p>` toggled by check functions; French TTS via `SpeechSynthesisUtterance` with `lang='fr-FR'`.
- Progress persistence: localStorage key `circonflexe-progress` — per-tab `{best, last, rounds}` (percent scores), written on round completion (all items answered; only first attempts count). Follow this pattern for new lessons (`<lesson>-progress` key).
- To add exercises, append to the arrays in `data.js` — rendering is data-driven.
