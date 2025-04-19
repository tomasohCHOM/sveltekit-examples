<script lang="ts">
	import "./docs.css";

	let { data } = $props();
</script>

<main class="mx-auto mt-8 grid max-w-[1024px]">
	<article>
		<h1 class="text-center text-3xl font-bold md:text-4xl">{data.meta.title}</h1>
		<div class="prose my-8">
			<data.content />
		</div>
	</article>
</main>
