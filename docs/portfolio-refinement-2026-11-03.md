# Portfolio refinement cycles, 2–3 November 2026

The requested standard was exceptional, original, minimal portfolio design. A subjective worldwide ranking cannot be verified by a code change. The work instead used repeated observed-problem → change → verification cycles, preserving the accepted expertise workbench and project gallery.

## 1. More substance behind the work

Replaced generic descriptions in the search and wearable projects with concrete engineering decisions grounded in their repositories. Added concise briefs and native system diagrams to the three selected case studies. The search project now identifies its FastAPI, Celery, Redis, and Qdrant architecture. Removed unmeasured product claims. MEDVSE's period is consistent across the archive and detail page.

Sources: [search repository](https://github.com/celestialtaha/visual-semantic-search), [service configuration](https://github.com/celestialtaha/visual-semantic-search/blob/main/docker-compose.yaml), [Weavelet repository](https://github.com/celestialtaha/Weavelet), [MEDVSE repository](https://github.com/MahdiFarvardin/MEDVSE).

## 2. A resilient opening

Separated the Three.js scene from the initial homepage controller. Added a responsive WebP poster rendered from the same authored scene. Static, compact, reduced-motion, and initial data-saving views can use the poster without creating the renderer. Static preference persists for the session, with an explicit selection overriding the data-saving default.

Repeated geometry shares GPU resources; unchanged camera phases avoid redundant renders. Shadows use a smaller map on phones. These are implementation improvements, not measured frame-rate claims.

The initial homepage controller is approximately 119 KB minified / 47 KB gzip. The 3D engine remains a separate approximately 559 KB / 141 KB gzip chunk and still loads for visitors using the interactive scene. Poster variants are about 22–62 KB. Normal animated visits still incur the engine's payload.

## 3. Composition at real sizes

Increased phone body-text sizes, kept action links clear of the scene at 320px, and gave portrait tablets a full-width scene below the text. The tablet correction followed a screenshot that cropped the camera in the former desktop layout. Reading mode now preserves a paired headline/illustration composition. Chapter changes use a restrained entrance; reduced-motion styles suppress it.

## 4. Research as usable evidence

Added a complete BibTeX download and publication structured data. Individual copy controls no longer overlap the first citation line. Verification dates, revision notes, and Scholar URLs derive from records rather than duplicated labels.

Added a sourced model comparison and dataset/model summary to MEDVSE. See [evidence provenance](medvse-evidence-sources.md). Numerical facts are presented in a native, responsive table with dataset, units, standard deviations, variant notes, and source citation. No paper figures were republished.

## 5. Editorial credibility

Corrected targeted technical inaccuracies in the Persian Transformer article: square-root scaling; Softmax normalization; fixed sinusoidal positions; residual versus recurrent terminology; cross-attention inputs; output projection matrices; and beam-search scoring. Kept the publication date, article URL, and legacy residual-section anchor. Added a separate revision date and structured modification metadata. This was a targeted technical review, not a complete rewrite of the article.

Sources: [Attention Is All You Need, sections 3.2 and 3.5](https://arxiv.org/pdf/1706.03762), [TensorFlow beam-search implementation](https://github.com/tensorflow/models/blob/master/official/nlp/modeling/ops/beam_search.py). The loss-function correction was also checked against the [Keras probabilistic-loss documentation](https://keras.io/api/losses/probabilistic_losses/). The article retains its existing references.

## 6. Loading search only when needed

Replaced the eager global search UI with an on-demand import, retaining keyboard shortcuts, focus trapping/restoration, bilingual queries, and navigation cleanup. Added a loading message and fallback navigation if the interface fails to load. English utility controls have explicit language boundaries on Persian pages.

The shared initial bundle changed from about 80 KB / 27 KB gzip to 19 KB / 7 KB gzip. Search UI is now a separate 61 KB / 20 KB gzip chunk. This is a build-output comparison, not a Lighthouse or field Core Web Vitals result.

## Verification and limits

- Production builds and Astro checking pass. Existing hints and the large deferred 3D chunk advisory remain.
- The repeatable output audit checks generated pages, local links/fragments, headings, metadata, image attributes, JSON-LD, article date ordering, and bibliography/publication-count agreement.
- Browser checks cover desktop, portrait tablet, 375px and 320px layouts, chapter selection, static/scroll round trips, search in English and Persian, citation copying and download, and navigation cleanup.
- Isolated failure pages exercised unavailable WebGL and an unavailable search UI module. They are temporary test artifacts and are removed from the delivered build.
- A script-free copy of the homepage verified the readable HTML/poster layout. This is not an OS-level reduced-motion or full JavaScript-disabled browser audit.
- No physical-device frame-rate measurements, screen-reader session, multi-browser certification, or external ranking was performed.

Working screenshots: `/tmp/taha-case-study-refinement.png` and `/tmp/taha-research-evidence.png`. The changes are local and uncommitted until explicitly requested for publication.

For future cycles and content updates, use [Maintaining the portfolio](maintaining-portfolio.md).

Final output audit: 18 generated HTML pages and 464 local references pass, with no missing targets, duplicate IDs, or invalid structured data. The five-record bibliography agrees with the publication index. Production build: 0 errors and 0 warnings from Astro checking.
