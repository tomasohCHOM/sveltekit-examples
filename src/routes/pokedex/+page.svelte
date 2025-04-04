<script lang="ts">
	import PokeGrid from "$lib/pokedex/components/pokegrid.svelte";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<section class="grid gap-8 p-4">
	<h1 class="text-2xl md:text-4xl font-bold text-center">Pokédex</h1>
	<PokeGrid pokemon={data.pokemon} />
	<button
		class="bg-sky-500 hover:bg-sky-400 transition w-[min(20rem,_90%)]
    cursor-pointer py-2 px-4 rounded-lg text-white mx-auto"
	>
		List More Pokémon!
	</button>
</section>
