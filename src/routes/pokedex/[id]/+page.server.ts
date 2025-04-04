import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const pokemonId = Number(params.id);
	if (isNaN(pokemonId)) {
		error(404, "Not Found!");
	}
	try {
		const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
		if (!res.ok) {
			throw new Error(`HTTP error - status ${res.status}`);
		}
		const data = await res.json();
		return { pokemonInfo: data, pokemonId, error: "" };
	} catch (error) {
		console.error("Could not fetch pokemon:", error);
		return {
			pokemonInfo: {},
			pokemonId,
			error: "An error occured retrieving this Pokemon's info."
		};
	}
};
