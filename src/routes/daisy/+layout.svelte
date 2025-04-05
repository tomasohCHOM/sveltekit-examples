<script lang="ts">
	import Navbar from "$lib/daisy/components/navbar.svelte";

	let { children } = $props();
</script>

<svelte:head>
	<title>The Daisy Programming Language</title>
	<link rel="stylesheet" href="/daisy/styles.css" />
</svelte:head>

<Navbar />
{@render children()}
