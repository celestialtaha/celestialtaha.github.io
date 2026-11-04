/** Editorial summaries grounded in the linked project repositories and papers. */
export const caseStudies: Record<
  string,
  {
    focus: string;
    constraint: string;
    artifact: string;
    flows: { label: string; steps: { name: string; detail: string }[] }[];
    note: string;
    evidence?: {
      metrics: { value: string; label: string }[];
      source: string;
      note: string;
    };
  }
> = {
  "visual-semantic-search": {
    focus: "From a description to a product image.",
    constraint:
      "Connect text and images while keeping image encoding separate from the interactive search path.",
    artifact:
      "A Docker Compose application with a Streamlit interface, FastAPI service, background workers, and vector storage.",
    flows: [
      {
        label: "PREPARE THE CATALOG",
        steps: [
          { name: "Product images", detail: "Catalog input" },
          { name: "Celery + Redis", detail: "Encoding jobs" },
          { name: "CLIP", detail: "Image embeddings" },
          { name: "Qdrant", detail: "Vector storage" },
        ],
      },
      {
        label: "SEARCH BY MEANING",
        steps: [
          { name: "Text query", detail: "Streamlit interface" },
          { name: "FastAPI + CLIP", detail: "Query embedding" },
          { name: "Qdrant", detail: "Similarity search" },
          { name: "Product matches", detail: "Ranked images" },
        ],
      },
    ],
    note: "Simplified system view. The source repository documents the services and local setup.",
  },
  medvse: {
    evidence: {
      metrics: [
        { value: "3.3K–53.7K", label: "model parameters" },
        { value: "62", label: "MTHS fingertip recordings" },
        { value: "3", label: "vital-sign estimation tasks" },
      ],
      source: "https://doi.org/10.1049/htl2.70083",
      note: "Reported in the 2026 paper. MTHS includes heart-rate and SpO₂ references; respiratory-rate estimation is evaluated on other datasets.",
    },
    focus: "Useful signals, within mobile constraints.",
    constraint:
      "Estimate vital signs from fingertip recordings with compact models and a workflow suitable for mobile inference.",
    artifact:
      "Collaborative research, the MTHS dataset, public research code, and a later 2026 journal article.",
    flows: [
      {
        label: "FROM RECORDING TO ESTIMATE",
        steps: [
          { name: "Fingertip video", detail: "Smartphone camera" },
          { name: "RGB signals", detail: "Extract + preprocess" },
          { name: "Compact model", detail: "Learn from reference data" },
          { name: "Vital signs", detail: "Evaluate estimates" },
        ],
      },
    ],
    note: "Conceptual research pipeline. The publications specify datasets, tasks, and evaluation conditions.",
  },
  weavelet: {
    focus: "A music player, designed around the wrist.",
    constraint:
      "Make local music accessible through a small round display, physical crown input, and Wear OS entry points.",
    artifact:
      "An open-source Wear OS application with local library browsing, Media3 playback, Tiles, and Complications.",
    flows: [
      {
        label: "OFFLINE, ON THE WATCH",
        steps: [
          { name: "Local music", detail: "Watch storage" },
          { name: "Music library", detail: "Scan + browse" },
          { name: "Media3", detail: "Playback" },
          { name: "Wear interface", detail: "Compose + crown input" },
        ],
      },
    ],
    note: "Simplified product flow. Tiles and Complications provide additional entry points into the player.",
  },
};
