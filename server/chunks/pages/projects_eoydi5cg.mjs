/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, i as renderComponent } from '../astro_SX-gliSe.mjs';
import 'kleur/colors';
import { $ as $$Image, p as projectsPageContent, c as $$Layout } from './_slug__LD2sG5hr.mjs';
import '@astrojs/internal-helpers/path';
import { M as Markdown } from './about_CwI0L4eY.mjs';

const $$Astro$1 = createAstro();
const $$ProjectCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ProjectCard;
  const { title, description, image, year, url } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(url, "href")} target="_blank" class="sm:py-5 py-10 flex flex-col sm:flex-row gap-6 group-hover:opacity-60 hover:!opacity-100 transition-opacity"> <div class="h-full bg-gray-700 rounded-lg aspect-video sm:h-[150px]"> ${renderComponent($$result, "Image", $$Image, { "width": 1920, "height": 1080, "src": image, "alt": title, "class": "w-full h-full object-cover rounded-lg aspect-video" })} </div> <div> <div class="flex items-center gap-1 mb-2"> <h2 class="font-medium">${title}</h2> <span class="opacity-60">· ${year}</span> </div> <div class="opacity-60"> ${renderComponent($$result, "Markdown", Markdown, { "of": description })} </div> </div> </a>`;
}, "/Users/taha/Desktop/Projects/personal/personal-github-page/astro-minimal-portfolio-template/src/components/ProjectCard.astro", void 0);

const $$Astro = createAstro();
const $$Projects = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Projects;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "seo": projectsPageContent.seo }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="mt-10 max-w-2xl mx-auto px-6"> <h1 class="font-bold text-3xl mb-1">Projects</h1> <p class="opacity-60 mb-10">${projectsPageContent.subtitle}</p> <div class="grid grid-cols-1 group"> ${projectsPageContent.projects.map((project) => renderTemplate`${renderComponent($$result2, "ProjectCard", $$ProjectCard, { ...project })}`)} </div> </section> ` })}`;
}, "/Users/taha/Desktop/Projects/personal/personal-github-page/astro-minimal-portfolio-template/src/pages/projects.astro", void 0);

const $$file = "/Users/taha/Desktop/Projects/personal/personal-github-page/astro-minimal-portfolio-template/src/pages/projects.astro";
const $$url = "/projects";

export { $$Projects as default, $$file as file, $$url as url };
