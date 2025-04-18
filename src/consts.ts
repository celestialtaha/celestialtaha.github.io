import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "Taha Samavati",
  DESCRIPTION: "Astro Micro is an accessible and lightweight blog.",
  EMAIL: "tahasamavati12@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_WORKS_ON_HOMEPAGE: 3,
  NUM_PROJECTS_ON_HOMEPAGE: 0,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Taha Samavati | personal blog and portfolio.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "Where I have worked and what I have done.",
};

export const RESEARCH: Metadata = {
  TITLE: "Research",
  DESCRIPTION: "A collection of my research publications.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects with links to repositories and live demos.",
};

export const SOCIALS: Socials = [
  {
    NAME: "X (Twitter)",
    HREF: "https://x.com/taha_iusm",
    ICON: "/images/twitter.svg",
    DESCRIPTION: "Follow me for updates"
  },
  {
    NAME: "GitHub",
    HREF: "https://github.com/celestialtaha",
    ICON: "/images/github.svg",
    DESCRIPTION: "Check out my code"
  },
  {
    NAME: "LinkedIn",
    HREF: "https://www.linkedin.com/in/taha-samavati/",
    ICON: "/images/linkedin.svg",
    DESCRIPTION: "Connect professionally"
  },
];
