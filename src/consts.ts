import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "Taha Samavati",
  DESCRIPTION:
    "AI engineer and researcher working across agents, orchestration, backend engineering, and machine perception.",
  EMAIL: "tahasamavati12@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_WORKS_ON_HOMEPAGE: 3,
  NUM_PROJECTS_ON_HOMEPAGE: 0,
};

export const HOME: Metadata = {
  TITLE: "Taha Samavati — AI Engineer & Researcher",
  DESCRIPTION:
    "AI agents, orchestration, backend systems, and applied research. Explore Taha Samavati’s work, publications, and engineering notes.",
};

export const BLOG: Metadata = {
  TITLE: "Writing",
  DESCRIPTION:
    "Notes on AI, machine learning, and the ideas behind building useful systems. Writing by Taha Samavati in English and Persian.",
};

export const WORK: Metadata = {
  TITLE: "Experience",
  DESCRIPTION:
    "Taha Samavati’s experience across AI engineering, machine learning research, and software development.",
};

export const RESEARCH: Metadata = {
  TITLE: "Research & Publications",
  DESCRIPTION:
    "Publications and preprints by Taha Samavati on machine perception, efficient deep learning, and language. Read papers, explore code, and export citations.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "Selected work by Taha Samavati: multimodal search, efficient vital-sign estimation, and software for wearable devices. Explore the engineering behind each project.",
};

export const SOCIALS: Socials = [
  {
    NAME: "X (Twitter)",
    HREF: "https://x.com/taha_iusm",
    ICON: "/images/twitter.svg",
    DESCRIPTION: "Follow me for updates",
  },
  {
    NAME: "GitHub",
    HREF: "https://github.com/celestialtaha",
    ICON: "/images/github.svg",
    DESCRIPTION: "Check out my code",
  },
  {
    NAME: "LinkedIn",
    HREF: "https://www.linkedin.com/in/taha-samavati/",
    ICON: "/images/linkedin.svg",
    DESCRIPTION: "Connect professionally",
  },
];
