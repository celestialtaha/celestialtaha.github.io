# Scroll portfolio implementation — 2 November 2026

Implemented in the existing Astro repository. The earlier audit remains a record of the baseline and recommendations.

## Design and interaction

The homepage opens with “From signal to something useful.” A single canvas sculpture changes topology through four chapters: an orbital knot, spatial perception, a signal surface and connected semantic clusters. Native scroll progress drives the geometry and orientation in both directions. Chapter buttons and named entry links navigate the same story.

The restrained ivory, sage, olive and copper palette carries into selected projects, current research, experience, writing and contact. The repeated signature band and second oversized work introduction were removed. The story's visuals are illustrative studies, not experimental measurements or screenshots of deployed products.

Mobile retains the scroll sequence with smaller geometry and shorter pacing. A static-view control exposes all chapter text in normal document flow; system reduced-motion preferences and short viewports also select that mode. The document and SVG fallback remain readable without canvas enhancement. Inactive animated chapters are inert and hidden from the accessibility tree. The animation renders on scroll/resize and stops when settled or when the document is hidden. Astro navigation tears down listeners and observers.

The animation uses the existing canvas API without a new runtime dependency. A custom progress timeline was sufficient, so GSAP and Three.js were not required.

## Research updates

- Five records now separate dates, publication kind and status, summary, venue, identifiers and versions.
- The 2026 Healthcare Technology Letters article is canonical for the vital-signs work; its 2022 preprint remains linked as an earlier version.
- The rose paper now links to its verified 2025 arXiv preprint rather than an unverified forthcoming journal record.
- Journal volume/issue/article number, conference pages and arXiv identifiers are structured for citation export.
- The research page has a compact opening, dated Scholar metrics, author emphasis, summaries, available links and expandable BibTeX with the existing copy interaction.
- Homepage paper selections derive from the research collection's featured order.
- `src/data/scholar.json` stores the 2 November 2026 snapshot. Removed the unused stale citation helper that generated current timestamps for old numbers.
- The MEDVSE case study now connects the preprint and journal history and removes unsupported broad performance claims from the previous copy.

## Verification

- Final `npm run build` passed: Astro check reported zero errors and zero warnings; the static build and Pagefind indexing completed. Existing informational hints remain.
- Parsed 18 generated HTML pages and checked 392 local links/assets/fragment references: zero missing targets or duplicate IDs.
- Inspected the homepage at 1280×720, 768×1024, 375×812 and 320×640 through browser previews. Corrected a short-phone object/text overlap and a chapter-boundary text disappearance found during inspection.
- Exercised chapter navigation, forward/reverse narrative movement, opening and skip links, static view, research navigation and return initialization, and expandable citations.
- Inspected desktop and 320px-wide research presentation. Confirmed no document overflow on the inspected desktop homepage/research pages and first-paper actions within the 720px-high research viewport.
- Opened the final production build at `http://127.0.0.1:4322/`. OS reduced-motion preference emulation and a physical mobile-device performance run were not performed; the static mode's shared presentation path was exercised.
- `git diff --check` passed. The temporary responsive-preview harness was removed before the final build.

No commit, push or public deployment was performed in this implementation turn.

## Superseding implementation: expertise workbench

Following user feedback, the procedural wire sculpture was removed. The latest homepage is organized around AI agents, orchestration, backend engineering and applied research. Its introduction identifies the practice explicitly; five chapter controls cover the overview and four expertise areas.

The scene now uses Three.js 0.187 and GSAP 3.15 ScrollTrigger. Solid task modules, a routing panel, separable service drawers, a camera/optical assembly and a calibration target share one studio composition. Scrolling moves a real perspective camera and changes object positions. The objects illustrate software/research concepts rather than stand in for individual projects. The downloaded CC0 server rack was inspected in context and excluded from the final build. Three.js RoomEnvironment supplies the studio reflections without an external HDRI download.

Only MEDVSE remains featured below the hero, as a substantial research-to-engineering case study. Other projects remain in the archive. Existing verified research metadata and the publication page remain intact.

Latest verification:

- `npm run build` passes. Astro check: zero errors and zero warnings. Vite separately flags the Three.js/GSAP homepage chunk above its default 500 KB advisory threshold: 678.14 KB minified / 188.24 KB gzip. This is a real added cost of WebGL; physical-device frame-rate and loading-performance profiling was not performed.
- Parsed all 18 generated HTML pages; checked 394 local references, assets and fragment targets: zero missing targets or duplicate IDs.
- Inspected the workbench at 1280×800 desktop proportions, 375×812 and 320×640. Also inspected the production homepage at 1280×720 and the narrower visible app pane. Adjusted the mobile toolbar to fit five chapter targets without crowding the motion toggle.
- Exercised the agent, orchestration, backend and research camera views; the static mode exposes every chapter in normal flow. System reduced-motion and short-viewport modes share that static path; OS preference emulation was not performed.
- Verified the production entry link reaches `#practice-agents`, with one visible/current chapter and no desktop horizontal overflow. Verified research navigation and successful 3D initialization on return through Astro navigation.
- The final production build is available at `http://127.0.0.1:4322/`, and the user's existing preview tab was refreshed to it. Final desktop evidence: `/tmp/taha-expertise-workbench.png`.
- Temporary responsive inspection pages and reviewed external models are excluded from the built site. `git diff --check` passes.

The superseding implementation remains local and uncommitted. No push or public deployment was performed.

### Follow-up polish: retain the visual project gallery

Restored the homepage’s three illustrated project cards (Visual Semantic Search,
MEDVSE, Weavelet), with the original responsive grid and stacked phone layout.
The opening remains about expertise; the separate Projects archive was unchanged.
Added a restrained active-chapter underline, clearer scene captions, and keyboard
focus feedback on project visuals. Reduced per-render camera allocation and moved
projection updates to resize. Reset the scroll tween from zero when rebuilding it
so switching display modes cannot inherit an incorrect camera starting value.

Validation: production build passed (0 errors, 0 warnings, existing hints and
bundle-size advisory); 18 HTML pages / 395 local references checked with no
missing targets or duplicate IDs. Visually checked the 1280px gallery, 375px
stacked cards, backend chapter selection, and static/scroll round trip.
Screenshot: `/tmp/taha-restored-projects.png`. Changes remain local.
