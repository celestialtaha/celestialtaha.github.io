import { f as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_SX-gliSe.mjs';
import 'kleur/colors';
import 'clsx';

const html = "";

				const frontmatter = {"title":"My First Blog Post with a very long name","pubDate":"2022-07-01T00:00:00.000Z","description":"Test","author":"Tim","image":{"url":"/logo.webp","alt":"Test"},"minutesRead":"0 min read"};
				const file = "/Users/taha/Desktop/Projects/personal/personal-github-page/astro-minimal-portfolio-template/src/content/posts/Test.md";
				const url = undefined;
				function rawContent() {
					return "";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
