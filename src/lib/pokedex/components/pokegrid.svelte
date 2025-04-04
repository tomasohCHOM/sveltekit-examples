<script lang="ts">
	import { pokemonImagePath } from "../constants";
	import type { ListedPokemon } from "../types";
	import { zeroPad } from "../utils";

	type GridProps = { pokemon: ListedPokemon[] };
	let { pokemon }: GridProps = $props();
</script>

<div class="flex flex-wrap items-center justify-center gap-4">
	{#each pokemon as pokemon, i}
		<a
			href="/pokedex/{i + 1}"
			class="flex aspect-square w-48 flex-col items-center rounded-lg
      bg-slate-100 p-4 transition duration-300 hover:bg-slate-50 md:w-64
      dark:bg-slate-800 dark:hover:bg-slate-700"
		>
			<img src="{pokemonImagePath + zeroPad(i + 1, 3)}.png" alt="Pokemon {i + 1}" />
			<span class="font-bold uppercase">
				{pokemon.name}
			</span>
		</a>
	{/each}
</div>
