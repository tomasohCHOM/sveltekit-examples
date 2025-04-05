<script>
	const languageFeatures = [
		{
			title: "Simplicity",
			desc: "Daisy is an expressive language that pushes for programs to be simple to read and write."
		},
		{
			title: "Control",
			desc: "Unlike many high-level languages, Daisy gives you control over memory management, flexible according to your needs."
		},
		{
			title: "Simplicity",
			desc: "Daisy is an expressive language that pushes for programs to be simple to read and write."
		},
		{
			title: "Control",
			desc: "Unlike many high-level languages, Daisy gives you control over memory management, flexible according to your needs."
		},
		{
			title: "Simplicity",
			desc: "Daisy is an expressive language that pushes for programs to be simple to read and write."
		},
		{
			title: "Control",
			desc: "Unlike many high-level languages, Daisy gives you control over memory management, flexible according to your needs."
		}
	];
</script>

<main class="mx-auto mt-16 grid max-w-[1280px] gap-16">
	<section class="flex">
		<div class="grid gap-4">
			<h1 class="text-6xl font-bold">
				Write Simply. <span class="text-[#f0e742]">Build Gracefully.</span>
			</h1>
			<p class="text-lg">
				Daisy is a simple yet powerful language that lets you program the way you want.
			</p>
		</div>
	</section>
	<section class="grid grid-cols-3 gap-4">
		{#each languageFeatures as feature}
			<div class="rounded-lg bg-[#f7f7f7] p-4">
				<h3 class="text-center text-xl font-bold">{feature.title}</h3>
				<p class="text-lg">{feature.desc}</p>
			</div>
		{/each}
	</section>
</main>
