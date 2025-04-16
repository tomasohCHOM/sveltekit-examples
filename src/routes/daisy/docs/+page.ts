import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
	try {
		// @ts-ignore
		const docsPage = await import("$lib/daisy/docs.md");

		return {
			content: docsPage.default,
			meta: docsPage.metadata
		};
	} catch (e) {
		error(404, "Could not find docs");
	}
};
