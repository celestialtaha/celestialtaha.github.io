import { f as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_SX-gliSe.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>This is test content</p>";

				const frontmatter = {"title":"My First Blog Post with a very long name","pubDate":"2022-07-01T00:00:00.000Z","description":"Test","author":"Tim","image":{"url":"/demo-1.jpg","alt":"Test"},"minutesRead":"1 min read"};
				const file = "/Users/taha/Desktop/Projects/personal/personal-github-page/astro-minimal-portfolio-template/src/content/posts/Test 2.md";
				const url = undefined;
				function rawContent() {
					return "\nThis is test content\n";
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
