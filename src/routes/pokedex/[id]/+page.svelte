<script lang="ts">
	import { pokemonImagePath } from "$lib/pokedex/constants.js";
	import { zeroPad } from "$lib/pokedex/utils.js";

	let { data } = $props();
	let pokemonId = data.pokemonId;
	let pokemon = data.pokemonInfo;

	const typeColors = new Map<string, string>([
		["normal", "bg-[#A8A77A]"],
		["fire", "bg-[#EE8130]"],
		["water", "bg-[#6390F0]"],
		["electric", "bg-[#F7D02C]"],
		["grass", "bg-[#7AC74C]"],
		["ice", "bg-[#96D9D6]"],
		["fighting", "bg-[#C22E28]"],
		["poison", "bg-[#A33EA1]"],
		["ground", "bg-[#E2BF65]"],
		["flying", "bg-[#A98FF3]"],
		["psychic", "bg-[#F95587]"],
		["bug", "bg-[#A6B91A]"],
		["rock", "bg-[#B6A136]"],
		["ghost", "bg-[#735797]"],
		["dragon", "bg-[#6F35FC]"],
		["dark", "bg-[#705746]"],
		["steel", "bg-[#B7B7CE]"],
		["fairy", "bg-[#D685AD]"]
	]);
</script>

<section class="max-w-[768px] mx-auto">
	{#if data.error}
		<p class="text-lg text-center">{data.error}</p>
	{:else}
		<div class="grid md:grid-cols-2 gap-4">
			<div
				class="flex flex-col gap-4 items-center justify-center md:pr-8
        md:border-r-2 border-gray-300"
			>
				<span class="font-bold uppercase text-xl md:text-3xl">{pokemon.name}</span>
				<img
					src="{pokemonImagePath + zeroPad(pokemonId, 3)}.png"
					alt="Pokemon {pokemonId}"
					class="w-64 p-4 border-2 rounded-lg border-gray-300"
				/>
			</div>
			<div class="text-lg flex flex-col gap-2 md:gap-4 w-64 mx-auto md:max-w-full md:mx-0">
				<div class="flex flex-col gap-2">
					<p><span class="font-semibold">Height:</span> {pokemon.height}</p>
					<p><span class="font-semibold">Weight:</span> {pokemon.weight}</p>
				</div>
				<h2 class="font-semibold">Types</h2>
				<div class="flex gap-2">
					{#each pokemon.types as typeSlot}
						<span
							class="px-2 py-0.5 rounded-lg text-white {typeColors.get(typeSlot.type.name) ??
								'bg-black'}">{typeSlot.type.name}</span
						>
					{/each}
				</div>
				<h2 class="font-semibold">Abilities</h2>
				<div class="flex flex-wrap gap-2">
					{#each pokemon.abilities as abilitySlot}
						<span>{abilitySlot.ability.name}</span>
					{/each}
				</div>
			</div>
		</div>
	{/if}
	<div class="mt-8 flex items-center justify-between">
		{#if pokemonId !== 1}
			<a
				href="/pokedex/{pokemonId - 1}"
				class="bg-sky-500 hover:bg-sky-400 transition max-w-max cursor-pointer py-2 px-4 rounded-lg text-white"
			>
				Previous
			</a>
		{/if}
		<a
			href="/pokedex/{pokemonId + 1}"
			class="bg-sky-500 hover:bg-sky-400 ml-auto transition max-w-max cursor-pointer py-2 px-4 rounded-lg text-white"
			>Next</a
		>
	</div>
</section>
