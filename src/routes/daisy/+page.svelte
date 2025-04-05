<script>
	import Community from "$lib/daisy/components/community.svelte";
	import Examples from "$lib/daisy/components/examples.svelte";
	import Features from "$lib/daisy/components/features.svelte";
	import Hero from "$lib/daisy/components/hero.svelte";
</script>

<main class="mt-16 grid">
	<div class="mx-auto grid max-w-[1280px] gap-16 p-8">
		<Hero />
		<Features />
	</div>
	<div class="mt-48 bg-gradient-to-br from-[#ffd46e] to-[#f0df42] p-8">
		<Examples />
	</div>
	<div class="bg-[#fff3d5] p-8">
		<Community />
	</div>
</main>
