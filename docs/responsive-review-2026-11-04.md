# Responsive review — November 4, 2026

Reviewed the production build in the browser using a temporary same-origin iframe at explicit CSS viewport sizes. These are responsive browser checks, not tests on physical devices or separate Safari/Chrome/Firefox installations.

| Viewport | Page / interaction reviewed |
| --- | --- |
| 320 × 740 | Research list, long publication metadata, expanded BibTeX citation |
| 375 × 812 | MEDVSE case study, model comparison table, mobile search dialog |
| 390 × 844 | Project gallery; Persian article typography and mixed-direction content |
| 768 × 1024 | Experience page, role headings and skills |
| 844 × 390 | Homepage landscape scrolling and header behavior |
| 1024 × 768 | Dedicated projects gallery and lead project layout |
| 1920 × 1080 | Homepage typography, portrait, content width, four-column expertise index |

## Changes from observed issues

- The sticky header now scrolls away when the viewport is at most 500px high, freeing the reading area in landscape. Normal desktop/tablet sticky navigation is preserved.
- Research action links, citation disclosure controls, and citation copy buttons now have at least 44px-high touch targets on narrow or coarse-pointer views.
- Citation code padding increases with the larger copy button to preserve separation from the text.

## Verification

- Browser review confirmed the larger citation controls and the absence of the sticky header over scrolled landscape content.
- The project gallery, publication titles, native model comparison table, Persian article, and mobile search fit the reviewed layouts without visible clipping.
- Production build: zero errors and zero warnings (existing informational hints remain).
- Generated-page audit and whitespace checks passed. The temporary responsive harness was removed after review.

Not covered: physical-device touch/keyboard behavior, browser-engine comparisons, device performance benchmarks, or an assistive-technology audit.
