import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { escapeSvelte, mdsvex } from "mdsvex";
import { createHighlighter } from "shiki";

/** @type {import("mdsvex").MdsvexOptions} */
const mdsvexOptions = {
	extensions: [".md"],
	highlight: {
		highlighter: async (code, lang = "text") => {
			const highlighter = await createHighlighter({
				themes: ["catppuccin-frappe"],
				langs: ["go", "sh"]
			});
			await highlighter.loadLanguage("go", "sh");
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: "catppuccin-frappe" }));
			highlighter.dispose();
			return `{@html \`${html}\` }`;
		}
	}
};

/** @type {import("@sveltejs/kit").Config} */
const config = {
	extensions: [".svelte", ".md"],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter()
	}
};

export default config;
