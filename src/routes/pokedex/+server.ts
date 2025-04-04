import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { nextPage } = await request.json();
		if (!nextPage) {
			return json({ pokemon: [], nextPage: null }, { status: 400 });
		}

		const res = await fetch(nextPage);
		if (!res.ok) {
			throw new Error(`HTTP error - status: ${res.status}`);
		}

		const data = await res.json();
		return json({ pokemon: data.results, nextPage: data.next });
	} catch (error) {
		console.error("Could not fetch more Pokémon:", error);
		return json({ pokemon: [], nextPage: null, error: "Something went wrong" });
	}
};
