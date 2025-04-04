<script lang="ts">
	import { pokemonImagePath } from "../constants";
	import type { ListedPokemon } from "../types";
	import { zeroPad } from "../utils";

	type GridProps = { pokemon: ListedPokemon[] };
	let { pokemon }: GridProps = $props();
</script>

<div class="flex flex-wrap gap-4 items-center justify-center">
	{#each pokemon as pokemon, i}
		<a
			href="/pokedex/{i + 1}"
			class="w-48 md:w-64 rounded-lg aspect-square p-4 bg-slate-100 flex flex-col items-center hover:bg-slate-50 transition"
		>
			<img src="{pokemonImagePath + zeroPad(i + 1, 3)}.png" alt="Pokemon {i + 1}" />
			<span class="font-bold uppercase">
				{pokemon.name}
			</span>
		</a>
	{/each}
</div>
