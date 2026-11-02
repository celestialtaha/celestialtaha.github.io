# Portfolio audit and update plan

Reviewed 2 November 2026. Scope: the deployed portfolio, its Astro source, desktop composition, a 375px-wide homepage view, current scroll implementation, and research records reconciled against the supplied Google Scholar profile and primary publication sources. This document proposes changes; production UI and publication records have not been changed in this audit.

## Assessment

The restrained palette, editorial typography and shared navigation provide a coherent foundation. The main remaining problem is hierarchy: identity, decorative language and large headings repeatedly precede evidence of the work. The homepage has motion, but does not yet provide the continuous, scroll-controlled scene requested.

| Area | Assessment | Recommended change |
| --- | --- | --- |
| Minimalism | Visually restrained; structurally too many layers | Remove repeated identity bands, slogans and decorative labels. Give each project one title, takeaway, contribution and action. |
| Modern presentation | Contemporary editorial styling; generic conceptual visuals dominate | Show actual research figures, working interfaces and results, using motion to explain their relationship. |
| Homepage hierarchy | Introduction, sphere, signature and another large heading delay proof | Consolidate identity into one opening and bring the first meaningful project into the opening sequence. |
| Scroll experience | Time-based sphere rotation and chapter switching | Map scroll progress directly to object position, scale, rotation and transitions in one connected stage. |
| Research | Strong work, outdated metadata and excessive introductory space | Put current papers and actions earlier, distinguish publication status, and connect versions. |
| Mobile | Readable, but the two-row header and stacked introduction push the scene down | Compact navigation and opening; retain a shorter, deliberate scroll scene and reachable contact. |

## Prioritized findings

### 1. Correct the research records before designing around them

The 2026 vital-signs journal article is missing. The rose paper is listed as forthcoming without a usable paper link, although a 2025 arXiv preprint is public. These affect both credibility and which work should lead the homepage.

The research schema mixes dates and status in `publicationDate`, requires a `journal` for every publication type, and lacks explicit version relationships. Homepage selections and project metadata are also curated separately, creating opportunities for divergence.

`src/lib/googleScholar.ts` contains old hardcoded citation values and generates a fresh timestamp whenever evaluated. It is currently unused: this is a latent data-quality hazard, not evidence that the live UI displays those counts. Replace or remove it before enabling citation metrics.

### 2. Reduce repeated introductions

The homepage contains the name/photo, a large role statement, technical labels, the sphere, a large signature band and a further work heading. Keep one clear introduction: name, specific professional focus, one supporting sentence and a work action. Let the scene carry continuity instead of repeating identity at large scale.

Project chapters currently stack category/year, an italic theme, title, hook, description, contribution, tags and action. Reduce this to a few meaningful levels. Use tags only when they help distinguish the work; remove tiny decorative captions. Useful metadata must remain comfortably readable.

### 3. Give archive pages a compact, consistent grid

At the inspected desktop size, the research heading, introduction and context strip consume most of the first screen; the first paper appears near its bottom. Move the first title and actions into that opening view. Reserve the largest theatrical treatment for the homepage.

Unify header, content and footer container/gutter tokens, particularly at wide widths. Keep titles, metadata and actions consistently aligned across projects, research, writing and experience. Preserve whitespace that separates information; remove whitespace caused by repeated introductions.

### 4. Make the visuals prove the work

Use authentic figures, screenshots or demonstrations as the central project evidence. Conceptual point clouds and interface illustrations can provide transitions, but should lead to a specific result or artifact. Explain personal contribution accurately; avoid inventing outcomes or ownership from a paper abstract.

## What the requested motion is called

The useful terms are **scroll-driven storytelling**, **scrollytelling**, and a **pinned, scrubbed scene**. Scroll progress controls the animation, including reversal when scrolling upward.

Relevant 2026 references:

- [Joffrey Spitzer: minimalist Astro and GSAP portfolio](https://tympanus.net/codrops/2026/02/18/joffrey-spitzer-portfolio-a-minimalist-astro-gsap-build-with-reveals-flip-transitions-and-subtle-motion/). A restrained reference for typography, active project imagery and scroll-controlled presentation.
- [Joseph Santamaria: building a scroll-driven 3D world](https://tympanus.net/codrops/2026/04/28/more-than-a-portfolio-building-a-scroll-driven-3d-world-with-something-to-say/). A reference for connecting camera motion, objects and narrative within one scene.
- [Squarespace: motion narrative design](https://pros.squarespace.com/blog/motion-narrative-design-trend). Describes motion as storytelling, with deliberate pacing and mobile adaptation.

These are examples of current practice, not evidence that every contemporary portfolio needs a heavy 3D world. The recommendation here combines editorial restraint with one memorable scene.

### Current implementation gap

`src/scripts/home.ts` advances sphere rotation with elapsed time. The scroll handler changes the active chapter and adds small positional/rotation offsets; it does not drive a continuous scene timeline. On narrow screens the sticky work stage is disabled. The result is an animated introduction and a changing gallery rather than the requested connected journey.

### Proposed homepage storyboard

| Beat | Content | Scroll-controlled scene |
| --- | --- | --- |
| Opening | Taha Samavati; AI engineering and research focus | A sparse point structure introduces the visual language; the beginning of work is immediately apparent. |
| Perception | Rose-harvesting research, 2025 preprint | Points resolve into spatial perception/localization; show a real figure or annotated result. |
| Signals | Parameter-efficient PPG research, 2026 journal | Geometry transforms into a signal/model representation, paired with actual paper evidence. |
| Products | One strongest product/system case study | Scene becomes a useful interface or demonstration. Select based on available evidence rather than recency claims. |
| Exit | Selected papers, short experience, writing and contact | Scene settles and releases into normal document flow. |

Start with roughly three viewport lengths for the connected work sequence and tune against real reading time. Do not force long empty scrolling. Maintain native scrolling, working anchors, keyboard access and a skip-to-work path. Keep text in the document, separate from canvas rendering.

Keep Astro. Prototype one GSAP ScrollTrigger timeline using existing canvas/SVG/DOM assets; its official [pin and scrub documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) matches this interaction. Add Three.js only if real camera/model depth materially improves the result. Clean up animation resources on Astro navigation. Preserve a pause control and provide a complete static reduced-motion presentation. Mobile should receive shorter pacing and fewer objects rather than simply losing the intended experience.

## Verified research reconciliation

Collection source: [Taha Samavati on Google Scholar](https://scholar.google.com/citations?user=umQn3lcAAAAJ&hl=en), inspected 2 November 2026. Five listed works; 200 citations, h-index 3, i10-index 3. Per-work counts below are a dated Scholar snapshot, not live values. Do not mix them with publisher citation counts.

| Work | Verified record | Change needed | Scholar citations |
| --- | --- | --- | --- |
| Parameter-Efficient Deep Learning Models for Vital Sign Estimation From PPG | Healthcare Technology Letters 13(1), e70083, 2026; DOI 10.1049/htl2.70083 | Promote the journal record; preserve the earlier smartphone vital-signs preprint as a linked version | 15 |
| Sparse 3D Perception for Rose Harvesting Robots: A Two-Stage Approach Bridging Simulation and Real-World Applications | arXiv:2508.00900; submitted 28 July 2025 | Replace unverified forthcoming journal presentation with verified preprint status and link | 1 |
| LDPSA: A Large Dataset of Persian Sentiment Analysis | ICWR 2024, pp. 375–381; DOI 10.1109/ICWR61162.2024.10533380 | Store conference type, full venue, DOI and pages explicitly | 2 |
| Deep learning-based 3D reconstruction: a survey | Artificial Intelligence Review 56, 9175–9219, 2023; DOI 10.1007/s10462-023-10399-2 | Use the publisher's canonical title and complete metadata | 149 |
| Text as environment: A deep reinforcement learning text readability assessment model | arXiv:1912.05957; first posted 12 December 2019, v4 revised 23 October 2023 | Distinguish original publication year from latest revision | 33 |

Primary records:

- [PPG journal record, PubMed](https://pubmed.ncbi.nlm.nih.gov/42124889/) and [Crossref metadata](https://api.crossref.org/works/10.1049/htl2.70083). Online publication is **10 May 2026**; the issue/collection carries January 2026. Use the year or the actual online date; do not manufacture a January 1 publication date.
- [Earlier vital-signs preprint](https://arxiv.org/abs/2204.08989): first posted 13 April 2022, latest v3 on 28 March 2024. Scholar groups it with the 2026 journal article. Model these as versions of one work in this collection, preserving both titles and links; do not inflate five works to six by adding the journal version independently.
- [Rose preprint](https://arxiv.org/abs/2508.00900). No journal acceptance/publication was verified in this audit. Keep journal status absent until supported by an authoritative record.
- [LDPSA DOI](https://doi.org/10.1109/ICWR61162.2024.10533380) and [Crossref metadata](https://api.crossref.org/works/10.1109/ICWR61162.2024.10533380).
- [3D reconstruction survey, Springer](https://link.springer.com/article/10.1007/s10462-023-10399-2), published 28 January 2023.
- [Readability preprint and version history](https://arxiv.org/abs/1912.05957).

On the verified evidence, this collection contains two journal papers, one conference paper and two preprints. Status and citation counts should not imply that preprints are published journal articles.

### Research data model and update procedure

1. Keep stable IDs and existing slugs, including old routes where possible. Store canonical title, ordered authors, publication kind, status, venue, year, date with precision, DOI/arXiv identifiers and linked versions.
2. Add explicit summary, verified contribution, topics, related project and featured order. Replace the rose record's unused `Content` frontmatter with an intentionally rendered concise summary.
3. Model publisher, open access, PDF, code and dataset links independently. Render an action only when its destination is present and checked.
4. Store source URLs and `verifiedAt`. Keep citation snapshots separately with `provider`, `asOf` and counts. Do not regenerate a freshness timestamp for old data.
5. Use DOI/Crossref and arXiv metadata for bibliographic updates; use Scholar for collection discovery and a dated citation snapshot. Review a proposed metadata diff before changing canonical versions. Avoid runtime dependence on Scholar scraping.
6. Derive homepage paper selections and research cards from this shared collection rather than duplicating titles, years and statuses in portfolio configuration.

### Research presentation

Use a compact heading with a Scholar link and optional small, dated metrics. Feature two papers with a real figure and a one-sentence takeaway, followed by a clear chronological list of all five works. Highlight Taha's name in author lists; show title, venue, year and a clear Published/Preprint label. Offer Paper, Open access, Code, Data and Cite only where available. Keep abstracts expandable and provide reliable BibTeX. Avoid a crowded filter interface for five papers.

## Implementation sequence and completion criteria

1. **Metadata foundation:** migrate the five records, version relationships and date handling; remove the stale citation fallback. Verify that listing and homepage agree and that every displayed publication action works.
2. **Static hierarchy:** simplify the hero and signature treatment, compact archive introductions, align containers and reduce project text layers. Confirm opening, middle and ending compositions before motion work.
3. **Scroll prototype:** build the opening-to-perception-to-signals-to-product sequence. Test forward/reverse scrolling, direct anchors, navigation teardown, short screens, touch and reduced motion before adding detail.
4. **Evidence and research UI:** integrate actual figures/interfaces, publication summaries, version links and citation export. Preserve existing URLs or add redirects where necessary.
5. **Verification:** run the repository's relevant checks/build; inspect desktop and phone layouts, intermediate sizes and short heights; check overflow, keyboard/focus, contrast and links. Measure representative loading and animation performance and simplify assets if needed. Do not make unmeasured performance claims.

This audit did not rerun the previous release's full responsive/link regression suite. New UI code should receive fresh verification during implementation. No production changes, dependency installation, commit or push were performed as part of this report.
