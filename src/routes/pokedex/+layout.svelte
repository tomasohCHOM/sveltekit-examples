<script lang="ts">
	import Navbar from "$lib/pokedex/components/navbar.svelte";

	let { children } = $props();
</script>

<svelte:head>
	<title>Pokédex | SvelteKit Examples</title>
	<link rel="stylesheet" href="/pokedex/styles.css" />
</svelte:head>

<Navbar />
<main class="pt-8 pb-16 max-w-[1280px] mx-auto">
	{@render children()}
</main>

<style>
	* {
		font-family: "Lato", sans-serif;
	}
</style>
