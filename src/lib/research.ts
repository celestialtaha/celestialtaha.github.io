import type { CollectionEntry } from "astro:content";
type Publication = CollectionEntry<"research">["data"];

export function publicationVenue(p: Publication) {
  const detail =
    p.arxiv ||
    [
      p.volume && `${p.volume}${p.issue ? `(${p.issue})` : ""}`,
      p.pages,
      p.articleNumber,
    ]
      .filter(Boolean)
      .join(", ");
  return `${p.venue}${detail ? ` · ${detail}` : ""}`;
}

export function bibtex(entry: CollectionEntry<"research">) {
  const p = entry.data;
  const type =
    p.kind === "conference"
      ? "inproceedings"
      : p.kind === "journal"
        ? "article"
        : "misc";
  const fields: Record<string, string | undefined> = {
    title: p.title,
    author: p.authors.join(" and "),
    ...(p.kind === "conference"
      ? { booktitle: p.venue }
      : p.kind === "journal"
        ? { journal: p.venue }
        : {}),
    year: String(p.publicationDate.getUTCFullYear()),
    volume: p.volume,
    number: p.issue,
    pages: p.pages?.replaceAll("–", "--"),
    eid: p.articleNumber,
    ...(p.arxiv ? { eprint: p.arxiv, archivePrefix: "arXiv" } : {}),
    doi: p.doi,
    url: p.link,
  };
  return `@${type}{samavati${p.publicationDate.getUTCFullYear()}${entry.slug},\n${Object.entries(
    fields,
  )
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `  ${key} = {${value}}`)
    .join(",\n")}\n}`;
}
