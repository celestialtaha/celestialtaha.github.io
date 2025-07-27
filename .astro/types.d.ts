declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"00-micro-changelog/index.mdx": {
	id: "00-micro-changelog/index.mdx";
  slug: "00-micro-changelog";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"01-getting-started/index.md": {
	id: "01-getting-started/index.md";
  slug: "01-getting-started";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"02-blog-collection/index.md": {
	id: "02-blog-collection/index.md";
  slug: "02-blog-collection";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"03-projects-collection/index.md": {
	id: "03-projects-collection/index.md";
  slug: "03-projects-collection";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"04-markdown-syntax/index.mdx": {
	id: "04-markdown-syntax/index.mdx";
  slug: "04-markdown-syntax";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"05-mdx-syntax/index.mdx": {
	id: "05-mdx-syntax/index.mdx";
  slug: "05-mdx-syntax";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"06-year-sorting-example/index.md": {
	id: "06-year-sorting-example/index.md";
  slug: "06-year-sorting-example";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"07-draft-example/index.md": {
	id: "07-draft-example/index.md";
  slug: "07-draft-example";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"07-year-sorting-example/index.md": {
	id: "07-year-sorting-example/index.md";
  slug: "07-year-sorting-example";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"08-prev-next-order-example/index.md": {
	id: "08-prev-next-order-example/index.md";
  slug: "08-prev-next-order-example";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"09-transformers/index.md": {
	id: "09-transformers/index.md";
  slug: "09-transformers";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"10-context-engineering/index.md": {
	id: "10-context-engineering/index.md";
  slug: "10-context-engineering";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};
"projects": {
"application-category-prediction/index.md": {
	id: "application-category-prediction/index.md";
  slug: "application-category-prediction";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"celestialtaha-portfolio/index.md": {
	id: "celestialtaha-portfolio/index.md";
  slug: "celestialtaha-portfolio";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"convnext-tf-keras/index.md": {
	id: "convnext-tf-keras/index.md";
  slug: "convnext-tf-keras";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"facial-expression-recognition/index.md": {
	id: "facial-expression-recognition/index.md";
  slug: "facial-expression-recognition";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"medvse/index.md": {
	id: "medvse/index.md";
  slug: "medvse";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"project-2/index.md": {
	id: "project-2/index.md";
  slug: "project-2";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"psql-query-builder/index.md": {
	id: "psql-query-builder/index.md";
  slug: "psql-query-builder";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"pypoint/index.md": {
	id: "pypoint/index.md";
  slug: "pypoint";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"unbalanced-dataset-classification/index.md": {
	id: "unbalanced-dataset-classification/index.md";
  slug: "unbalanced-dataset-classification";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"visual-semantic-search/index.md": {
	id: "visual-semantic-search/index.md";
  slug: "visual-semantic-search";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"weavelet/index.md": {
	id: "weavelet/index.md";
  slug: "weavelet";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
};
"research": {
"3drec.md": {
	id: "3drec.md";
  slug: "3drec";
  body: string;
  collection: "research";
  data: InferEntrySchema<"research">
} & { render(): Render[".md"] };
"lpdsa.md": {
	id: "lpdsa.md";
  slug: "lpdsa";
  body: string;
  collection: "research";
  data: InferEntrySchema<"research">
} & { render(): Render[".md"] };
"medvse.md": {
	id: "medvse.md";
  slug: "medvse";
  body: string;
  collection: "research";
  data: InferEntrySchema<"research">
} & { render(): Render[".md"] };
"rose3d.md": {
	id: "rose3d.md";
  slug: "rose3d";
  body: string;
  collection: "research";
  data: InferEntrySchema<"research">
} & { render(): Render[".md"] };
"textAsEnv.md": {
	id: "textAsEnv.md";
  slug: "textasenv";
  body: string;
  collection: "research";
  data: InferEntrySchema<"research">
} & { render(): Render[".md"] };
};
"work": {
"binj.md": {
	id: "binj.md";
  slug: "binj";
  body: string;
  collection: "work";
  data: InferEntrySchema<"work">
} & { render(): Render[".md"] };
"caro.md": {
	id: "caro.md";
  slug: "caro";
  body: string;
  collection: "work";
  data: InferEntrySchema<"work">
} & { render(): Render[".md"] };
"gandom.md": {
	id: "gandom.md";
  slug: "gandom";
  body: string;
  collection: "work";
  data: InferEntrySchema<"work">
} & { render(): Render[".md"] };
"vitalMo.md": {
	id: "vitalMo.md";
  slug: "vitalmo";
  body: string;
  collection: "work";
  data: InferEntrySchema<"work">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
