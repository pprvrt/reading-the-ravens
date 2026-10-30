# Reading the Ravens

An interactive, NYT-style field guide to modern football: animated plays, coverages, fronts and pre-snap reads, explained through the 2026 Baltimore Ravens.

The page is one self-contained HTML file. It has no framework and no runtime dependencies; the only external request is for Google Fonts, and the page falls back to system fonts without them.

*Not affiliated with the Baltimore Ravens or the NFL. Diagrams are schematic; reconstructed plays are labelled with what the sources establish and what is illustrative.*

## Contents

- **Part I · The language of the game.** Chapters 1–10: field, personnel, formations (with tempo and cadence), gaps and the box, defensive fronts (with box and spill), coverage (with Tampa 2, Cover 2 man, and the sky, buzz and cloud rotations), pressure and protection, routes and concepts (with the quick game and play-action), quarterback reads and timing, and the matchup lab.
- **Part II · Ravens offense.** Chapter 11, Doyle's system: perimeter blocking, the zone and gap run game, duo, trap and toss, the read option, RPOs, designed quarterback runs, play-action, the choice route and screens.
- **Part III · Ravens defense.** Chapter 12, Minter's defense (disguise, simulated pressure, the run-defense trade), and Chapter 13, how offenses attack it.
- **Part IV · Reading the game.** Chapters 14–17: before the snap, at the snap, situations (including the red zone and the two-minute drill) and special teams.
- **Glossary and sources.** About 115 glossary terms, each also shown as a hover definition; full source list.

Interactive elements: animated boards with play, pause, scrub and speed controls; a coverage-versus-concept lab (6 coverages × 5 concepts); seven pre-snap quizzes; 38 static playbook plates in ink-on-paper style.

## Layout

```
src/
  head.html        <title>, meta, fonts, all CSS (theme tokens on :root, dark mode)
  body.html        the article: chapters, figure mount points, glossary/sources sections
  js/
    engine.js      field geometry, path timing, after-path simulation, spacing, Board and Figure UI
    scenes.js      animated plays (film reconstructions and generic illustrations), lab data, fronts, personnel
    plates.js      static playbook plates (PLATES), quarterback progression scene, glossary additions
    init.js        glossary, quizzes, lab mounting, boot(): mounts every figure, numbers chapters, builds the TOC
scripts/
  build.mjs        concatenates src/ into docs/index.html
tests/
  validate.cjs     motion: speeds above human limits, players who stop before the end of a play
  occlusion.cjs    legibility: player counts, overlapping markers, out-of-view players, labels hiding players
  teams.cjs        colours: offense and defense never share a team colour within a scene
  browser.py       Playwright: interaction run, element screenshots, animation contact sheets
docs/
  index.html       the built page, served by GitHub Pages (generated: do not edit by hand)
```

## Build and check

```sh
npm run build          # writes docs/index.html
npm run check          # Node validators (no install needed)
npm run test:browser   # Playwright interaction run (needs: pip install playwright pillow && python -m playwright install chromium)
```

Screenshots and frame sheets:

```sh
python tests/browser.py shots 390 dark "#f-prog@3.6,[data-plates=quick]"
python tests/browser.py frames "#f-prog" 0.5,1.4,2.7,3.6 prog.png "Scramble drill"
```

Expected validator output at the time of writing, all accepted: `validate.cjs` reports 11 of 56 scenes, with 14 brief speed blips (linemen at 7.2–9 yd/s while engaging a block, two ball carriers at 10.6–10.7 yd/s) and "idle" lines for pass protectors and lab man defenders; `occlusion.cjs` reports four overlap pairs (contact during blocks and tight coverage) and two single frames under a tag; every line of `teams.cjs` prints `ok`. Anything beyond that baseline after an edit is worth a look.

## Publishing

The site is published with GitHub Pages from the `docs/` folder.

1. One time: on GitHub, **Settings → Pages → Build and deployment → Deploy from a branch**, branch `main`, folder `/docs`.
2. Each update: edit `src/`, run `npm run build` (and `npm run check`), then commit and push, including `docs/index.html`.

The page appears at `https://<user>.github.io/reading-the-ravens/` a minute or so after each push.

## Editing guide

### Text

Edit `src/body.html`. Chapter numbers are assigned at load time in document order, so a chapter can be added or moved without renumbering; the number in each `<span class="chapnum"><b>N</b>` is a placeholder. Refer to other chapters by link (`<a href="#ch-qb">…</a>`), not by number.

Glossary terms: wrap a word in `<span class="g" data-g="key">word</span>` and define `key` in `GLOSS` (`src/js/init.js`) or `GLOSS_ADD` (`src/js/plates.js`) as `['Title', 'Definition']`. The glossary section is generated from these.

### Statistics

All figures are written into the text and dated (mostly "first seven games of 2026"). Sources are attributed in the text, under each chart and in the Sources section. Updating a figure means updating the sentence, the bar chart markup (`.barfig`, widths in %) and, where present, the source line.

### Animated scenes (`src/js/scenes.js`, `src/js/plates.js`)

Coordinates are in yards: `x` from 0 to 53.33 across the field from the left sideline (`MID` = 26.67, `T(dx)` = `MID + dx`), `y` relative to the line of scrimmage (positive = downfield). Helpers: `pB`/`pBD` (Ravens offense/defense), `pO`/`pOD` (opponent), `OL5`, `OLX`.

A scene object:

| Field | Meaning |
|---|---|
| `title`, `src`, `tag`, `recon` | headings, source line, label, provenance note under the board |
| `los`, `first` | yard line of scrimmage and line to gain (drawing only) |
| `view {y0,y1}`, `mobileView` | visible area; optional crop on phones |
| `t [t0,t1]`, `rest`, `end` | timeline, start frame, whistle |
| `gun` | shotgun snap (ball reaches the QB at 0.32 s) |
| `players` | `{id, lab, team 'B'/'O', side 'off'/'def', x, y, m, kind, v, d, pre, on, chase, after:'stay', name}` |
| `ball` | events `{t, pass:id, at}` (throw/handoff, caught at `at`) and `{t, hold:id}` |
| `beats` | `[time, html]` captions synced to the timeline |
| `rings`, `labels`, `zones` | highlights `[t0,t1,id]`, callouts `{t0,t1,x,y,text,anchor}`, coverage zones |
| `generic` | concept illustration: replaces player initials with role letters, hides names |
| `passPlay`, `noTackle`, `pursuit` | after-path behaviour: coverage shadows receivers, defenders whiff instead of tackling, pursuit speed |

Waypoints in `m` are `[x, y]` or `[x, y, arrivalTime]`; arrival times are capped at a human top speed (`VMAX` = 10 yd/s). `{w: s}` waits, `{v: speed}` changes speed. `kind` is one of `route`, `run`, `fake`, `block`, `pp` (pass protection), `rush`, `drop`, `none`, `motion`. When a path ends before the whistle, `finalize()` keeps the player playing (pursuit, blocking, coverage, convoy), and `separate()` keeps markers from hiding each other. Run `npm run check` after any change.

### Playbook plates (`PLATES` in `src/js/plates.js`)

Mount a set with `<div data-plates="key" data-title="Playbook · …" data-sub="…" data-key></div>` (`data-key` adds the symbol legend; `data-cols="3"` forces the narrow grid). Each plate:

| Field | Meaning |
|---|---|
| `t`, `c` | title and caption |
| `v {x0,x1,y0,y1}` | view in yards from the ball; views wider than 30 yd are compressed outside the tackle box |
| `o` | offense `[x, y, fill, label]`: `fill` = `'C'` for the center square, `'K'` for a filled (key) player |
| `d` | defense `[x, y, letter, key]` |
| `r` | lines `[kind, points, label]`: `r` route, `k` key route (red), `b` block (T-bar), `run`/`kr` ball carrier, `m` motion/fake (dotted), `d` defender movement (dashed), `x` rush |
| `z` | zones `[cx, cy, rx, ry, label]` |
| `n`, `tx` | numbered reads `[x, y, n]`; text `[x, y, text, class, anchor]` |
| `ez`, `ezb`, `lines`, `los`, `s`, `cmp` | end zone above/below, yard lines, line of scrimmage on/off, symbol scale, compression override |

## Sources and method

Statistics come from Sharp Football Analysis, FTN Data via nflverse (as published by muffed.ai), NFL Next Gen Stats and team and press reporting, all listed in the page. The matchup lab is a rules-based simulation, not tracking data.

Further reading: Pat Kirwan, *Take Your Eye Off the Ball*; Chris B. Brown, *The Essential Smart Football* and *The Art of Smart Football*; Tim Layden, *Blood, Sweat and Chalk*; Bill Walsh, *Finding the Winning Edge*.
