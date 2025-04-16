<script lang="ts">
	import Footer from "$lib/daisy/components/footer.svelte";
	import Navbar from "$lib/daisy/components/navbar.svelte";

	let { children } = $props();
</script>

<svelte:head>
	<title>The Daisy Programming Language | SvelteKit Examples</title>
	<link rel="stylesheet" href="/daisy/styles.css" />
</svelte:head>

<Navbar />
{@render children()}
<Footer />
