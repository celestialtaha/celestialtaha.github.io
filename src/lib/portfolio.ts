export const featuredProjects = [
  {
    slug: "visual-semantic-search",
    name: "Visual Semantic Search",
    shortName: "Semantic search",
    category: "MULTIMODAL AI",
    number: "01",
    year: "2024",
    discipline: "Language × vision",
    description: "Search by meaning, not just keywords.",
    detail:
      "A product discovery system that maps natural language and images into the same embedding space. Built with CLIP, PyTorch, and vector search.",
    contribution:
      "Text-to-image retrieval · Background encoding · Search API",
    stack: ["CLIP", "FastAPI", "Celery", "Redis", "Qdrant"],
    visual: "search",
  },
  {
    slug: "medvse",
    name: "MEDVSE",
    shortName: "Vital signs",
    category: "APPLIED DEEP LEARNING",
    number: "02",
    year: "2022–2026",
    discipline: "Research × real life",
    description: "A smartphone camera. A vital signal.",
    detail:
      "Collaborative research on estimating heart rate and blood oxygen saturation from fingertip video. From collecting a dataset to developing models for mobile deployment.",
    contribution: "Collaborative research · MTHS dataset · Mobile inference",
    stack: ["Deep learning", "Computer vision", "Mobile"],
    visual: "signal",
  },
  {
    slug: "weavelet",
    name: "Weavelet",
    shortName: "Wearable music",
    category: "PRODUCT ENGINEERING",
    number: "03",
    year: "2024",
    discipline: "Software × everyday life",
    description: "Your music. A little closer.",
    detail:
      "An offline music player for Wear OS. Designed around the constraints of a watch: a small screen, limited battery, and the need for simple controls.",
    contribution: "Wear OS application · Offline playback · Native interface",
    stack: ["Kotlin", "Compose for Wear OS", "Media3", "Horologist"],
    visual: "music",
  },
];
export function projectVisual(slug: string) {
  return featuredProjects.find((p) => p.slug === slug)?.visual || "code";
}
