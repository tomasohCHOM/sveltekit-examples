import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	try {
		const res = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");
		if (!res.ok) {
			throw new Error(`HTTP error - status: ${res.status}`);
		}
		const data = await res.json();
		return { pokemon: data.results, nextPage: data.next, prevPage: data.prev, error: "" };
	} catch (error) {
		console.error("Could not fetch pokemon:", error);
		return { pokemon: [], nextPage: null, prevPage: null, error: "Something went wrong." };
	}
};
