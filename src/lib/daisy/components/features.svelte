<script>
	const languageFeatures = [
		{
			title: "Simplicity",
			desc: "Daisy is designed to be an expressive language that prioritizes readability and ease of writing, making programming more intuitive."
		},
		{
			title: "Control",
			desc: "Daisy provides fine-grained control over memory management, giving you the flexibility to optimize performance according to your needs."
		},
		{
			title: "Tooling & Community",
			desc: "Daisy comes with robust tooling to enhance development efficiency and a growing community dedicated to support and collaboration."
		}
	];
</script>

<section class="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
	{#each languageFeatures as feature}
		<div
			class="rounded-lg border-2 border-[#fbf1d7] bg-[#fffbf1] p-4 dark:border-[#7e7554] dark:bg-[#2e2e2d]"
		>
			<h3 class="text-center text-xl font-bold">{feature.title}</h3>
			<p class="text-lg">{feature.desc}</p>
		</div>
	{/each}
</section>
