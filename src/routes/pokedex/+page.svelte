<script lang="ts">
	import PokeGrid from "$lib/pokedex/components/pokegrid.svelte";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();

	let pokemon = $state([...data.pokemon]);
	let nextPage = $state(data.nextPage);
	let loading = $state(false);

	async function loadMorePokemon() {
		if (!nextPage || loading) return;
		loading = true;

		try {
			const res = await fetch(nextPage);
			if (!res.ok) {
				throw new Error(`HTTP error - status: ${res.status}`);
			}
			const newData = await res.json();

			// Append new Pokémon and update nextPage
			pokemon = [...pokemon, ...newData.results];
			nextPage = newData.next;
		} catch (error) {
			console.error("Could not fetch more Pokémon:", error);
		} finally {
			loading = false;
		}
	}
</script>

<section class="grid gap-8 p-4">
	<h1 class="text-center text-2xl font-bold md:text-4xl">Pokédex</h1>
	{#if data.error}
		<p class="text-center text-lg">{data.error}</p>
	{:else}
		<PokeGrid {pokemon} />
	{/if}
	<button
		onclick={loadMorePokemon}
		disabled={loading || !nextPage}
		class="mx-auto w-[min(20rem,_90%)] cursor-pointer rounded-lg
    bg-sky-500 px-4 py-2 text-white transition hover:bg-sky-400"
	>
		{#if loading}
			Loading...
		{:else if !nextPage}
			Nothing More to Show
		{:else}
			List More Pokémon!
		{/if}
	</button>
</section>
