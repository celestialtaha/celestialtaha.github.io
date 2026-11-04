import { getCollection } from "astro:content";
import { bibtex } from "../lib/research";

export async function GET() {
  const entries = (await getCollection("research")).sort(
    (a, b) => +b.data.publicationDate - +a.data.publicationDate,
  );
  return new Response(entries.map(bibtex).join("\n\n") + "\n", {
    headers: {
      "Content-Type": "application/x-bibtex; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="taha-samavati-publications.bib"',
    },
  });
}
