# Maintaining the portfolio

## Repeat the improvement cycle

1. Identify a specific weakness in a real viewport or interaction.
2. Make the smallest coherent improvement, preserving the editorial hierarchy and project gallery.
3. Run `npm run build` and `npm run audit`.
4. Inspect the changed pages in the browser on desktop, portrait tablet, and phone. Check relevant keyboard and motion behavior.
5. Record the evidence and any remaining limitation. Do another pass for newly discovered issues; avoid adding effects without a purpose.

`npm run audit` uses Python 3's standard library. It checks generated links and fragments, duplicate IDs, page titles and descriptions, one main heading and landmark per page, image dimensions/alt attributes, canonical origins, social metadata, and JSON-LD syntax. It does not replace a browser, accessibility audit, or real-device performance measurements.

## Research updates

- Keep one Markdown record per work in `src/content/research/`. Prefer the publisher record for published work and arXiv for preprints. Preserve author order and stable slugs.
- When a preprint becomes a journal article, update the canonical record and retain the earlier record in `versions`. Do not count it as an extra publication.
- Use `publicationDate` for publication, `revised` for an actual revision, and `verifiedAt` for when its sources were checked. Verification dates and revision notes on the page derive from this data.
- Update `src/data/scholar.json` only after checking the Scholar profile. Keep `asOf` tied to that observation; a build must not make an old citation snapshot appear fresh.
- The research list, homepage paper titles, individual citations, `/research.bib`, and publication structured data derive from the collection. `featured` selects the homepage papers.

## Projects and case studies

`src/lib/portfolio.ts` controls the three selected project cards. `src/lib/case-studies.ts` supplies the project brief and simplified system diagrams. Keep those summaries aligned with the linked repositories and publications. Distinguish illustrative concept visuals from real application screenshots. Add measured results only with supporting evidence.

## Homepage organization

The homepage uses an editorial introduction, portrait, four linked areas of practice, the selected project gallery, research, experience, writing, and contact. It scrolls natively and requires no homepage JavaScript. The previous 3D scene and pinned scroll were removed at the owner's request on November 4, 2026.

Keep the introduction concise and the expertise links connected to supporting work. Preserve the dedicated projects gallery. Check desktop, tablet, and phone layouts after changes. Portraits are processed by Astro into responsive WebP images.

## Writing revisions and search

Use the optional `updated` date on a blog record for substantive revisions. Keep the original `date` for publication and archive ordering. The article displays both dates and emits `dateModified` in its structured data. Preserve old heading IDs when correcting headings that may already be linked.

Search loads its interface on request or on pointer/keyboard intent. Its CSS and lightweight dialog controller remain shared. Keep the loading state, focus handling, fallback navigation, and UI disposal together in `src/scripts/search.ts`. Do not put the large search UI back into an eager global import.
