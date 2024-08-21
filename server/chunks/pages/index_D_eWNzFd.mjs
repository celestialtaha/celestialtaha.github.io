/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead, h as addAttribute } from '../astro_SX-gliSe.mjs';
import 'kleur/colors';
import '@astrojs/internal-helpers/path';
import { g as getCollection, d as blogPageContent, $ as $$Image, c as $$Layout, a as $$Icon, i as identity, h as homePageContent } from './_slug__LD2sG5hr.mjs';

const $$Astro$3 = createAstro();
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Index$1;
  const posts = await getCollection("posts");
  posts.sort((a, b) => {
    const dateA = new Date(a.data.pubDate).getTime();
    const dateB = new Date(b.data.pubDate).getTime();
    return dateB - dateA;
  });
  for (const post of posts) {
    const { remarkPluginFrontmatter } = await post.render();
    post.data.readingTime = remarkPluginFrontmatter.minutesRead;
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "seo": blogPageContent.seo }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="mt-10 max-w-2xl mx-auto px-6"> <h1 class="font-bold text-3xl mb-1">Blog</h1> <p class="opacity-60 mb-14">${blogPageContent.subtitle}</p> <div class="grid grid-cols-1 gap-10 sm:gap-6 mb-10"> ${posts.map((post) => renderTemplate`<a${addAttribute(`/blog/${post.slug}`, "href")} class=" sm:flex sm:flex-row-reverse sm:justify-between sm:gap-6 post"> ${renderComponent($$result2, "Image", $$Image, { "src": post.data.image.url, "alt": post.data.image.url, "width": 100, "height": 100, "class": "rounded-lg w-[100px] h-[100px] object-cover" })} <div class="mt-4 sm:my-auto"> <p class="opacity-60 mb-2"> ${post.data.pubDate.toLocaleDateString()} ·${" "} ${post.data.readingTime} </p> <h3 class="font-medium hover-underline">${post.data.title}</h3> <p class="text-sm opacity-60 mt-2 mb-3">${post.data.description}</p> </div> </a>`)} </div> </section> ` })}`;
}, "/Users/taha/Desktop/Projects/personal/personal-github-page/astro-minimal-portfolio-template/src/pages/blog/index.astro", void 0);

const $$file$1 = "/Users/taha/Desktop/Projects/personal/personal-github-page/astro-minimal-portfolio-template/src/pages/blog/index.astro";
const $$url$1 = "/blog";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$1,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$2 = createAstro();
const $$SocialLink = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SocialLink;
  const { title, url, icon, external } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(url, "href")} class="flex items-center gap-3 opacity-60 group-hover:opacity-30 hover:!opacity-60 transition-opacity"${addAttribute(external ? "_blank" : "_self", "target")}> ${renderComponent($$result, "Icon", $$Icon, { "name": icon, "width": 25, "height": 25 })} <div> <p>${title}</p> </div> </a>`;
}, "/Users/taha/Desktop/Projects/personal/personal-github-page/astro-minimal-portfolio-template/src/components/SocialLink.astro", void 0);

const $$Astro$1 = createAstro();
const $$Link = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Link;
  const { text, href, external, noAnchor } = Astro2.props;
  return renderTemplate`${!noAnchor ? renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute(external ? "_blank" : "_self", "target")} class="flex items-center gap-2 opacity-60 group-hover:opacity-30 hover:!opacity-60 transition-opacity"><div class="rotate-45">${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:arrow-up" })}</div><span>${text}</span></a>` : renderTemplate`<div class="flex items-center gap-2 opacity-60 group-hover:opacity-30 hover:!opacity-60 transition-opacity"><div class="rotate-45">${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:arrow-up" })}</div><span>${text}</span></div>`}`;
}, "/Users/taha/Desktop/Projects/personal/personal-github-page/astro-minimal-portfolio-template/src/components/Link.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const posts = await getCollection("posts");
  posts.sort((a, b) => {
    const dateA = new Date(a.data.pubDate).getTime();
    const dateB = new Date(b.data.pubDate).getTime();
    return dateB - dateA;
  });
  posts.splice(2);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "seo": homePageContent.seo }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="mt-10 max-w-2xl mx-auto px-6"> <h1 class="font-bold text-3xl mb-1">${identity.name}</h1> <p class="opacity-60 mb-10">${homePageContent.role}</p> <div class="flex flex-col min-[520px]:flex-row gap-6 mb-8"> ${renderComponent($$result2, "Image", $$Image, { "src": identity.logo, "alt": identity.name, "width": 100, "height": 100, "class": "rounded-full" })} <div class="group flex flex-col justify-center gap-2 w-fit"> ${homePageContent.socialLinks.map((link) => renderTemplate`${renderComponent($$result2, "SocialLink", $$SocialLink, { "title": link.title, "url": link.url, "icon": link.icon, "external": link.external })}`)} </div> </div> <p class="max-w-md mb-8"> ${homePageContent.description} </p> <div class="flex items-center gap-4 group w-fit"> ${homePageContent.links.map((link) => renderTemplate`${renderComponent($$result2, "Link", $$Link, { "text": link.title, "href": link.url, "external": link.external })}`)} </div> </section> <section class="mt-20 max-w-2xl mx-auto px-6"> <h2 class="mb-8">Latest Posts</h2> <div class="grid grid-cols-1 gap-10 sm:gap-6 mb-10"> ${posts.map((post) => renderTemplate`<a${addAttribute(`/blog/${post.slug}`, "href")} class=" sm:flex sm:flex-row-reverse sm:justify-between sm:gap-6 post"> ${renderComponent($$result2, "Image", $$Image, { "src": post.data.image.url, "alt": post.data.image.url, "width": 100, "height": 100, "class": "rounded-lg w-[100px] h-[100px] object-cover" })} <div class="mt-4 sm:my-auto"> <p class="opacity-60 mb-2"> ${post.data.pubDate.toLocaleDateString()} </p> <h3 class="font-medium hover-underline">${post.data.title}</h3> <p class="text-sm opacity-60 mt-2 mb-3">${post.data.description}</p> </div> </a>`)} </div> <div class="text-center"> <a href="/blog" class="underline underline-offset-4 opacity-60 hover:opacity-100 transition-opacity">View all</a> </div> </section> ` })}`;
}, "/Users/taha/Desktop/Projects/personal/personal-github-page/astro-minimal-portfolio-template/src/pages/index.astro", void 0);

const $$file = "/Users/taha/Desktop/Projects/personal/personal-github-page/astro-minimal-portfolio-template/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { index as a, index$1 as i };
