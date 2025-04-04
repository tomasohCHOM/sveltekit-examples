<script lang="ts">
	import type { ListedPokemon } from "../types";

	type GridProps = { pokemon: ListedPokemon[] };
	let { pokemon }: GridProps = $props();

	/**
	 * Helper to add leading zeros to a number string
	 */
	function zeroPad(num: number, places: number) {
		return String(num).padStart(places, "0");
	}
</script>

<div class="flex flex-wrap gap-4 items-center justify-center">
	{#each pokemon as pokemon, i}
		<a
			href="/pokedex/{i + 1}"
			class="w-48 md:w-64 rounded-lg aspect-square p-4 bg-slate-100 flex flex-col items-center hover:bg-slate-50 transition"
		>
			<img
				src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/{zeroPad(
					i + 1,
					3
				)}.png"
				alt="Pokemon {i + 1}"
			/>
			<span class="font-bold uppercase">
				{pokemon.name}
			</span>
		</a>
	{/each}
</div>
