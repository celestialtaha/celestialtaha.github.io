/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, i as renderComponent, l as renderSlot } from '../astro_SX-gliSe.mjs';
import 'kleur/colors';
import '@astrojs/internal-helpers/path';
import { $ as $$Image, a as $$Icon, b as aboutPageContent, c as $$Layout } from './_slug__LD2sG5hr.mjs';
import 'clsx';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';

const $$Astro$2 = createAstro();
const $$ResumeItem = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ResumeItem;
  const { title, company, date } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(company.url, "href")} class="py-3 flex items-center justify-between group-hover:opacity-60 hover:!opacity-100 transition-opacity"> <div class="flex items-center gap-4"> ${renderComponent($$result, "Image", $$Image, { "src": company.image, "alt": company.name, "width": 40, "height": 40, "class": "rounded-full w-[40px] h-[40px] object-cover" })} <div> <h3 class="font-medium">${title}</h3> <p class="text-sm opacity-60">${company.name}</p> </div> </div> <p class="text-sm opacity-60">${date}</p> </a>`;
}, "/Users/taha/Desktop/Projects/personal/personal-github-page/astro-minimal-portfolio-template/src/components/ResumeItem.astro", void 0);

const symbol = Symbol.for('@astropub/md');

const shared = /** @type {Shared} */ (
	globalThis[symbol] || (
		globalThis[symbol] = {
			markdownConfig: {},
		}
	)
);

/** @typedef {import('./shared').Shared} Shared */

class HTMLString extends String {
	get [Symbol.toStringTag]() {
		return 'HTMLString'
	}
}

async function markdown(
	/** @type {string} */ content,
	/** @type {MarkdownRenderingOptions} */ options = null
) {
	const processor = await createMarkdownProcessor({
		...shared.markdownConfig,
		...Object(options),
	});

	const result = await processor.render(content);
	return new HTMLString(result.code);
}

markdown.inline = async function inlinemarkdown(
	/** @type {string} */ content,
	/** @type {MarkdownRenderingOptions} */ options = null
) {
	const processor = await createMarkdownProcessor({
		...shared.markdownConfig,
		...Object(options),
	});

	const result = await processor.render(content);

	return new HTMLString(
		result.code.indexOf("<p>") === 0 &&
		result.code.indexOf("</p>") === result.code.length - 4
			? result.code.slice(3, -4)
			: result.code,
	);
};

/** @typedef {import('./markdown').MarkdownRenderingOptions} MarkdownRenderingOptions */

const Markdown = Object.assign(
	function Markdown(result, attributes, slots) {
		return {
			get [Symbol.toStringTag]() {
				return 'AstroComponent'
			},
			async *[Symbol.asyncIterator]() {
				const mdl = attributes.of;

				if (typeof mdl === 'string') {
					yield await markdown(mdl, {
						fileURL: new URL(import.meta.url),
						contentDir: new URL('./', import.meta.url),
					});
				} else {
					yield renderSlot(result, slots.default);
				}
			},
		}
	},
	{
		isAstroComponentFactory: true,
		Inline: Object.assign(
			function MarkdownInline(result, attributes, slots) {
				return {
					get [Symbol.toStringTag]() {
						return 'AstroComponent'
					},
					async *[Symbol.asyncIterator]() {
						const mdl = attributes.of;

						if (typeof mdl === 'string') {
							yield await markdown.inline(mdl, {
								fileURL: new URL(import.meta.url),
								contentDir: new URL('./', import.meta.url),
							});
						} else {
							yield renderSlot(result, slots.default);
						}
					},
				}
			},
			{
				isAstroComponentFactory: true,
			}
		)
	}
);

const $$Astro$1 = createAstro();
const $$SocialLinkBox = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SocialLinkBox;
  const { title, url, icon, external } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(url, "href")} class="p-4 rounded-lg border border-white border-opacity-30 flex items-center gap-3 group-hover:opacity-30 hover:!opacity-100 transition-opacity"${addAttribute(external ? "_blank" : "_self", "target")}> ${renderComponent($$result, "Icon", $$Icon, { "name": icon, "width": 25, "height": 25 })} <div class="flex items-center justify-between w-full"> <p>${title}</p> <div class="rotate-45"> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:arrow-up" })} </div> </div> </a>`;
}, "/Users/taha/Desktop/Projects/personal/personal-github-page/astro-minimal-portfolio-template/src/components/SocialLinkBox.astro", void 0);

const $$Astro = createAstro();
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "seo": aboutPageContent.seo }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="mt-10 max-w-2xl mx-auto px-6"> <h1 class="font-bold text-3xl mb-1">About</h1> <p class="opacity-60 mb-10">${aboutPageContent.subtitle}</p> <div class="mb-14"> ${renderComponent($$result2, "Markdown", Markdown, { "of": aboutPageContent.about.description })} </div> <div class="flex flex-col min-[410px]:flex-row"> ${renderComponent($$result2, "Image", $$Image, { "src": aboutPageContent.about.image_l.url, "alt": aboutPageContent.about.image_l.alt, "width": 350, "height": 250, "class": "w-[350px] h-[250px] object-cover rounded-xl -rotate-6" })} ${renderComponent($$result2, "Image", $$Image, { "src": aboutPageContent.about.image_r.url, "alt": aboutPageContent.about.image_r.alt, "width": 150, "height": 250, "class": "w-[150px] h-[250px] object-cover rounded-xl rotate-6 mx-auto sm:ml-auto" })} </div> </section> <section class="my-20 mt-32 max-w-2xl mx-auto px-6 sm:flex sm:gap-16"> <h2 class="mb-8 sm:mb-0 opacity-60">Work</h2> <div> <div class="mb-6"> ${renderComponent($$result2, "Markdown", Markdown, { "of": aboutPageContent.work.description })} </div> <div class="grid grid-cols-1 group"> ${aboutPageContent.work.items.map((item) => renderTemplate`${renderComponent($$result2, "ResumeItem", $$ResumeItem, { ...item })}`)} </div> </div> </section> <section class="mt-32 max-w-2xl mx-auto px-6 sm:flex sm:gap-16"> <h2 class="mb-8 sm:mb-0 opacity-60">Connect</h2> <div> <div class="mb-6"> ${renderComponent($$result2, "Markdown", Markdown, { "of": aboutPageContent.work.description })} </div> <div class="grid grid-cols-2 gap-2 group"> ${aboutPageContent.connect.links.map((item) => renderTemplate`${renderComponent($$result2, "SocialLinkBox", $$SocialLinkBox, { ...item })}`)} </div> </div> </section> ` })}`;
}, "/Users/taha/Desktop/Projects/personal/personal-github-page/astro-minimal-portfolio-template/src/pages/about.astro", void 0);

const $$file = "/Users/taha/Desktop/Projects/personal/personal-github-page/astro-minimal-portfolio-template/src/pages/about.astro";
const $$url = "/about";

const about = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { Markdown as M, about as a };
