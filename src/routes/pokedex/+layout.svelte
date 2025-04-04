<script lang="ts">
	import Navbar from "$lib/pokedex/components/navbar.svelte";

	let { children } = $props();
</script>

<svelte:head>
	<title>Pokédex | SvelteKit Examples</title>
	<link rel="stylesheet" href="/pokedex/styles.css" />
</svelte:head>

<Navbar />
<main class="mx-auto max-w-[1280px] pt-8 pb-16">
	{@render children()}
</main>
